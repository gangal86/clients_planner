<template>
  <div class="row justify-center q-mt-md">
    <q-btn
      no-caps
      outline
      rounded
      color="primary"
      icon="add"
      label="Добавить клиента"
      @click="showDialog"
    />
  </div>
  <q-list separator class="q-my-md">
    <q-item v-for="client in allClients" :key="client.id" clickable v-ripple>
      <q-item-section v-if="allClients.length > 0" avatar>
        <q-avatar color="primary" text-color="white">
          {{ client.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary">{{ client.name.substring(0, 20) }}</q-item-label>
        <q-item-label caption lines="1" class="text-dark">{{ client.date }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-dark">{{ client.service.substring(0, 15) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

  <q-dialog v-model="isDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">

          <q-form class="q-gutter-md"
            @submit="addClient"
            @reset="resetForm">

            <q-input
              outlined
              v-model="clientName"
              label="Имя *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите имя']"
            />

            <q-select 
              outlined 
              v-model="clientService" 
              :options="servicesOptions" 
              label="Услуга *"
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите услугу']"
            />

            <q-input
              outlined
              v-model="clientPhone"
              label="Телефон *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите номер телефона']"
            />

            <q-input outlined v-model="clientDate" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="clientDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Ok" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>   
                  
            <div>
              <q-btn label="Ok" color="primary" type="submit" />
              <q-btn label="Отмена" color="primary" flat class="q-ml-sm" type="reset" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-banner v-if="isWarningBanner" inline-actions class="text-white bg-red">
    Сперва добавьте хотя бы одну услугу.
  </q-banner>  
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { date, uid } from 'quasar';

export default defineComponent({
  name: 'ClientsList',
  setup () {
    const store = useStore();
    const allClients = computed(() => store.getters['storeClients/getAllClients']);

    const isDialog = ref(false);
    const isWarningBanner = ref(false);
    const clientName = ref('');
    const clientService = ref('');
    const clientPhone = ref('');
    const clientDate = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));

    let servicesOptions = store.getters['storeClients/getAllClientsServices'].map(item => item.name);

    const showDialog = () => {
      if (servicesOptions.length === 0) {
        isWarningBanner.value = true;
        return;
      }
      isDialog.value = true;
    }

    
    const resetForm = () => {
      clientName.value = '';
      clientPhone.value = '';
      clientService.value = '';
      isDialog.value = false;
    }
    const addClient = () => {
      let dataClient = {
        id: uid(),
        name: clientName.value,
        date: clientDate.value,
        phone: clientPhone.value,
        service: clientService.value
      }
			store.dispatch('storeClients/addClient', dataClient);
			resetForm();
		}


    return {
      allClients,
      addClient, 
      resetForm,
      isDialog,
      clientName,
      clientDate,
      clientPhone,
      clientService,
      servicesOptions,
      showDialog,
      isWarningBanner
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 20px;
  }
</style>