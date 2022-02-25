<template>
  <q-header bordered class="bg-white text-grey-9">
    <q-toolbar>
      <q-toolbar-title class="row justify-center text-dark q-ml-xl">
        <div v-if="mainMenuTabs == 'clients'">Клиенты</div>
        <div v-if="mainMenuTabs == 'services'">Услуги</div>
        <div v-if="mainMenuTabs == 'search'">Поиск</div>
        <div v-if="mainMenuTabs == 'more'">Больше</div>
      </q-toolbar-title>
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
                Перенести базу
              </q-item-section>
            </q-item>
            <q-item @click="isAboutProgram = !isAboutProgram" dense clickable>
              <q-item-section
                class="text-caption text-weight-bold text-primary"
              >
                О программе...
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
import { defineComponent, ref } from 'vue';
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
    return {
      isAboutProgram: ref(false),
      isImportExport: ref(false),
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
