<template>
  <q-dialog v-model="isEditClientDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          Test Card <br />
          {{ currentUserDataProp.name }}<br />
          {{ currentUserDataProp.service }}<br />
          {{ currentUserDataProp.phone }}<br />
          {{ currentUserDataProp.date }}<br />
        </div>
      </q-card-section>
      <div>
        <q-btn label="Изменить" color="primary" @click="showEditClientDialog" />
        <q-btn label="Удалить" color="primary" @click="deleteClient" />
        <q-btn
          label="Отмена"
          color="primary"
          flat
          class="q-ml-sm"
          @click="isEditClientDialog = false"
        />
      </div>
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
