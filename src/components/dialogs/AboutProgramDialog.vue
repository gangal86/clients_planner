<template>
  <q-dialog v-model="isAboutProgram">
    <q-card>
      <q-card-section class="column q-pb-xs">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Clients Planner</div>
            <div class="text-subtitle2">
              {{ $t('aboutProgramDescription') }}
            </div>
          </q-card-section>
          <q-card-actions vertical align="left">
            <div class="text-subtitle2">
              <span class="text-weight-regular">{{ $t('aboutProgramDeveloper') }}</span>
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
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'AboutProgramDialog',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const isAboutProgram = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      },
    });

    return {
      isAboutProgram,
    };
  },
});
</script>

<style lang="scss" scoped>
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