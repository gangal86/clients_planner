<template>
  <q-dialog v-model="isPreviewClientDialog">
    <q-card>
      <q-card-section class="row items-center q-pt-sm q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-sm">
        <div class="q-pa-xs">
          <q-table
            :rows="previewRows"
            :columns="previewColumns"
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
          class="q-mr-sm"
          color="primary"
          @click="showEditClientDialog"
          no-caps
        />
        <q-btn label="Удалить" color="negative" @click="deleteClient" no-caps />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PreviewClientDialog',
  props: ['modelValue', 'currentUserData'],
  emits: ['update:modelValue', 'update:isEditClientDialog'],
  setup(props, context) {
    const store = useStore();
    const previewColumns = [
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
    ];
    
    const previewRows = computed(() => [
      {
        name: 'Имя',
        value: currentUserDataProp.value.name,
      },
      {
        name: 'Услуга',
        value: currentUserDataProp.value.service,
      },
      {
        name: 'Телефон',
        value: currentUserDataProp.value.phone,
      },
      {
        name: 'Дата',
        value: currentUserDataProp.value.dateCurrentFormat
          ? currentUserDataProp.value.dateCurrentFormat
          : currentUserDataProp.value.date,
      },
    ]);

    const isPreviewClientDialog = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    const currentUserDataProp = computed(() => props.currentUserData);

    const showEditClientDialog = () => {
      context.emit('update:isEditClientDialog', true);
    };

    const deleteClient = () => {
      store.dispatch('storeClients/deleteClient', currentUserDataProp.value.id);
      context.emit('update:modelValue', false);
    };

    return {
      isPreviewClientDialog,
      currentUserDataProp,
      previewColumns,
      previewRows,
      showEditClientDialog,
      deleteClient,
    };
  },
});
</script>

<style lang="scss">
.preview-table {
  td:first-child {
    background-color: #f5f5dc !important;
  }
}
</style>
