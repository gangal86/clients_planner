<template>
  <div class="q-pa-md">
    <q-date
      v-model="dateNow"
      :events="allClientsDates"
      event-color="orange"
      @update:model-value="updateCalendar"
    />
  </div>
  {{ dateNow }}
  <q-dialog v-model="card">
  <q-card class="my-card">
    <q-card-section>
      <q-tab-panels
        v-model="dateNow"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
      >
      <q-tab-panel v-for="client in allClients" :key="client.id" :name="client.date">
        <div class="text-h4 q-mb-md">{{ client.date }}</div>
        <p>{{ client.name }}</p>
      </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</q-dialog>

</template>

<script>
import { defineComponent, ref, computed} from 'vue';
import { useStore } from 'vuex';
import { date } from 'quasar';

export default defineComponent ({
  name: 'Calendar',
  setup () {
    const store = useStore();
    let dateNow = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));

    const allClientsDates = computed(() => store.getters['storeClients/getAllClientsDates']);
    const allClients = computed(() => store.getters['storeClients/getAllClients']);

    const updateCalendar = (value, reason, details) => {
      if (reason == 'remove-day') {
        return true;
      }
      return false;
    }

    return {
      splitterModel: ref(50),
      card: ref(false),
      stars: ref(3),
      dateNow,
      allClientsDates,
      allClients,
      updateCalendar
    }
  }
});
</script>