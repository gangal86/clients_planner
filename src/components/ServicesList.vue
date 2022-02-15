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
    <q-item v-for="service in services" :key="service.id" clickable v-ripple>
      <q-item-section v-if="services.length > 0" avatar>
        <q-avatar color="primary" text-color="white">
          {{ service.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary">{{ service.name.substring(0, 33) }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-dark">{{ service.price.substring(0, 15) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  <AddServiceDialog v-model="isAddServiceDialog" />        
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import AddServiceDialog from 'src/components/dialogs/AddServiceDialog.vue';

export default defineComponent ({
  name: 'ServicesList',
  components: {
    AddServiceDialog
  },
  setup () {
    const store = useStore();
    const isAddServiceDialog = ref(false);

    let services = store.getters['storeClients/getAllClientsServices'];
    
    return {
      services,
      isAddServiceDialog
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 20px;
  }
</style>