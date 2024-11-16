<template>
  <i :class="['icon', name, ...additionalClasses]"></i>
</template>

<script setup lang="ts">

const props = defineProps<{
  name: string;
  additionalClasses?: string[];
}>();

const additionalClasses = props.additionalClasses || [];
</script>

<style scoped>
.icon {
  /* Add any default styles for the icon here */
}
</style>