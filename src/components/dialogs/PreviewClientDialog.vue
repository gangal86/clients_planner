<template>
  <q-dialog v-model="isEditClientDialog">
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
                name: 'Имя',
                value: currentUserDataProp.name,
              },
              {
                name: 'Услуга',
                value: currentUserDataProp.service,
              },
              {
                name: 'Телефон',
                value: currentUserDataProp.phone,
              },
              {
                name: 'Дата',
                value: currentUserDataProp.dateCurrentFormat
                  ? currentUserDataProp.dateCurrentFormat
                  : currentUserDataProp.date,
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
    const isEditClientDialog = computed({
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
      isEditClientDialog,
      currentUserDataProp,
      showEditClientDialog,
      deleteClient,
    };
  },
});
</script>

<style lang="scss">
.preview-table {
  td:first-child {
    background-color: #f5f5dc;
  }
}
</style>
