<template>
  <q-list>
    <q-item v-for="client in clients" :key="client.id" class="q-mb-sm" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img :src="`https://cdn.quasar.dev/img/${client.avatar}`">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary">{{ client.name }}</q-item-label>
        <q-item-label caption lines="1" class="text-dark">{{ client.date }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-dark">{{ client.phone }}</q-item-label>
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
    const clients = computed(() => {
      return store.getters['storeClients/getAllClients'];
    });

    return {
      clients
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 5px;
  }
</style>