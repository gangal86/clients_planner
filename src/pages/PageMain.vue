<template>
  <q-page class="row items-start justify-center">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-toolbar-title class="row justify-center text-dark">
          <div v-if="mainMenuTabs == 'clients'">
            Клиенты
          </div>
          <div v-if="mainMenuTabs =='services'">
            Услуги
          </div>
          <div v-if="mainMenuTabs =='calendar'">
            Календарь
          </div>
          <div v-if="mainMenuTabs =='more'">
            Больше
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <q-tab-panels
      v-model="mainMenuTabs"
      animated
    >
      <q-tab-panel class="q-pa-xs" name="clients">
        <ClientsList />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="services">
        <ServicesList />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="calendar">
        <Calendar />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="more">
        <div class="text-h6">Больше</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>     
    </q-tab-panels>

    <q-footer bordered class="bg-white text-grey-9">
        <q-toolbar class="row justify-center">
          <q-tabs
            v-model="mainMenuTabs"
            class="text-primary"
            indicator-color="transparent"
            no-caps
            dense
          >
          <q-tab name="clients" icon="eva-people-outline" label="Клиенты" class="q-pa-xs" />
          <q-tab name="services" icon="eva-layers-outline" label="Услуги" class="q-pa-sm" />
          <q-tab name="calendar" icon="eva-calendar-outline" label="Календарь" class="q-pa-sm" />
          <q-tab name="more" icon="eva-menu-2-outline" label="Больше" class="q-pa-xs" />        
        </q-tabs>
        </q-toolbar>      
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue';
import ClientsList from 'components/ClientsList.vue';
import ServicesList from 'src/components/ServicesList.vue';
import Calendar from 'components/Calendar.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    ClientsList,
    ServicesList,
    Calendar
  },
  setup () {
    let mainMenuTabs = ref('clients');

    return {
      mainMenuTabs
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-header {
    max-width: 600px; 
    margin: 0 auto;
  }
  .q-tab-panels {
    min-width: 400px;
  }
  .q-menu {
    width: 160px;
  }
</style>
