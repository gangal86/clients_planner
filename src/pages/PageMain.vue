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
        <div class="column no-wrap justify-center q-mt-md">
          <div class="column items-center">
            Изменить цветовую схему
          </div>
          <div class="q-pa-md column items-center">
            <q-color v-model="hex" class="no-header no-footer my-picker" />
          </div>
          <div class="q-pa-md column items-center">
            <div>Clients Planner</div>
            <span class="text-weight-regular">Developer: </span>
            <a href="https://gangal.pro" target="_blank">
              <span class="text-weight-bold text-primary">Roman Gangal</span>
            </a>
          </div>
        </div>
      </q-tab-panel>     
    </q-tab-panels>

    <q-footer bordered class="bg-white text-grey-9">
        <q-tabs
          v-model="mainMenuTabs"
          class="text-primary"
          indicator-color="transparent"
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
  </q-page>
</template>

<script>
import { defineComponent, ref, watch} from 'vue';
import ClientsList from 'components/ClientsList.vue';
import ServicesList from 'src/components/ServicesList.vue';
import Calendar from 'components/Calendar.vue';
import { setCssVar } from 'quasar';

export default defineComponent({
  name: 'MainPage',
  components: {
    ClientsList,
    ServicesList,
    Calendar
  },
  setup () {
    let mainMenuTabs = ref('clients');
    let hex = ref('#7A1FA2');
    
    watch(() => hex.value, () => {
      setCssVar('primary', hex.value);
    })

    return {
      mainMenuTabs,
      hex
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-tab-panels{
    width: 100%;
    max-width: 400px;
    min-width: 300px;
  }
  .my-picker{
    height: 100%;
    width: 100%;
    max-width: 400px;
    min-width: 250px;
  }
</style>