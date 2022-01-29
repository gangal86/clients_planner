<template>
  <div class="row justify-center q-mt-md">
    <q-btn
      no-caps
      outline
      rounded
      color="primary"
      icon="add"
      label="Добавить услугу"
      @click="isDialog = true"
    />
  </div>
  <q-list separator class="q-my-md">
    <q-item v-for="service in services" :key="service.id" clickable v-ripple>
      <q-item-section v-if="services.length > 0" avatar>
        <q-avatar color="primary" text-color="white">
          {{ service.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-primary">{{ service.name.substring(0, 33) }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label class="text-dark">{{ service.price.substring(0, 15) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

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
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { uid } from 'quasar';

export default defineComponent ({
  name: 'ServicesList',
  setup () {
    const store = useStore();
    const isDialog = ref(false);
    const clientService = ref('');
    const clientServicePrice = ref('');

    let services = store.getters['storeClients/getAllClientsServices'];

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
      services,
      isDialog,
      clientService,
      clientServicePrice,
      addService,
      resetForm
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-item {
    padding: 10px 20px;
  }
</style>