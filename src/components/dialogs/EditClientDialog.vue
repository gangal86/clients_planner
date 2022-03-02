<template>
  <q-dialog v-model="isEditClientDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-form
            class="q-gutter-md"
            @submit="editClient"
            @reset="isEditClientDialog = false"
          >
            <q-input
              outlined
              v-model="clientName"
              label="Имя *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Пожалуйста, введите имя',
              ]"
            />

            <q-select
              outlined
              v-model="clientService"
              :options="servicesOptions"
              label="Услуга *"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Пожалуйста, введите услугу',
              ]"
            />

            <q-input
              outlined
              v-model="clientPhone"
              label="Телефон *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Пожалуйста, введите номер телефона',
              ]"
            />

            <q-input outlined v-model="clientDate">
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="clientDate"
                      :mask="currentDateFormat"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Ok" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="clientDate"
                      :mask="currentDateFormat"
                      :locale="currentLocale"
                      first-day-of-week="1"
                    >
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
              <q-btn
                label="Отмена"
                color="primary"
                flat
                class="q-ml-sm"
                type="reset"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { date } from 'quasar';
import { useExport } from '../../helpers/useExport';

export default defineComponent({
  name: 'EditClientDialog',
  props: ['modelValue', 'currentUserData'],
  emits: [
    'update:currentUserData',
    'update:isPreviewClientDialog',
    'update:modelValue',
  ],
  setup(props, context) {
    const store = useStore();
    const { currentDateFormat } = useExport();
    const { calendarLocaleRu, calendarLocaleEn } = useExport();
    const currentLocale = ref('');

    const stateCurrentLocale = computed(
      () => store.getters['storeClients/getCurrentLocale']
    );

    stateCurrentLocale.value === 'ru'
      ? (currentLocale.value = calendarLocaleRu)
      : (currentLocale.value = calendarLocaleEn);

    const isEditClientDialog = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    const clientName = computed({
      get() {
        return props.currentUserData.name;
      },
      set(val) {
        const сurrentUserDataProp = Object.assign({}, props.currentUserData);
        сurrentUserDataProp.name = val;
        context.emit('update:currentUserData', сurrentUserDataProp);
      },
    });
    const clientService = computed({
      get() {
        return props.currentUserData.service;
      },
      set(val) {
        const сurrentUserDataProp = Object.assign({}, props.currentUserData);
        сurrentUserDataProp.service = val;
        context.emit('update:currentUserData', сurrentUserDataProp);
      },
    });
    const clientPhone = computed({
      get() {
        return props.currentUserData.phone;
      },
      set(val) {
        const сurrentUserDataProp = Object.assign({}, props.currentUserData);
        сurrentUserDataProp.phone = val;
        context.emit('update:currentUserData', сurrentUserDataProp);
      },
    });
    const clientDate = computed({
      get() {
        if (props.currentUserData.dateCurrentFormat !== undefined) {
          return props.currentUserData.dateCurrentFormat;
        }
        return props.currentUserData.date;
      },
      set(val) {
        const сurrentUserDataProp = Object.assign({}, props.currentUserData);
        if (сurrentUserDataProp.dateCurrentFormat !== undefined) {
          сurrentUserDataProp.dateCurrentFormat = val;
        } else {
          сurrentUserDataProp.date = val;
        }
        context.emit('update:currentUserData', сurrentUserDataProp);
      },
    });

    const servicesOptions = computed(() =>
      store.getters['storeClients/getAllClientsServices'].map(
        (item) => item.name
      )
    );

    watch(
      () => stateCurrentLocale.value,
      () => {
        stateCurrentLocale.value === 'ru'
          ? (currentLocale.value = calendarLocaleRu)
          : (currentLocale.value = calendarLocaleEn);
      }
    );

    const editClient = () => {
      const extractDate = date.extractDate(clientDate.value, currentDateFormat);
      const formatDateToStore = date.formatDate(extractDate, 'YYYY/MM/DD');
      const formatTimeToStore = date.formatDate(extractDate, 'HH:mm');

      const dataEditClient = {
        id: props.currentUserData.id,
        name: clientName.value,
        date: formatDateToStore,
        time: formatTimeToStore,
        phone: clientPhone.value,
        service: clientService.value,
      };
      store.dispatch('storeClients/editClient', dataEditClient);
      isEditClientDialog.value = false;
      context.emit('update:isPreviewClientDialog', false);
    };

    return {
      isEditClientDialog,
      clientName,
      clientPhone,
      clientDate,
      clientService,
      servicesOptions,
      currentDateFormat,
      currentLocale,
      editClient,
    };
  },
});
</script>
