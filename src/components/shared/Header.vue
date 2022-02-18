<template>
  <q-header bordered class="bg-white text-grey-9">
    <q-toolbar>
      <q-toolbar-title class="row justify-center text-dark">
        <div v-if="mainMenuTabs == 'clients'">Клиенты</div>
        <div v-if="mainMenuTabs == 'services'">Услуги</div>
        <div v-if="mainMenuTabs == 'calendar'">Календарь</div>
        <div v-if="mainMenuTabs == 'more'">Больше</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  props: ['mainMenuTabs'],
});
</script>
