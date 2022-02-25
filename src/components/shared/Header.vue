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

  <q-dialog v-model="isImportExport">
    <q-card>
      <q-card-section class="column q-pb-xs">
        <q-card>
          <q-card-actions class="column text-center">
            <div class="text-subtitle1 text-secondary">
              НА СТАРОМ УСТРОЙСТВЕ:
            </div>
            <div>Нажмите кнопку</div>
            <q-btn
              @click="exportState"
              class="q-mb-sm"
              color="secondary"
              label="Сохранить базу в файл"
            />
            <div class="q-mb-sm">
              По итогу в папке
              <span class="text-bold">Загрузки (Download)</span> будет создан
              файл <span class="text-bold">clients_planner_backup.json</span>
            </div>
          </q-card-actions>
        </q-card>
        <q-card class="q-mt-md">
          <q-card-actions class="column text-center">
            <div class="text-subtitle1 text-primary">НА НОВОМ УСТРОЙСТВЕ:</div>
            <div class="q-mb-sm">
              Перенесите ранее сохраненный файл
              <span class="text-bold">clients_planner_backup.json</span> в папку
              <span class="text-bold">Загрузки (Download)</span>
            </div>
            <div>Нажмите кнопку</div>
            <q-btn
              @click="importState"
              class="q-mb-sm"
              color="primary"
              label="Загрузить базу из файла"
            />
          </q-card-actions>
        </q-card>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

<AboutProgramDialog v-model="isAboutProgram" />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import AboutProgramDialog from 'components/dialogs/AboutProgramDialog.vue';

export default defineComponent({
  name: 'Header',
  props: ['mainMenuTabs'],
  components: {
    AboutProgramDialog
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const isAboutProgram = ref(false);
    const isImportExport = ref(false);
    const state = JSON.stringify(store.getters['storeClients/getState']);
    const backupFile = 'clients_planner_backup.json';
    let backupPath = '';
    if ($q.platform.is.cordova) {
      backupPath = cordova.file.externalRootDirectory + 'Download';
    }

    const importState = () => {
      window.resolveLocalFileSystemURL(backupPath, function (dir) {
        dir.getFile(
          backupFile,
          { create: false },
          function (fileEntry) {
            importBackupFile(fileEntry);
          },
          function () {
            $q.notify({
              type: 'negative',
              message: 'Ошибка загрузки базы из файла',
            });
          }
        );
      });
    };

    const exportState = () => {
      window.resolveLocalFileSystemURL(backupPath, function (dir) {
        dir.getFile(backupFile, { create: true }, function (fileEntry) {
          const dataObj = new Blob([state], { type: 'application/json' });
          exportBackupFile(fileEntry, dataObj);
        });
      });
    };

    function importBackupFile(fileEntry) {
      fileEntry.file(function (file) {
        const reader = new FileReader();

        reader.onloadend = function () {
          store.dispatch('storeClients/importState', JSON.parse(this.result));
          isImportExport.value = false;
          $q.notify({
            type: 'positive',
            message: 'База из файла загружена',
          });
        };

        reader.readAsText(file);
      }, null);
    }

    function exportBackupFile(fileEntry, dataObj) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
          isImportExport.value = false;
          $q.notify({
            type: 'positive',
            message: 'База в файл сохранена',
          });
        };

        fileWriter.onerror = function (e) {
          $q.notify({
            type: 'negative',
            message: 'Ошибка сохранения базы в файл',
          });
        };

        fileWriter.write(dataObj);
      });
    }

    return {
      isAboutProgram,
      isImportExport,
      importState,
      exportState,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-header {
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  margin: 0 auto;
}
.menu-options {
  min-width: 140px;
}
.q-card {
  width: 100%;
  max-width: 350px;
  min-width: 250px;
}
</style>
