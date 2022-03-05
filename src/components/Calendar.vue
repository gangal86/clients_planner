<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div>
      <div class="row justify-center">
        <q-date
          v-model="dateNow"
          mask="DD/MM/YYYY"
          :events="allClientsDates"
          event-color="orange"
          @update:model-value="updateDate"
          ref="calendar"
          :locale="currentLocale"
          first-day-of-week="1"
          class="col q-mt-md q-mx-md"
        />
      </div>

      <q-card
        class="q-mx-md"
        v-touch-swipe.mouse.right.left="calendarCardHasSwiped"
      >
        <q-card-section>
          <div class="row justify-center">
            <q-btn
              no-caps
              outline
              rounded
              color="primary"
              icon="add"
              :label="$t('btnTitleAddClient')"
              @click="showAddClientDialog"
            />
          </div>
          <q-list separator class="q-my-xs">
            <transition-group
              appear
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
            >
              <template v-for="client in allClients" :key="client.id">
                <q-item
                  v-if="client.date === dateNow"
                  @click="showPreviewClientDialog(client.id)"
                  clickable
                  v-ripple
                >
                  <q-item-section v-if="allClients.length > 0" avatar>
                    <q-avatar color="primary" text-color="white">
                      {{ client.name.charAt(0) }}
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-primary">{{
                      client.name.substring(0, 20)
                    }}</q-item-label>
                    <q-item-label caption lines="1" class="text-dark">{{
                      client.dateCurrentFormat
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label class="text-dark">{{
                      client.service.substring(0, 15)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </transition-group>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </transition>

  <PreviewClientDialog
    v-model="isPreviewClientDialog"
    :currentUserData="currentUserData"
    @update:isEditClientDialog="isEditClientDialog = $event"
  />

  <AddClientDialog
    v-model="isAddClientDialog"
    :clientDate="clientDate"
    @update:clientDate="clientDate = $event"
  />

  <EditClientDialog
    v-model="isEditClientDialog"
    :currentUserData="currentUserData"
    @update:currentUserData="currentUserData = $event"
    @update:isPreviewClientDialog="isPreviewClientDialog = $event"
  />
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { date, useQuasar } from 'quasar';
import { useExport } from '../helpers/useExport';
import { useI18n } from 'vue-i18n';
import AddClientDialog from 'src/components/dialogs/AddClientDialog.vue';
import EditClientDialog from 'src/components/dialogs/EditClientDialog.vue';
import PreviewClientDialog from 'src/components/dialogs/PreviewClientDialog.vue';

export default defineComponent({
  name: 'Calendar',
  components: {
    AddClientDialog,
    EditClientDialog,
    PreviewClientDialog,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const { calendarLocaleRu, calendarLocaleEn } = useExport();
    let { t } = useI18n({ useScope: 'global' });
    const isEditClientDialog = ref(false);
    const isAddClientDialog = ref(false);
    const isPreviewClientDialog = ref(false);
    const calendar = ref(null);
    const currentUserData = ref(null);
    const clientName = ref('');
    const clientService = ref('');
    const clientPhone = ref('');
    const dateNow = ref(date.formatDate(Date.now(), 'DD/MM/YYYY'));
    const { currentDateFormat } = useExport();
    const clientDate = ref(
      date.formatDate(
        date.extractDate(dateNow.value, 'DD/MM/YYYY'),
        currentDateFormat
      )
    );
    const currentLocale = ref('');

    const stateCurrentLocale = computed(
      () => store.getters['storeClients/getCurrentLocale']
    );

    stateCurrentLocale.value === 'ru'
      ? (currentLocale.value = calendarLocaleRu)
      : (currentLocale.value = calendarLocaleEn);

    const allClientsDates = computed(
      () => store.getters['storeClients/getAllClientsDates']
    );

    const servicesOptions = computed(() =>
      store.getters['storeClients/getAllClientsServices'].map(
        (item) => item.name
      )
    );

    const allClients = computed(() =>
      store.getters['storeClients/getAllClients']
        .map(function (item) {
          return {
            id: item.id,
            name: item.name,
            date: date.formatDate(item.date, 'DD/MM/YYYY'),
            dateCurrentFormat: date.formatDate(
              `${item.date} ${item.time}`,
              currentDateFormat
            ),
            time: item.time,
            phone: item.phone,
            service: item.service,
          };
        })
        .sort(function (a, b) {
          return new Date(
            date.formatDate(
              date.extractDate(a.dateCurrentFormat, currentDateFormat),
              '2020/01/01 HH:mm'
            )
          ).getTime() >
            new Date(
              date.formatDate(
                date.extractDate(b.dateCurrentFormat, currentDateFormat),
                '2020/01/01 HH:mm'
              )
            ).getTime()
            ? 1
            : -1;
        })
    );

    watch(
      () => dateNow.value,
      () => {
        clientDate.value = date.formatDate(
          date.extractDate(dateNow.value, 'DD/MM/YYYY'),
          currentDateFormat
        );
      }
    );

    watch(
      () => stateCurrentLocale.value,
      () => {
        stateCurrentLocale.value === 'ru'
          ? (currentLocale.value = calendarLocaleRu)
          : (currentLocale.value = calendarLocaleEn);
      }
    );

    const updateDate = (value, reason, details) => {
      if (reason == 'remove-day') {
        setTimeout(() => {
          calendar.value.setToday();
        }, 100);
      }
    };

    const showPreviewClientDialog = (clientId) => {
      isPreviewClientDialog.value = true;
      currentUserData.value = allClients.value.find(
        (item) => item.id === clientId
      );
    };

    const calendarCardHasSwiped = ({ evt, ...newInfo }) => {
      const currentDate = new Date(
        date.formatDate(
          date.extractDate(dateNow.value, 'DD/MM/YYYY'),
          'YYYY/MM/DD'
        )
      );
      if (newInfo.direction === 'left') {
        currentDate.setDate(currentDate.getDate() + 1);
        dateNow.value = date.formatDate(currentDate, 'DD/MM/YYYY');
      }
      if (newInfo.direction === 'right') {
        currentDate.setDate(currentDate.getDate() - 1);
        dateNow.value = date.formatDate(currentDate, 'DD/MM/YYYY');
      }
    };

    const showAddClientDialog = () => {
      if (servicesOptions.value.length === 0) {
        $q.notify({
          type: 'negative',
          message: t('notifyMsgAddService'),
        });
        return;
      }
      isAddClientDialog.value = true;
    };

    return {
      dateNow,
      allClientsDates,
      allClients,
      calendar,
      updateDate,
      currentLocale,
      isAddClientDialog,
      clientName,
      clientPhone,
      clientDate,
      clientService,
      currentDateFormat,
      servicesOptions,
      showPreviewClientDialog,
      isPreviewClientDialog,
      isEditClientDialog,
      calendarCardHasSwiped,
      currentUserData,
      showAddClientDialog,
    };
  },
});
</script>
