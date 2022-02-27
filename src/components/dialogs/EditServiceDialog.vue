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
              label="Услуга *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Пожалуйста, введите название услуги',
              ]"
            />

            <q-input
              outlined
              v-model="servicePrice"
              label="Цена *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Пожалуйста, введите цену услуги',
              ]"
            />

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
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

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
