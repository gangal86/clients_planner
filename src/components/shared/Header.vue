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

  <q-dialog v-model="isAboutProgram">
    <q-card>
      <q-card-section class="column q-pb-xs">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Clients Planner</div>
            <div class="text-subtitle2">
              Accounting and working with clients, a schedule for masters
            </div>
          </q-card-section>
          <q-card-actions vertical align="left">
            <div class="text-subtitle2">
              <span class="text-weight-regular">Developer: </span>
              <a
                href="https://gangal.pro"
                target="_blank"
                class="about-program-link"
              >
                <span class="text-weight-bold text-primary">Roman Gangal</span>
              </a>
            </div>
          </q-card-actions>
        </q-card>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Header',
  props: ['mainMenuTabs'],
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
      console.log('import');
      window.resolveLocalFileSystemURL(backupPath, function (dir) {
        dir.getFile(backupFile, { create: false }, function (fileEntry) {
          importBackupFile(fileEntry);
        }, function (e) {
            console.log('error', e);
        });
      });
    };

    const exportState = () => {
      console.log('export');
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
          console.log('Successful file read...');
          store.dispatch('storeClients/importState', JSON.parse(this.result));
        };

        reader.readAsText(file);
      }, null);
    }

    function exportBackupFile(fileEntry, dataObj) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
          console.log('Successful file write...');
        };

        fileWriter.onerror = function (e) {
          console.log('Failed file write: ' + e.toString());
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
.about-program-link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: $primary;
  }
}
.q-card {
  width: 100%;
  max-width: 350px;
  min-width: 250px;
}
</style>
