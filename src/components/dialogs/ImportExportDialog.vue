<template>
  <q-dialog v-model="isImportExport">
    <q-card>
      <q-card-section class="column q-pb-xs">
        <q-card>
          <q-card-actions class="column text-center">
            <div class="text-subtitle1 text-secondary">
              {{ $t('importExportDesc1') }}
            </div>
            <div>{{ $t('importExportDesc2') }}</div>
            <q-btn
              @click="exportState"
              class="q-mb-sm"
              color="secondary"
              :label="$t('importExportDesc6')"
            />
            <div class="q-mb-sm">
              {{ $t('importExportDesc3') }}
              <span class="text-bold">{{ $t('importExportDesc4') }}</span
              >{{ $t('importExportDesc5')
              }}<span class="text-bold">clients_planner_backup.json</span>
            </div>
          </q-card-actions>
        </q-card>
        <q-card class="q-mt-md">
          <q-card-actions class="column text-center">
            <div class="text-subtitle1 text-primary">
              {{ $t('importExportDesc7') }}
            </div>
            <div class="q-mb-sm">
              {{ $t('importExportDesc8') }}
              <span class="text-bold">clients_planner_backup.json</span
              >{{ $t('importExportDesc9') }}
              <span class="text-bold">{{ $t('importExportDesc10') }}</span>
            </div>
            <div>{{ $t('importExportDesc11') }}</div>
            <q-btn
              @click="importState"
              class="q-mb-sm"
              color="primary"
              :label="$t('importExportDesc12')"
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
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ImportExportDialog',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const store = useStore();
    const $q = useQuasar();
    let { t } = useI18n({ useScope: 'global' });
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
              message: t('importExportBtnNotifyLoadNegative'),
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
            message: t('importExportBtnNotifyLoadPositive'),
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
            message: t('importExportBtnNotifySavePositive'),
          });
        };

        fileWriter.onerror = function () {
          $q.notify({
            type: 'negative',
            message: t('importExportBtnNotifySaveNegative'),
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
