<template>
  <q-header bordered class="bg-white text-grey-9">
    <q-toolbar>
      <q-toolbar-title class="row justify-center text-dark q-ml-xl">
        <div v-if="mainMenuTabs == 'clients'">{{ $t('headerTitleClients') }}</div>
        <div v-if="mainMenuTabs == 'services'">{{ $t('headerTitleServices') }}</div>
        <div v-if="mainMenuTabs == 'search'">{{ $t('headerTitleSearch') }}</div>
        <div v-if="mainMenuTabs == 'more'">{{ $t('headerTitleMore') }}</div>
      </q-toolbar-title>
      <q-btn
        @click="selectLang('us')"
        v-if="!countryFlagStatus"
        flat
        size="xs"
        dense
      >
        <country-flag country="us" />
      </q-btn>
      <q-btn
        @click="selectLang('ru')"
        v-if="countryFlagStatus"
        flat
        size="xs"
        dense
      >
        <country-flag country="ru" />
      </q-btn>
      <q-btn flat round dense icon="more_vert">
        <q-menu auto-close>
          <q-list class="menu-options" dense>
            <q-item
              v-if="$q.platform.is.cordova"
              @click="isImportExport = !isImportExport"
              dense
              clickable
            >
              <q-item-section
                class="text-caption text-weight-bold text-primary"
              >
                {{ $t('moreVertTitleBackup') }}
              </q-item-section>
            </q-item>
            <q-item @click="isAboutProgram = !isAboutProgram" dense clickable>
              <q-item-section
                class="text-caption text-weight-bold text-primary"
              >
                {{ $t('moreVertTitleAbout') }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>

  <ImportExportDialog v-model="isImportExport" />

  <AboutProgramDialog v-model="isAboutProgram" />
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import AboutProgramDialog from 'components/dialogs/AboutProgramDialog.vue';
import ImportExportDialog from 'components/dialogs/ImportExportDialog.vue';

export default defineComponent({
  name: 'Header',
  props: ['mainMenuTabs'],
  components: {
    AboutProgramDialog,
    ImportExportDialog,
  },
  setup() {
    const store = useStore();
    const isAboutProgram = ref(false);
    const isImportExport = ref(false);
    let { locale } = useI18n({ useScope: 'global' });
    const lang = ref(locale);
    const countryFlagStatus = computed({
      get() {
        return store.getters['storeClients/getCountryFlagStatus'];
      },
      set(val) {
        store.dispatch('storeClients/setCountryFlagStatus', val);
      },
    });

    watch(
      () => lang.value,
      () => {
        locale = lang.value;
        store.dispatch('storeClients/setCurrentLocale', locale);
      }
    );

    const selectLang = (currentLang) => {
      if (currentLang == 'ru') {
        lang.value = 'ru';
        countryFlagStatus.value = false;
      }
      if (currentLang == 'us') {
        lang.value = 'en-us';
        countryFlagStatus.value = true;
      }
    };

    return {
      isAboutProgram,
      isImportExport,
      lang,
      countryFlagStatus,
      selectLang,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-header {
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  margin: 0 auto;
}
.menu-options {
  min-width: 140px;
}
</style>
