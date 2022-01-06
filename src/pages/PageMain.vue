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
    <q-tab-panels v-model="mainMenuTabs" animated style="min-width: 100%">
      <q-tab-panel class="q-pa-sm" name="clients">
        <ClientsList />
      </q-tab-panel>

      <q-tab-panel name="services">
        <ServicesList />
      </q-tab-panel>

      <q-tab-panel name="calendar">
        <Calendar />
      </q-tab-panel>

      <q-tab-panel name="more">
        <div class="text-h6">Больше</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
    <q-btn
      size="lg"
      round
      color="primary"
      icon="eva-plus-outline"
      class="absolute-bottom-right q-ma-md z-top"
    >
      <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
          style="width: 160px;"
        >
        <q-list>
          <q-item @click="addClient" clickable>
            <q-item-section>Добавить клиента</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Добавить услугу</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-footer bordered class="bg-white text-grey-9">
        <q-toolbar class="row justify-center">
          <q-tabs
            v-model="mainMenuTabs"
            class="text-primary"
            no-caps
            dense
          >
          <q-tab name="clients" icon="eva-people-outline" label="Клиенты" />
          <q-tab name="services" icon="eva-layers-outline" label="Услуги" />
          <q-tab name="calendar" icon="eva-calendar-outline" label="Календарь" />
          <q-tab name="more" icon="eva-menu-2-outline" label="Больше" />
        </q-tabs>
        </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue';
import ClientsList from 'components/ClientsList.vue';
import ServicesList from 'components/ServicesList.vue';
import Calendar from 'components/Calendar.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MainPage',
  components: {
    ClientsList,
    ServicesList,
    Calendar
  },
  setup () {
    const store = useStore();
    let mainMenuTabs = ref('clients');
    const addClient = () => {
      store.dispatch('storeClients/addClient');
    }
    return {
      mainMenuTabs,
      addClient
    }
  }
});
</script>
