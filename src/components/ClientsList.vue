<template>
  <q-list class="q-my-md">
    <q-item v-for="client in allClients" :key="client.id" class="q-mb-sm" clickable v-ripple>
      <q-item-section avatar>
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
  </q-list>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ClientsList',
  setup () {
    const store = useStore();
    const allClients = computed(() => store.getters['storeClients/getAllClients']);

    return {
      allClients
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 20px;
  }
</style>