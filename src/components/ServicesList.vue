<template>
  <div class="row justify-center q-mt-md">
    <q-btn
      no-caps
      outline
      rounded
      color="primary"
      icon="add"
      label="Добавить услугу"
      @click="isAddServiceDialog = true"
    />
  </div>

  <q-list separator class="q-my-md">
    <template v-for="service in services" :key="service.id">
      <q-item @click="showPreviewServiceDialog(service.id)" clickable v-ripple>
        <q-item-section v-if="services.length > 0" avatar>
          <q-avatar color="primary" text-color="white">
            {{ service.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-primary">{{
            service.name.substring(0, 33)
          }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-dark">{{
            service.price.substring(0, 15)
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>

  <AddServiceDialog v-model="isAddServiceDialog" />

  <PreviewServiceDialog
    v-model="isPreviewServiceDialog"
    :currentServiceData="currentServiceData"
    @update:isEditServiceDialog="isEditServiceDialog = $event"
  />
  <EditServiceDialog
    v-model="isEditServiceDialog"
    :currentServiceData="currentServiceData"
    @update:currentServiceData="currentServiceData = $event"
    @update:isPreviewServiceDialog="isPreviewServiceDialog = $event"
  />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import AddServiceDialog from 'src/components/dialogs/AddServiceDialog.vue';
import PreviewServiceDialog from 'src/components/dialogs/PreviewServiceDialog.vue';
import EditServiceDialog from 'src/components/dialogs/EditServiceDialog.vue';

export default defineComponent({
  name: 'ServicesList',
  components: {
    AddServiceDialog,
    PreviewServiceDialog,
    EditServiceDialog,
  },
  setup() {
    const store = useStore();
    const isAddServiceDialog = ref(false);
    const isPreviewServiceDialog = ref(false);
    const isEditServiceDialog = ref(false);
    const currentServiceData = ref(null);

    const services = computed(
      () => store.getters['storeClients/getAllClientsServices']
    );

    const showPreviewServiceDialog = (serviceId) => {
      isPreviewServiceDialog.value = true;
      currentServiceData.value = services.value.find(
        (item) => item.id === serviceId
      );
    };

    return {
      services,
      currentServiceData,
      isAddServiceDialog,
      isEditServiceDialog,
      isPreviewServiceDialog,
      showPreviewServiceDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-item {
  padding: 10px 20px;
}
</style>
