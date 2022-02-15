<template>
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
  import { defineComponent, computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { date } from 'quasar';
  
  export default defineComponent({
    name: 'EditClientDialog',
    props: [
      'modelValue',
      'currentUserData'
    ],
    emits: [
      'update:currentUserData',
      'update:isDialogPreviewClientInfo',
      'update:modelValue'
      ],
    setup (props, context) {
      const store = useStore();
      const isDialog = ref(false);
      const isDialogEdit = computed({
        get() {
          return props.modelValue;
        },
        set(val) {
          context.emit('update:modelValue', val);
        }
      });

      const clientName = computed({
        get() {
          return props.currentUserData.name;
        },
        set(val) {
          let copyCurrentUserData = Object.assign({}, props.currentUserData);
          copyCurrentUserData.name = val;
          context.emit('update:currentUserData', copyCurrentUserData);
        }
      });
      const clientService = computed({
        get() {
          return props.currentUserData.service;
        },
        set(val) {
          let copyCurrentUserData = Object.assign({}, props.currentUserData);
          copyCurrentUserData.service = val;
          context.emit('update:currentUserData', copyCurrentUserData);
        }
      });
      const clientPhone = computed({
        get() {
          return props.currentUserData.phone;
        },
        set(val) {
          let copyCurrentUserData = Object.assign({}, props.currentUserData);
          copyCurrentUserData.phone = val;
          context.emit('update:currentUserData', copyCurrentUserData);
        }
      });
      const clientDate = computed({
        get() {
          if (props.currentUserData.dateCurrentFormat !== undefined) {
            return props.currentUserData.dateCurrentFormat;
          }
          return props.currentUserData.date;
        },
        set(val) {
          let copyCurrentUserData = Object.assign({}, props.currentUserData);
          if (copyCurrentUserData.dateCurrentFormat !== undefined) {
            copyCurrentUserData.dateCurrentFormat = val;
          }else{
            copyCurrentUserData.date = val;
          }
          context.emit('update:currentUserData', copyCurrentUserData);
        }
      });

      const currentDateFormat = 'HH:mm - DD/MM/YYYY';

      const servicesOptions = computed(() => store.getters['storeClients/getAllClientsServices'].map(item => item.name));

      const editClientToStore = () => {
        const extractDate = date.extractDate(clientDate.value, currentDateFormat);
        const formatDateToStore = date.formatDate(extractDate, 'YYYY/MM/DD');
        const formatTimeToStore = date.formatDate(extractDate, 'HH:mm');

        let dataEditClient = {
          id: props.currentUserData.id,
          name: clientName.value,
          date: formatDateToStore,
          time: formatTimeToStore,
          phone: clientPhone.value,
          service: clientService.value
        }
        store.dispatch('storeClients/editClient', dataEditClient);
        isDialogEdit.value = false;
        context.emit('update:isDialogPreviewClientInfo', false)
      }

      const resetForm = () => {
        isDialogEdit.value = false;
      }


      return {
        resetForm,
        isDialogEdit,
        isDialog,
        clientName,
        clientPhone,
        clientDate,
        clientService,
        servicesOptions,
        currentDateFormat,
        editClientToStore
      }
  }
  })
</script>
