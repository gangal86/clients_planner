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

    <q-dialog v-model="card">
      <q-card>
        <q-card-section>
          <div class="q-pa-md">

            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="clientName"
                label="Имя *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                v-model="clientService"
                label="Услуга *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                v-model="clientPhone"
                label="Телефон *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input filled v-model="clientDate" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="clientDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>   
                    
              <div>
                <q-btn label="Submit" type="submit" color="primary" @click.prevent="addClient" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

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
          <q-btn
            size="lg"
            round
            color="primary"
            icon="eva-plus-outline"
            class="q-ma-sm"
          >
            <q-menu 
              :offset="[40, 10]"
              auto-close
            >
              <q-list>
                <q-item @click="card = true" clickable>
                  <q-item-section>Добавить клиента</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Добавить услугу</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn> 
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
    let card = ref(false)
    let clientName = ref('');
    let clientDate = ref('');
    let clientPhone = ref('');
    let clientService = ref('');

    let dataClient = {
      name: clientName,
      date: clientDate,
      phone: clientPhone,
      service: clientService
    }

    const addClient = () => {
      store.dispatch('storeClients/addClient', dataClient);
      card.value = false;
    }
    
    return {
      mainMenuTabs,
      addClient,
      card,
      date: ref('2022/01/10'),
      clientName,
      clientDate,
      clientPhone,
      clientService
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
