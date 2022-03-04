<template>
  <q-dialog v-model="isEditServiceDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-form
            class="q-gutter-md"
            @submit="editService"
            @reset="isEditServiceDialog = false"
          >
            <q-input
              outlined
              v-model="serviceName"
              :label="$t('editServiceFormServiceTitle')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || $t('editClientFormServiceHint'),
              ]"
            />

            <q-input
              outlined
              v-model="servicePrice"
              :label="$t('editServiceFormPriceTitle')"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || $t('editServiceFormPriceHint'),
              ]"
            />

            <div>
              <q-btn label="Ok" color="primary" type="submit" />
              <q-btn
                :label="$t('editServiceFormBtnCancel')"
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
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'EditServiceDialog',
  props: ['modelValue', 'currentServiceData'],
  emits: [
    'update:currentServiceData',
    'update:isPreviewServiceDialog',
    'update:modelValue',
  ],
  setup(props, context) {
    const store = useStore();
    const $q = useQuasar();
    let { t } = useI18n({ useScope: 'global' });

    const isEditServiceDialog = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    const serviceName = computed({
      get() {
        return props.currentServiceData.name;
      },
      set(val) {
        const сurrentServiceDataProp = Object.assign(
          {},
          props.currentServiceData
        );
        сurrentServiceDataProp.name = val;
        context.emit('update:currentServiceData', сurrentServiceDataProp);
      },
    });
    const servicePrice = computed({
      get() {
        return props.currentServiceData.price;
      },
      set(val) {
        const сurrentServiceDataProp = Object.assign(
          {},
          props.currentServiceData
        );
        сurrentServiceDataProp.price = val;
        context.emit('update:currentServiceData', сurrentServiceDataProp);
      },
    });

    const editService = () => {
      const dataEditService = {
        id: props.currentServiceData.id,
        name: serviceName.value,
        price: servicePrice.value,
      };
      store.dispatch('storeClients/editService', dataEditService);
      isEditServiceDialog.value = false;
      context.emit('update:isPreviewServiceDialog', false);
      $q.notify({
        type: 'positive',
        message: t('editServiceFormNotifyPositive'),
      });
    };

    return {
      isEditServiceDialog,
      serviceName,
      servicePrice,
      editService,
    };
  },
});
</script>
