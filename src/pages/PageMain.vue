<template>
  <q-page class="row items-start justify-center">
    <Header :mainMenuTabs="mainMenuTabs" />

    <q-tab-panels v-model="mainMenuTabs" animated>
      <q-tab-panel class="q-pa-xs" name="clients">
        <Calendar />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="services">
        <ServicesList />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="search">
        <ClientsList />
      </q-tab-panel>

      <q-tab-panel class="q-pa-xs" name="more">
        <More />
      </q-tab-panel>
    </q-tab-panels>

    <Footer v-model="mainMenuTabs" />
  </q-page>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import ClientsList from 'components/ClientsList.vue';
import ServicesList from 'src/components/ServicesList.vue';
import Calendar from 'components/Calendar.vue';
import Header from 'src/components/shared/Header.vue';
import More from 'components/More.vue';
import Footer from 'src/components/shared/Footer.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    ClientsList,
    ServicesList,
    Calendar,
    Header,
    More,
    Footer,
  },
  setup() {
    const store = useStore();
    let { locale } = useI18n({ useScope: 'global' });
    const lang = ref(locale);
    const mainMenuTabs = ref('clients');
    const stateCurrentLocale = computed(
      () => store.getters['storeClients/getCurrentLocale']
    );

    watch(
      () => stateCurrentLocale.value,
      () => {
        if (stateCurrentLocale.value === 'ru') {
          lang.value = 'ru';
        } else {
          lang.value = 'en-us';
        }
      }
    );

    watch(() => lang.value, () => {
      locale = lang.value;
    });

    return {
      mainMenuTabs,
      lang,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-tab-panels {
  width: 100%;
  max-width: 400px;
  min-width: 300px;
}
</style>
