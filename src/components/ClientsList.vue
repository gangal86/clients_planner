<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <q-list separator class="q-my-md">
      <q-input
        outlined
        bottom-slots
        v-model="searchText"
        :label="$t('searchTitleEnterClientName')"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchText !== ''"
            name="close"
            @click="searchText = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input>
      <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
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
      </transition-group>
    </q-list>
  </transition>

  <PreviewClientDialog
    v-model="isPreviewClientDialog"
    :currentUserData="currentUserData"
    @update:isEditClientDialog="isEditClientDialog = $event"
  />

  <EditClientDialog
    v-model="isEditClientDialog"
    :currentUserData="currentUserData"
    @update:currentUserData="currentUserData = $event"
    @update:isPreviewClientDialog="isPreviewClientDialog = $event"
  />
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { date } from 'quasar';
import { useExport } from '../helpers/useExport';
import EditClientDialog from 'src/components/dialogs/EditClientDialog.vue';
import PreviewClientDialog from 'src/components/dialogs/PreviewClientDialog.vue';

export default defineComponent({
  name: 'ClientsList',
  components: {
    EditClientDialog,
    PreviewClientDialog,
  },
  setup() {
    const store = useStore();
    const isAddClientDialog = ref(false);
    const isEditClientDialog = ref(false);
    const isPreviewClientDialog = ref(false);
    const currentUserData = ref(null);
    const searchText = ref('');
    const { currentDateFormat } = useExport();
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
        .filter((item) =>
          item.name.toLowerCase().includes(searchText.value.toLowerCase())
        )
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
      isPreviewClientDialog,
      showPreviewClientDialog,
      currentUserData,
      clientDate,
      searchText,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-item {
  padding: 10px 20px;
}
.q-input {
  padding: 0px 15px;
}
</style>
