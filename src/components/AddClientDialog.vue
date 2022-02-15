<template>
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
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { date, uid } from 'quasar';

export default defineComponent({
  name: 'AddClientDialog',
  props: [
    'modelValue',
    'addClientDate'
  ],
  emits: [
    'update:modelValue',
    'update:addClientDate'
  ],
  setup(props, context) {
    const store = useStore();
    const isDialog = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        context.emit('update:modelValue', val);
      }
    });
    const clientName = ref('');
    const clientService = ref('');
    const clientPhone = ref('');
    const currentDateFormat = 'HH:mm - DD/MM/YYYY';
    const clientDate = computed({
      get() {
        return props.addClientDate;
      },
      set(val) {
        context.emit('update:addClientDate', val);
      }
    });

    const servicesOptions = computed(() => store.getters['storeClients/getAllClientsServices'].map(item => item.name));

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
      isDialog,
      clientName,
      clientService,
      clientPhone,
      currentDateFormat,
      clientDate,
      resetForm,
      addClient,
      servicesOptions
    }
  }
})
</script>
