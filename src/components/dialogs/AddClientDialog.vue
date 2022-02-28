<template>
  <q-dialog v-model="isAddClientDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-form class="q-gutter-md" @submit="addClient" @reset="resetForm">
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

            <q-input outlined v-model="clientDateProp">
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="clientDateProp"
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
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { date, uid } from 'quasar';
import { useExport } from '../../helpers/useExport';

export default defineComponent({
  name: 'AddClientDialog',
  props: ['modelValue', 'clientDate'],
  emits: ['update:modelValue', 'update:clientDate'],
  setup(props, context) {
    const store = useStore();
    const clientName = ref('');
    const clientService = ref('');
    const clientPhone = ref('');
    const { currentDateFormat } = useExport();
    const clientDateProp = computed({
      get() {
        return props.clientDate;
      },
      set(val) {
        context.emit('update:clientDate', val);
      },
    });
    const isAddClientDialog = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    const servicesOptions = computed(() =>
      store.getters['storeClients/getAllClientsServices'].map(
        (item) => item.name
      )
    );

    const resetForm = () => {
      clientName.value = '';
      clientDateProp.value = date.formatDate(Date.now(), currentDateFormat);
      clientPhone.value = '';
      clientService.value = '';
      isAddClientDialog.value = false;
    };

    const addClient = () => {
      const extractDate = date.extractDate(
        clientDateProp.value,
        currentDateFormat
      );
      const formatDateToStore = date.formatDate(extractDate, 'YYYY/MM/DD');
      const formatTimeToStore = date.formatDate(extractDate, 'HH:mm');

      const dataClient = {
        id: uid(),
        name: clientName.value,
        date: formatDateToStore,
        time: formatTimeToStore,
        phone: clientPhone.value,
        service: clientService.value,
      };
      store.dispatch('storeClients/addClient', dataClient);
      resetForm();
    };

    return {
      isAddClientDialog,
      clientName,
      clientService,
      clientPhone,
      currentDateFormat,
      clientDateProp,
      servicesOptions,
      resetForm,
      addClient,
    };
  },
});
</script>
