<template>
  <q-banner
    v-for="service in services"
    :key="service.id"
    rounded
    dense
    inline-actions
    class="q-mb-sm q-pl-md text-white bg-secondary"
  >
    {{ service.name }}
    <template v-slot:action>
      <q-btn
        icon="eva-menu-outline"
        flat
        color="white"
      />
    </template>
  </q-banner>
</template>

<script>
import { defineComponent } from 'vue';

const services = [ {
  id: 1,
  name: 'Покраска'
}, {
  id: 2,
  name: 'Стрижка'
}, {
  id: 3,
  name: 'Прическа'
} ];

export default defineComponent ({
  name: 'ServicesList',
  setup () {
    return {services}
  }
});
</script>