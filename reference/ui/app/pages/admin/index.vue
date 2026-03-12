<!-- /admin/inde.vue -->
<script setup>
definePageMeta({
  middleware: ["admin-auth"],
});

onMounted(() => {
  navigateTo("/admin/dashboard");
});
</script>
