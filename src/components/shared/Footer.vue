<template>
  <q-footer bordered class="bg-white text-grey-9">
      <q-tabs
        v-model="mainMenuTabsModel" 
        class="text-primary"
        align="center"
        no-caps
        dense
      >
      <q-tab name="clients" icon="eva-people-outline" label="Клиенты" class="q-pa-xs" />
      <q-tab name="services" icon="eva-layers-outline" label="Услуги" class="q-pa-sm" />
      <q-tab name="calendar" icon="eva-calendar-outline" label="Календарь" class="q-pa-sm" />
      <q-tab name="more" icon="eva-menu-2-outline" label="Больше" class="q-pa-xs" />        
    </q-tabs>    
  </q-footer>
</template>

<script>
import { defineComponent, computed } from 'vue';
export default defineComponent ({
  name: 'Footer',
  props: ['mainMenuTabs'],
  emits: ['change-menu-tabs'],
  setup(props, context) {
    const mainMenuTabsModel = computed({
      get() {
        return props.mainMenuTabs;
      },
      set(val) {
        context.emit('change-menu-tabs', val);
      }
    })

    return {
      mainMenuTabsModel
    }
  }
})
</script>

<style lang="scss" scoped>

</style>