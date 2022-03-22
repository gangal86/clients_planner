<template>
  <q-dialog v-model="isAddServiceDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-form class="q-gutter-md" @submit="addService" @reset="resetForm">
            <q-input
              outlined
              v-model="clientServiceName"
              :label="$t('addServiceFormServiceTitle')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || $t('addServiceFormServiceHint'),
              ]"
            />

            <q-input
              outlined
              v-model="clientServicePrice"
              :label="$t('addServiceFormPriceTitle')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || $t('addServiceFormPriceHint'),
              ]"
            />

            <div>
              <q-btn label="Ok" color="primary" type="submit" />
              <q-btn
                :label="$t('addServiceFormBtnCancel')"
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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { uid, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'AddServiceDialog',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const store = useStore();
    const $q = useQuasar();
    let { t } = useI18n({ useScope: 'global' });
    const clientServiceName = ref('');
    const clientServicePrice = ref('');

    const isAddServiceDialog = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    const addService = () => {
      const dataService = {
        id: uid(),
        name: clientServiceName.value.trim(),
        price: clientServicePrice.value.trim(),
      };
      store.dispatch('storeClients/addService', dataService);
      resetForm();
      $q.notify({
        type: 'positive',
        message: t('addServiceFormNotifyPositive'),
      });
    };

    const resetForm = () => {
      clientServiceName.value = '';
      clientServicePrice.value = '';
      isAddServiceDialog.value = false;
    };

    return {
      clientServiceName,
      clientServicePrice,
      isAddServiceDialog,
      addService,
      resetForm,
    };
  },
});
</script>
