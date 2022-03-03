<template>
  <div class="column no-wrap justify-center q-mt-md">
    <div class="column items-center">{{ $t('titleChangeColorScheme') }}</div>
    <div class="q-pa-md column items-center">
      <q-color v-model="mainColorApp" class="no-header no-footer my-picker" />
    </div>
    <div class="column items-center">
      <q-btn
        class="reset"
        color="primary"
        :label="$t('resetMainColorApp')"
        no-caps
        push
        @click="resetMainColorApp"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { setCssVar } from 'quasar';
import { useExport } from '../helpers/useExport';

export default defineComponent({
  name: 'More',
  setup() {
    const store = useStore();
    const { primaryHex } = useExport();
    const mainColorApp = computed({
      get() {
        return store.getters['storeClients/getMainColorApp'];
      },
      set(val) {
        setCssVar('primary', val);
        store.dispatch('storeClients/updateMainColorApp', val);
      },
    });

    const resetMainColorApp = () => {
      setCssVar('primary', primaryHex);
      store.dispatch('storeClients/updateMainColorApp', primaryHex);
    };

    return {
      mainColorApp,
      resetMainColorApp,
    };
  },
});
</script>

<style lang="scss" scoped>
.my-picker {
  height: 100%;
  width: 100%;
  max-width: 400px;
  min-width: 250px;
}
.reset {
  width: 100px;
}
</style>
