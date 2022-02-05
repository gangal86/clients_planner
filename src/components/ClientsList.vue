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
    <q-item v-for="client in allClients" :key="client.id" @click="showDialogPreviewClientInfo({id: client.id, name: client.name, date: client.date, phone: client.phone, service: client.service})" clickable v-ripple>
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
    <q-dialog v-model="isDialogPreviewClientInfo">
      <q-card>
        <q-card-section>
          <div class="q-pa-md">
              Test Card <br />
              {{ previewDialogData.id }}<br />
              {{ previewDialogData.date }}<br />
              {{ previewDialogData.name }}<br />
              phone {{ previewDialogData.phone }}<br />
              {{ previewDialogData.service }}     
          </div>
        </q-card-section>
          <div>
            <q-btn label="Изменить" color="primary" @click="editClient" />
            <q-btn label="Удалить" color="primary" @click="deleteClient" />
            <q-btn label="Отмена" color="primary" flat class="q-ml-sm" @click="isDialogPreviewClientInfo = false" />
          </div>
      </q-card>
    </q-dialog>
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
            
            <q-input outlined v-model="clientDate">
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="clientDate" :mask="currentDateFormat" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="clientDate" :mask="currentDateFormat">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
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

  <q-dialog v-model="isDialogEdit">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">

          <q-form class="q-gutter-md"
            @submit="editClientToStore"
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
            
            <q-input outlined v-model="clientDate">
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="clientDate" :mask="currentDateFormat" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="clientDate" :mask="currentDateFormat">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
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
import { defineComponent, computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { date, uid } from 'quasar';

export default defineComponent({
  name: 'ClientsList',
  setup () {
    const store = useStore();
    const isDialog = ref(false);
    const isDialogEdit = ref(false);
    let isDialogPreviewClientInfo = ref(false);
    const isWarningBanner = ref(false);
    const clientName = ref('');
    const clientService = ref('');
    const clientPhone = ref('');
    const previewDialogData = reactive({
      id: '',
      name:'',
      date: '',
      phone: '',
      service: ''
    })
    const currentDateFormat = 'HH:mm - DD/MM/YYYY';
    const clientDate = ref(date.formatDate(Date.now(), currentDateFormat));

    const allClients = computed(() => store.getters['storeClients/getAllClients'].map(function(item) {
      return {
        id: item.id,
        name: item.name,
        date: date.formatDate(`${item.date} ${item.time}`, currentDateFormat),
        time: item.time,
        phone: item.phone,
        service: item.service
      }
    }).sort(function(a, b) {
      return new Date(date.formatDate(date.extractDate(a.date, currentDateFormat), 'YYYY/MM/DD HH:mm')).getTime() > new Date(date.formatDate(date.extractDate(b.date, currentDateFormat), 'YYYY/MM/DD HH:mm')).getTime() ? 1 : -1;
    }));

    const servicesOptions = computed(() => store.getters['storeClients/getAllClientsServices'].map(item => item.name));

    const showDialog = () => {
      if (servicesOptions.value.length === 0) {
        isWarningBanner.value = true;
        return;
      }
      isDialog.value = true;
    }

    const showDialogPreviewClientInfo = (data) => {
      isDialogPreviewClientInfo.value = true;
      previewDialogData.id = data.id;
      previewDialogData.name = data.name;
      previewDialogData.date = data.date;
      previewDialogData.phone = data.phone;
      previewDialogData.service = data.service;
    }

    const deleteClient = () => {
      store.dispatch('storeClients/deleteClient', previewDialogData.id)
      isDialogPreviewClientInfo.value = false;
    }

    const editClient = () => {
      clientName.value = previewDialogData.name;
      clientDate.value = previewDialogData.date;
      clientPhone.value = previewDialogData.phone;
      clientService.value = previewDialogData.service;
      isDialogEdit.value = true;
    }

    const editClientToStore = () => {
      const extractDate = date.extractDate(clientDate.value, currentDateFormat);
      const formatDateToStore = date.formatDate(extractDate, 'YYYY/MM/DD');
      const formatTimeToStore = date.formatDate(extractDate, 'HH:mm');

      let dataEditClient = {
        id: previewDialogData.id,
        name: clientName.value,
        date: formatDateToStore,
        time: formatTimeToStore,
        phone: clientPhone.value,
        service: clientService.value
      }
      store.dispatch('storeClients/editClient', dataEditClient);
      isDialogEdit.value = false;
      isDialogPreviewClientInfo.value = false;
    }

    const resetForm = () => {
      clientName.value = '';
      clientDate.value = date.formatDate(Date.now(), currentDateFormat);
      clientPhone.value = '';
      clientService.value = '';
      isDialog.value = false;
    }
    const addClient = () => {
      const extractDate = date.extractDate(clientDate.value, currentDateFormat);
      const formatDateToStore = date.formatDate(extractDate, 'YYYY/MM/DD');
      const formatTimeToStore = date.formatDate(extractDate, 'HH:mm');

      let dataClient = {
        id: uid(),
        name: clientName.value,
        date: formatDateToStore,
        time: formatTimeToStore,
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
      isDialogEdit,
      clientName,
      clientPhone,
      clientDate,
      clientService,
      servicesOptions,
      showDialog,
      isWarningBanner,
      currentDateFormat,
      isDialogPreviewClientInfo,
      showDialogPreviewClientInfo,
      previewDialogData,
      deleteClient,
      editClient,
      editClientToStore
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 20px;
  }
</style>