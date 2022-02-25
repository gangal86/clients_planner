<template>
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
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ImportExportDialog',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const store = useStore();
    const $q = useQuasar();
    const state = JSON.stringify(store.getters['storeClients/getState']);
    const backupFile = 'clients_planner_backup.json';
    let backupPath = '';
    if ($q.platform.is.cordova) {
      backupPath = cordova.file.externalRootDirectory + 'Download';
    }

    const isImportExport = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

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

        fileWriter.onerror = function () {
          $q.notify({
            type: 'negative',
            message: 'Ошибка сохранения базы в файл',
          });
        };

        fileWriter.write(dataObj);
      });
    }

    return {
      isImportExport,
      importState,
      exportState,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-card {
  width: 100%;
  max-width: 350px;
  min-width: 250px;
}
</style>
