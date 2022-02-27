<template>
  <q-dialog v-model="isPreviewServiceDialog">
    <q-card>
      <q-card-section class="row items-center q-pt-sm q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-sm">
        <div class="q-pa-xs">
          <q-table
            :rows="[
              {
                name: 'Услуга',
                value: currentServiceDataProp.name,
              },
              {
                name: 'Цена',
                value: currentServiceDataProp.price,
              },
            ]"
            :columns="[
              {
                name: 'name',
                align: 'left',
                field: 'name',
              },
              {
                name: 'value',
                align: 'center',
                field: 'value',
              },
            ]"
            class="preview-table"
            row-key="name"
            hide-header
            hide-bottom
          />
        </div>
      </q-card-section>
      <q-card-section class="row justify-center q-pt-none q-pb-sm">
        <q-btn
          label="Изменить"
          color="primary"
          class="q-mr-sm"
          @click="showEditServiceDialog"
          no-caps
        />
        <q-btn
          label="Удалить"
          color="negative"
          @click="deleteService"
          no-caps
        />
      </q-card-section>
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

    const isPreviewServiceDialog = computed({
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
      store.dispatch(
        'storeClients/deleteService',
        currentServiceDataProp.value.id
      );
      context.emit('update:modelValue', false);
    };

    return {
      isPreviewServiceDialog,
      currentServiceDataProp,
      showEditServiceDialog,
      deleteService,
    };
  },
});
</script>
