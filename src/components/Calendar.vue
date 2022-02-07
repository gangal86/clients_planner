<template>
  <div class="row justify-center">
  <q-date
    v-model="dateNow"
    mask="DD/MM/YYYY"
    :events="allClientsDates"
    event-color="orange"
    @update:model-value="updateDate"
    ref="calendar"
    :locale="currentLocale"
    class="col q-ma-md"
  />
  </div>

  <q-card v-touch-swipe.mouse.right.left="userHasSwiped">
    <q-card-section>
      <div class="text-h6 q-mb-md">{{ dateNow }}</div>
      <q-btn icon="close" flat round dense v-close-popup />
      <div class="row justify-center q-mt-md">
        <q-btn
          no-caps
          outline
          rounded
          color="primary"
          icon="add"
          label="Добавить клиента"
          @click="showDialog = true"
        />
      </div>
      <q-list separator class="q-my-md">
        <template v-for="client in allClients" :key="client.id">
          <q-item v-if="client.date === dateNow" @click="showDialogPreviewClientInfo({id: client.id, name: client.name, date: client.date, dateCurrentFormat: client.dateCurrentFormat, phone: client.phone, service: client.service})" clickable v-ripple>
            <q-item-section v-if="allClients.length > 0" avatar>
              <q-avatar color="primary" text-color="white">
                {{ client.name.charAt(0) }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-primary">{{ client.name.substring(0, 20) }}</q-item-label>
              <q-item-label caption lines="1" class="text-dark">{{ client.dateCurrentFormat }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="text-dark">{{ client.service.substring(0, 15) }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
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
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDialog">
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
</template>

<script>
import { defineComponent, ref, computed, watch, reactive} from 'vue';
import { useStore } from 'vuex';
import { date, uid } from 'quasar';

export default defineComponent ({
  name: 'Calendar',
  setup () {
    const store = useStore();
    const isDialogEdit = ref(false);
    const dateNow = ref(date.formatDate(Date.now(), 'DD/MM/YYYY'));
    const calendar = ref();
    const showDialog = ref(false);
    let isDialogPreviewClientInfo = ref(false);
    const clientName = ref('');
    const clientService = ref('');
    const clientPhone = ref('');
    const previewDialogData = reactive({
      id: '',
      name:'',
      date: '',
      dateCurrentFormat: '',
      phone: '',
      service: ''
    });
    const currentDateFormat = 'HH:mm - DD/MM/YYYY';
    const clientDate = ref(date.formatDate(date.extractDate(dateNow.value, 'DD/MM/YYYY'), currentDateFormat));

    watch(() => dateNow.value, () => {
      clientDate.value = date.formatDate(date.extractDate(dateNow.value, 'DD/MM/YYYY'), currentDateFormat);
    });

    const allClientsDates = computed(() => store.getters['storeClients/getAllClientsDates']);

    const allClients = computed(() => store.getters['storeClients/getAllClients'].map(function(item) {
      return {
        id: item.id,
        name: item.name,
        date: date.formatDate(item.date, 'DD/MM/YYYY'),
        dateCurrentFormat: date.formatDate(`${item.date} ${item.time}`, currentDateFormat),
        time: item.time,
        phone: item.phone,
        service: item.service
      }
    }).sort(function(a, b) {
      return new Date(date.formatDate(date.extractDate(a.dateCurrentFormat, currentDateFormat), '2020/01/01 HH:mm')).getTime() > new Date(date.formatDate(date.extractDate(b.dateCurrentFormat, currentDateFormat), '2020/01/01 HH:mm')).getTime() ? 1 : -1;
    }));

    const updateDate = (value, reason, details) => {
      if (reason == 'remove-day') {
        setTimeout(() => {
          calendar.value.setToday();
        }, 100);
      }
      //isCard.value = true;
      //allClientsDates.value.find(item => date.formatDate(item, 'DD/MM/YYYY') === dateNow.value)? isDialog.value = true: isDialog.value = false;
    }

    const showDialogPreviewClientInfo = (data) => {
      isDialogPreviewClientInfo.value = true;
      previewDialogData.id = data.id;
      previewDialogData.name = data.name;
      previewDialogData.date = data.date;
      previewDialogData.dateCurrentFormat = data.dateCurrentFormat;
      previewDialogData.phone = data.phone;
      previewDialogData.service = data.service;
    }

    const editClient = () => {
      clientName.value = previewDialogData.name;
      clientDate.value = previewDialogData.dateCurrentFormat;
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

    const deleteClient = () => {
      store.dispatch('storeClients/deleteClient', previewDialogData.id)
      isDialogPreviewClientInfo.value = false;
    }

    const currentLocale = {
        days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
        daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_')
    }

    const servicesOptions = computed(() => store.getters['storeClients/getAllClientsServices'].map(item => item.name));

    const resetForm = () => {
      clientName.value = '';
      clientPhone.value = '';
      clientService.value = '';
      showDialog.value = false;
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

    const userHasSwiped = ({ evt, ...newInfo }) => {
      const formatDate = date.formatDate(date.extractDate(dateNow.value, 'DD/MM/YYYY'), 'YYYY/MM/DD');
      let currentDate = new Date(formatDate);
      if (newInfo.direction === 'left') {
        currentDate.setDate(currentDate.getDate() + 1);
        dateNow.value = date.formatDate(currentDate, 'DD/MM/YYYY');
      }
      if (newInfo.direction === 'right') {
        currentDate.setDate(currentDate.getDate() - 1);
        dateNow.value = date.formatDate(currentDate, 'DD/MM/YYYY');
      }
    }

    return {
      dateNow,
      allClientsDates,
      allClients,
      calendar,
      updateDate,
      currentLocale,
      showDialog,
      clientName,
      clientPhone,
      clientDate,
      clientService,
      resetForm,
      addClient,
      currentDateFormat,
      servicesOptions,
      showDialogPreviewClientInfo,
      isDialogPreviewClientInfo,
      editClient,
      deleteClient,
      previewDialogData,
      isDialogEdit,
      editClientToStore,
      userHasSwiped
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-date {
    max-width: 350px; 
  }
</style>
