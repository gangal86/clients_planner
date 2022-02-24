<template>
  <div class="column no-wrap justify-center q-mt-md">
    <div class="column items-center">Изменить цветовую схему</div>
    <div class="q-pa-md column items-center">
      <q-color v-model="mainColorApp" class="no-header no-footer my-picker" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { setCssVar } from 'quasar';

export default defineComponent({
  name: 'More',
  setup() {
    const mainColorApp = ref('#7A1FA2');

    watch(
      () => mainColorApp.value,
      () => {
        setCssVar('primary', mainColorApp.value);
      }
    );

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
