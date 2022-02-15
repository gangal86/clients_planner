<template>
  <div class="row justify-center q-mt-md">
    <q-btn
      no-caps
      outline
      rounded
      color="primary"
      icon="add"
      label="Добавить клиента"
      @click="showDialog"
    />
  </div>
  <q-list separator class="q-my-md">
    <q-item v-for="client in allClients" :key="client.id" @click="showDialogPreviewClientInfo(client.id)" clickable v-ripple>
      <q-item-section v-if="allClients.length > 0" avatar>
        <q-avatar color="primary" text-color="white">
          {{ client.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary">{{ client.name.substring(0, 20) }}</q-item-label>
        <q-item-label caption lines="1" class="text-dark">{{ client.date }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-dark">{{ client.service.substring(0, 15) }}</q-item-label>
      </q-item-section>
    </q-item>

  <PreviewClientDialog 
    v-model="isDialogPreviewClientInfo" 
    :currentUserData="currentUserData"
    @update:isDialogEdit="isDialogEdit = $event"
  />

  </q-list>

  <AddClientDialog v-model="isDialog" />

  <EditClientDialog 
    v-model="isDialogEdit" 
    :currentUserData="currentUserData" 
    @update:currentUserData="currentUserData = $event"
    @update:isDialogPreviewClientInfo="isDialogPreviewClientInfo = $event" 
  />

  <q-banner v-if="isWarningBanner" inline-actions class="text-white bg-red">
    Сперва добавьте хотя бы одну услугу.
  </q-banner>  
</template>

<script>
  import { defineComponent, computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { date } from 'quasar';
  import AddClientDialog from 'components/AddClientDialog.vue';
  import EditClientDialog from 'components/EditClientDialog.vue';
  import PreviewClientDialog from 'components/PreviewClientDialog.vue';

  export default defineComponent({
    name: 'ClientsList',
    components: {
      AddClientDialog,
      EditClientDialog,
      PreviewClientDialog
    },
    setup () {
      const store = useStore();
      const isDialog = ref(false);
      const isDialogEdit = ref(false);
      const isDialogPreviewClientInfo = ref(false);
      const isWarningBanner = ref(false);
      const currentDateFormat = 'HH:mm - DD/MM/YYYY';

      const allClients = computed(() => store.getters['storeClients/getAllClients'].map(function(item) {
        return {
          id: item.id,
          name: item.name,
          date: date.formatDate(`${item.date} ${item.time}`, currentDateFormat),
          time: item.time,
          phone: item.phone,
          service: item.service
        }
      }).sort(function(a, b) {
        return new Date(date.formatDate(date.extractDate(a.date, currentDateFormat), 'YYYY/MM/DD HH:mm')).getTime() > new Date(date.formatDate(date.extractDate(b.date, currentDateFormat), 'YYYY/MM/DD HH:mm')).getTime() ? 1 : -1;
      }));

      let currentClientId = ref(allClients.value.find(item => typeof item.id === 'string').id);
      const currentUserData = ref(allClients.value.find(item => item.id === currentClientId.value));

      const servicesOptions = computed(() => store.getters['storeClients/getAllClientsServices'].map(item => item.name));

      const showDialog = () => {
        if (servicesOptions.value.length === 0) {
          isWarningBanner.value = true;
          return;
        }
        isDialog.value = true;
      }

      const showDialogPreviewClientInfo = (clientId) => {
        isDialogPreviewClientInfo.value = true;
        currentClientId.value = clientId;
        currentUserData.value = allClients.value.find(item => item.id === currentClientId.value);
      }

      return {
        allClients,
        isDialog,
        isDialogEdit,
        showDialog,
        isWarningBanner,
        isDialogPreviewClientInfo,
        showDialogPreviewClientInfo,
        currentClientId,
        currentUserData
      }
    }
  });
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 20px;
  }
</style>