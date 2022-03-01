<template>
  <q-footer bordered class="bg-white text-grey-9">
    <q-tabs
      v-model="mainMenuTabs"
      class="text-primary"
      align="center"
      no-caps
      dense
    >
      <q-tab
        name="clients"
        icon="eva-people-outline"
        :label="$t('footerTitleClients')"
        class="q-pa-xs"
      />
      <q-tab
        name="services"
        icon="eva-layers-outline"
        :label="$t('footerTitleServices')"
        class="q-pa-sm"
      />
      <q-tab
        name="search"
        icon="eva-search-outline"
        :label="$t('footerTitleSearch')"
        class="q-pa-sm"
      />
      <q-tab
        name="more"
        icon="eva-menu-2-outline"
        :label="$t('footerTitleMore')"
        class="q-pa-xs"
      />
    </q-tabs>
  </q-footer>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'Footer',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const mainMenuTabs = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    return {
      mainMenuTabs,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-footer {
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  margin: 0 auto;
}
</style>