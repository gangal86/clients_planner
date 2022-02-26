<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { setCssVar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const store = useStore();
    const mainColorApp = store.getters['storeClients/getMainColorApp'];
    setCssVar('primary', mainColorApp);
  },
});
</script>
