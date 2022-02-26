<template>
  <div class="column no-wrap justify-center q-mt-md">
    <div class="column items-center">Изменить цветовую схему</div>
    <div class="q-pa-md column items-center">
      <q-color v-model="mainColorApp" class="no-header no-footer my-picker" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { setCssVar } from 'quasar';

export default defineComponent({
  name: 'More',
  setup() {
    const store = useStore();
    const mainColorApp = computed({
      get() {
        return store.getters['storeClients/getMainColorApp'];
      },
      set(val) {
        setCssVar('primary', val);
        store.dispatch('storeClients/updateMainColorApp', val);
      },
    });

    return {
      mainColorApp,
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
</style>
