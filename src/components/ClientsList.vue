<template>
  <div class="row justify-center q-mt-md">
    <q-btn
      no-caps
      outline
      rounded
      color="primary"
      icon="add"
      label="Добавить клиента"
      @click="showAddClientDialog"
    />
  </div>
  <q-list separator class="q-my-md">
    <q-item
      v-for="client in allClients"
      :key="client.id"
      @click="showPreviewClientDialog(client.id)"
      clickable
      v-ripple
    >
      <q-item-section v-if="allClients.length > 0" avatar>
        <q-avatar color="primary" text-color="white">
          {{ client.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary">{{
          client.name.substring(0, 20)
        }}</q-item-label>
        <q-item-label caption lines="1" class="text-dark">{{
          client.date
        }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-dark">{{
          client.service.substring(0, 15)
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <PreviewClientDialog
      v-model="isPreviewClientDialog"
      :currentUserData="currentUserData"
      @update:isEditClientDialog="isEditClientDialog = $event"
    />
  </q-list>

  <AddClientDialog
    v-model="isAddClientDialog"
    :clientDate="clientDate"
    @update:clientDate="clientDate = $event"
  />

  <EditClientDialog
    v-model="isEditClientDialog"
    :currentUserData="currentUserData"
    @update:currentUserData="currentUserData = $event"
    @update:isPreviewClientDialog="isPreviewClientDialog = $event"
  />

  <q-banner v-if="isWarningBanner" inline-actions class="text-white bg-red">
    Сперва добавьте хотя бы одну услугу.
  </q-banner>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { date } from 'quasar';
import AddClientDialog from 'src/components/dialogs/AddClientDialog.vue';
import EditClientDialog from 'src/components/dialogs/EditClientDialog.vue';
import PreviewClientDialog from 'src/components/dialogs/PreviewClientDialog.vue';

export default defineComponent({
  name: 'ClientsList',
  components: {
    AddClientDialog,
    EditClientDialog,
    PreviewClientDialog,
  },
  setup() {
    const store = useStore();
    const isAddClientDialog = ref(false);
    const isEditClientDialog = ref(false);
    const isPreviewClientDialog = ref(false);
    const isWarningBanner = ref(false);
    const currentUserData = ref(null);
    const currentDateFormat = 'HH:mm - DD/MM/YYYY';
    const clientDate = ref(date.formatDate(Date.now(), currentDateFormat));

    const allClients = computed(() =>
      store.getters['storeClients/getAllClients']
        .map(function (item) {
          return {
            id: item.id,
            name: item.name,
            date: date.formatDate(
              `${item.date} ${item.time}`,
              currentDateFormat
            ),
            time: item.time,
            phone: item.phone,
            service: item.service,
          };
        })
        .sort(function (a, b) {
          return new Date(
            date.formatDate(
              date.extractDate(a.date, currentDateFormat),
              'YYYY/MM/DD HH:mm'
            )
          ).getTime() >
            new Date(
              date.formatDate(
                date.extractDate(b.date, currentDateFormat),
                'YYYY/MM/DD HH:mm'
              )
            ).getTime()
            ? 1
            : -1;
        })
    );

    const servicesOptions = computed(() =>
      store.getters['storeClients/getAllClientsServices'].map(
        (item) => item.name
      )
    );

    const showAddClientDialog = () => {
      if (servicesOptions.value.length === 0) {
        isWarningBanner.value = true;
        return;
      }
      isAddClientDialog.value = true;
    };

    const showPreviewClientDialog = (clientId) => {
      isPreviewClientDialog.value = true;
      currentUserData.value = allClients.value.find(
        (item) => item.id === clientId
      );
    };

    return {
      allClients,
      isAddClientDialog,
      isEditClientDialog,
      isWarningBanner,
      isPreviewClientDialog,
      showAddClientDialog,
      showPreviewClientDialog,
      currentUserData,
      clientDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-item {
  padding: 10px 20px;
}
</style>
