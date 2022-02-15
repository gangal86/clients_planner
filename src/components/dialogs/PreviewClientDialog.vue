<template>
  <q-dialog v-model="isDialogPreviewClientInfo">
    <q-card>
        <q-card-section>
          <div class="q-pa-md">
              Test Card <br />
              {{ currentUser.name }}<br />
              {{ currentUser.service }}<br />
              {{ currentUser.phone }}<br />
              {{ currentUser.date }}<br />     
          </div>
        </q-card-section>
        <div>
          <q-btn label="Изменить" color="primary" @click="editClient" />
          <q-btn label="Удалить" color="primary" @click="deleteClient" />
          <q-btn label="Отмена" color="primary" flat class="q-ml-sm" @click="isDialogPreviewClientInfo = false" />
        </div>
    </q-card>
  </q-dialog>
</template>

<script>
  import { defineComponent, computed } from  'vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'PreviewClientDialog',
    props: [
      'modelValue',
      'currentUserData'
    ],
    emits: [
      'update:modelValue',
      'update:isDialogEdit'
    ],
    setup(props, context) {
      const store = useStore();
      const isDialogPreviewClientInfo = computed({
        get(){
          return props.modelValue;
        },
        set(val) {
          context.emit('update:modelValue', val);
        }
      });

      const currentUser = computed(() => props.currentUserData);

      const editClient = () => {
        context.emit('update:isDialogEdit', true)
      }

      const deleteClient = () => {
        store.dispatch('storeClients/deleteClient', currentUser.value.id)
        context.emit('update:modelValue', false);
      }

      return {
        isDialogPreviewClientInfo,
        currentUser,
        editClient,
        deleteClient
      }
    }
  })
</script>
