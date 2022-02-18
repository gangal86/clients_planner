<template>
  <q-dialog v-model="isAddServiceDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <q-form class="q-gutter-md" @submit="addService" @reset="resetForm">
            <q-input
              outlined
              v-model="clientServiceName"
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
              v-model="clientServicePrice"
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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { uid } from 'quasar';

export default defineComponent({
  name: 'AddServiceDialog',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const store = useStore();
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
        name: clientServiceName.value,
        price: clientServicePrice.value,
      };
      store.dispatch('storeClients/addService', dataService);
      resetForm();
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
