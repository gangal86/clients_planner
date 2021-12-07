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
import { defineComponent } from 'vue';

const clients = [ {
  id: 1,
  name: 'Brunhilde Panswick',
  date: '12.09.2021',
  phone: '+380969867432',
  avatar: 'avatar2.jpg'
}, {
  id: 2,
  name: 'Winfield Stapforth',
  date: '16.10.2021',
  phone: '+380976655432',
  avatar: 'avatar6.jpg'
} ];

export default defineComponent({
  name: 'ClientsList',
  setup () {
    return {clients}
  }
});
</script>
