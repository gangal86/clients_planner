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
    class="col q-mt-md q-mx-md"
  />
  </div>

  <q-card class="q-mx-md" v-touch-swipe.mouse.right.left="userHasSwiped">
    <q-card-section>
      <div class="row justify-center">
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
          <q-item v-if="client.date === dateNow" @click="showDialogPreviewClientInfo(client.id)" clickable v-ripple>
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

      <PreviewClientDialog 
        v-model="isDialogPreviewClientInfo" 
        :currentUserData="currentUserData"
        @update:isDialogEdit="isDialogEdit = $event"
      />

      </q-list>
    </q-card-section>
  </q-card>

  <AddClientDialog 
    v-model="showDialog" 
    :addClientDate="clientDate" 
    @update:addClientDate="clientDate = $event" 
  />

  <EditClientDialog 
    v-model="isDialogEdit" 
    :currentUserData="currentUserData" 
    @update:currentUserData="currentUserData = $event"
    @update:isDialogPreviewClientInfo="isDialogPreviewClientInfo = $event" 
  />

</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { date } from 'quasar';
import AddClientDialog from 'src/components/dialogs/AddClientDialog.vue';
import EditClientDialog from 'src/components/dialogs/EditClientDialog.vue';
import PreviewClientDialog from 'src/components/dialogs/PreviewClientDialog.vue';

export default defineComponent ({
  name: 'Calendar',
  components: {
    AddClientDialog,
    EditClientDialog,
    PreviewClientDialog
  },
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

    let currentClientId = ref(allClients.value.find(item => typeof item.id === 'string').id);
    const currentUserData = ref(allClients.value.find(item => item.id === currentClientId.value));

    const updateDate = (value, reason, details) => {
      if (reason == 'remove-day') {
        setTimeout(() => {
          calendar.value.setToday();
        }, 100);
      }
      //isCard.value = true;
      //allClientsDates.value.find(item => date.formatDate(item, 'DD/MM/YYYY') === dateNow.value)? isDialog.value = true: isDialog.value = false;
    }

    const showDialogPreviewClientInfo = (clientId) => {
      isDialogPreviewClientInfo.value = true;
      currentClientId.value = clientId;
      currentUserData.value = allClients.value.find(item => item.id === currentClientId.value);
    }

    const currentLocale = {
        days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
        daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_')
    }

    const servicesOptions = computed(() => store.getters['storeClients/getAllClientsServices'].map(item => item.name));

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
      currentDateFormat,
      servicesOptions,
      showDialogPreviewClientInfo,
      isDialogPreviewClientInfo,
      isDialogEdit,
      userHasSwiped,
      currentUserData
    }
  }
});
</script>
