<template>
  <div class="q-my-md">
    <q-banner
      v-for="service in services"
      :key="service.id"
      rounded
      dense
      inline-actions
      class="q-mb-sm q-pl-md text-white bg-primary"
    >
      {{ service.name.substring(0, 33) }}
      <template v-slot:action>
        <q-btn
          icon="eva-menu-outline"
          flat
          color="white"
        />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent ({
  name: 'ServicesList',
  setup () {
    const store = useStore();
    let services = store.getters['storeClients/getAllClientsServices'];
    services = Array.from(new Set(services)).map(function(item, index){return {id: index, name: item}});
    
    return {services}
  }
});
</script>