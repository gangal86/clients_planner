<template>
  <q-dialog v-model="isDialog">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">

          <q-form class="q-gutter-md"
            @submit="addService"
            @reset="resetForm">

            <q-input
              outlined
              v-model="clientService"
              label="Услуга *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите название услуги']"
            />

            <q-input
              outlined
              v-model="clientServicePrice"
              label="Цена *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите цену услуги']"
            />  
                              
            <div>
              <q-btn label="Ok" color="primary" type="submit" />
              <q-btn label="Отмена" color="primary" flat class="q-ml-sm" type="reset" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog> 
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { uid } from 'quasar';

export default defineComponent ({
  name: 'AddServiceDialog',
  props: ['modelValue'],
  setup(props, context) {
    const store = useStore();
    let isDialog  = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit('update:modelValue', val);
      }
    });

    const clientService = ref('');
    const clientServicePrice = ref('');

    const addService = () => {
      const dataService = {
        id: uid(),
        name: clientService.value,
        price: clientServicePrice.value
      }
      store.dispatch('storeClients/addService', dataService);
      resetForm();
    }

    const resetForm = () => {
      clientService.value = '';
      clientServicePrice.value = '';
      isDialog.value = false
    }

    return {
      clientService,
      clientServicePrice,
      addService,
      resetForm,
      isDialog
    }
  }
  
})
</script>

<style lang="scss" scoped>

</style>