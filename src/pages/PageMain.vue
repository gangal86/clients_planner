<template>
  <q-page class="row items-start justify-center">

    <Header :mainMenuTabs="mainMenuTabs" />

    <q-tab-panels
      v-model="mainMenuTabs"
      animated
    >
      <q-tab-panel class="q-pa-xs" name="clients">
        <ClientsList />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="services">
        <ServicesList />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="calendar">
        <Calendar />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="more">
        <More />
      </q-tab-panel>     
    </q-tab-panels>

    <Footer :mainMenuTabs="mainMenuTabs" @change-menu-tabs="mainMenuTabs = $event" />

  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue';
import ClientsList from 'components/ClientsList.vue';
import ServicesList from 'src/components/ServicesList.vue';
import Calendar from 'components/Calendar.vue';
import Header from 'components/Header.vue';
import More from 'components/More.vue';
import Footer from 'components/Footer.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    ClientsList,
    ServicesList,
    Calendar,
    Header,
    More,
    Footer
  },
  setup () {
    return {
      mainMenuTabs: ref('clients')
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-tab-panels{
    width: 100%;
    max-width: 400px;
    min-width: 300px;
  }
</style>
