import threading
from django.db.models.signals import post_save
from django.db import transaction
from django.dispatch import receiver
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from email.utils import formataddr

from .models import Order, Subscriber


# =========================================================
# ASYNC EMAIL WORKER (SAFE FOR PRODUCTION)
# =========================================================

def async_email_sender(subject, template_name, context, recipient):
    """
    Sends email in a separate thread so the main request
    never hangs or crashes even if SMTP is slow or down.
    """
    def task():
        try:
            html = render_to_string(template_name, context)
            text = "Please view this email in HTML format."

            from_email = formataddr(("Kathie’s Kitchen", "info@techsavvies.space"))

            msg = EmailMultiAlternatives(
                subject=subject,
                body=text,
                from_email=from_email,
                to=[recipient],
                reply_to=["hirst.marketings@gmail.com"],
            )
            msg.attach_alternative(html, "text/html")

            msg.send(fail_silently=False)
            print(f"[EMAIL SENT] {subject} → {recipient}")

        except Exception as e:
            print(f"[ASYNC EMAIL ERROR] {e}")

    threading.Thread(target=task, daemon=True).start()


# =========================================================
# ORDER SIGNALS
# =========================================================

@receiver(post_save, sender=Order)
def order_status_changed(sender, instance, created, **kwargs):
    """
    Safe, production-grade signal that only fires the email
    AFTER the database commits.
    """
    
    # Skip if NOT created and status did NOT change
    if not created and instance.status == instance._original_status:
        print("[SIGNAL] No status change detected — skipping.")
        return

    # Skip archive/unarchive operations
    if not created and instance._original_status == instance.status and instance.archived != instance.archived:
        print("[SIGNAL] Archive/unarchive update — skipping.")
        return
    
    def process_email():
        try:
            # Always fetch fresh data
            order = Order.objects.prefetch_related("items__product").get(pk=instance.pk)
            context = {"order": order, "items": order.items.all()}

            status = order.status.lower()
            subject = None
            template = None

            if created or status == "pending":
                print(f"[SIGNAL] New order #{order.id} created.")
                subject = f"Order Confirmation – Kathie’s Kitchen"
                template = "emails/pending_confirmation.html"

            elif status == "confirmed":
                subject = f"Order Confirmed – Kathie’s Kitchen"
                template = "emails/confirmed.html"

            elif status == "packed_ready":
                subject = f"Your Order is Packed – Kathie’s Kitchen"
                template = "emails/packed_ready.html"

            elif status == "en_route":
                subject = f"Your Order is On The Way – Kathie’s Kitchen"
                template = "emails/en_route.html"

            elif status == "completed":
                subject = f"Thank You for Ordering – Kathie’s Kitchen"
                template = "emails/completed.html"

            elif status == "cancelled":
                subject = f"Order Cancelled – Kathie’s Kitchen"
                template = "emails/cancelled.html"

            # No valid email template found
            if not subject or not template:
                print(f"[SIGNAL] >>> No email for status: {status}")
                return

            # Send asynchronously
            async_email_sender(subject, template, context, order.email)

        except Exception as e:
            print(f"[ORDER SIGNAL ERROR] {e}")

    transaction.on_commit(process_email)


# =========================================================
# SUBSCRIBER SIGNAL
# =========================================================

@receiver(post_save, sender=Subscriber)
def send_subscription_welcome_email(sender, instance, created, **kwargs):
    """Production-safe async email for new subscribers."""

    if not created:
        return

    print(f"[SIGNAL] New subscriber: {instance.email}")

    context = {"email": instance.email}

    async_email_sender(
        subject="Welcome to Kathie’s Kitchen Newsletter",
        template_name="emails/subscription_welcome.html",
        context=context,
        recipient=instance.email,
    )
