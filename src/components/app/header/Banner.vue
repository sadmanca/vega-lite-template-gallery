<script setup lang="ts">
import useAppConfig from '../../../util/useAppConfig';
import Dot from './Dot.vue';

const bannerConfig = (await useAppConfig()).header.banner;

const getHref = () => {
  const link = bannerConfig?.link;
  if (link) {
    return link;
  }

  return "#";
};

const href = getHref();

</script>

<template>
  <div v-show="bannerConfig?.show" class="flex items-center justify-center gap-x-6 bg-primary-600 px-6 py-2.5">
    <p class="text-sm leading-6 text-white">
      <a :href="href" target="_blank" class="inline-flex items-center gap-1">
        <strong v-if="bannerConfig?.brandText" class="font-semibold hidden sm:block">
          {{ bannerConfig.brandText }}
        </strong>
        <Dot class="hidden sm:block" v-if="bannerConfig?.brandText" />
        {{ bannerConfig?.text }}
        <Icon class="hidden sm:block w-5 h-5" name="tabler:arrow-right" />
      </a>
    </p>
  </div>
</template>