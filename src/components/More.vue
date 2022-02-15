<template>
  <div class="column no-wrap justify-center q-mt-md">
    <div class="column items-center">
      Изменить цветовую схему
    </div>
    <div class="q-pa-md column items-center">
      <q-color v-model="hex" class="no-header no-footer my-picker" />
    </div>
    <div class="q-pa-md column items-center">
      <div>Clients Planner</div>
      <span class="text-weight-regular">Developer: </span>
      <a href="https://gangal.pro" target="_blank">
        <span class="text-weight-bold text-primary">Roman Gangal</span>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { setCssVar } from 'quasar';
export default defineComponent ({
  name: 'More',
  setup () {
    let hex = ref('#7A1FA2');
    
    watch(() => hex.value, () => {
      setCssVar('primary', hex.value);
    })

    return {
      hex
    }
  }
})
</script>

<style lang="scss" scoped>
  .my-picker{
    height: 100%;
    width: 100%;
    max-width: 400px;
    min-width: 250px;
  }
</style>