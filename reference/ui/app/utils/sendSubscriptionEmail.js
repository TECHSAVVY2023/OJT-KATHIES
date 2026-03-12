// utils/sendSubscriptionEmail.js
import { getApiUrl } from '@/utils/api'

/**
 * Sends a confirmation email after successful newsletter subscription.
 * 
 * @param {string} email - The subscriber's email address
 * @returns {Promise<boolean>} true if sent successfully, false otherwise
 */
export async function sendSubscriptionEmail(email) {
  if (!email) {
    console.warn('No email provided for subscription email.')
    return false
  }

  try {
    const response = await fetch(getApiUrl('send-subscription-email'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      console.error('Failed to send subscription email:', await response.text())
      return false
    }

    console.log(`✅ Subscription confirmation sent to ${email}`)
    return true
  } catch (error) {
    console.error('Error sending subscription email:', error)
    return false
  }
}
