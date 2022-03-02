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
          :label="$t('previewClientBtnEdit')"
          class="q-mr-sm"
          color="primary"
          @click="showEditClientDialog"
          no-caps
        />
        <q-btn :label="$t('previewClientBtnDelete')" color="negative" @click="deleteClient" no-caps />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'PreviewClientDialog',
  props: ['modelValue', 'currentUserData'],
  emits: ['update:modelValue', 'update:isEditClientDialog'],
  setup(props, context) {
    const store = useStore();
    let { t } = useI18n({ useScope: 'global' });
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
        name: t('previewClientNameTitle'),
        value: currentUserDataProp.value.name,
      },
      {
        name: t('previewClientServiceTitle'),
        value: currentUserDataProp.value.service,
      },
      {
        name: t('previewClientPhoneTitle'),
        value: currentUserDataProp.value.phone,
      },
      {
        name: t('previewClientDateTitle'),
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
