<template>
  <q-dialog v-model="isEditServiceDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          Test Card <br />
          {{ currentServiceDataProp.id }}<br />
          {{ currentServiceDataProp.name }}<br />
          {{ currentServiceDataProp.price }}<br />
        </div>
      </q-card-section>
      <div>
        <q-btn label="Изменить" color="primary" @click="showEditServiceDialog" />
        <q-btn label="Удалить" color="primary" @click="deleteService" />
        <q-btn
          label="Отмена"
          color="primary"
          flat
          class="q-ml-sm"
          @click="isEditServiceDialog = false"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PreviewServiceDialog',
  props: ['modelValue', 'currentServiceData'],
  emits: ['update:modelValue', 'update:isEditServiceDialog'],
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

    const currentServiceDataProp = computed(() => props.currentServiceData);

    const showEditServiceDialog = () => {
      context.emit('update:isEditServiceDialog', true);
    };

    const deleteService = () => {
      store.dispatch('storeClients/deleteService', currentServiceDataProp.value.id);
      context.emit('update:modelValue', false);
    };

    return {
      isEditServiceDialog,
      currentServiceDataProp,
      showEditServiceDialog,
      deleteService,
    };
  },
});
</script>
