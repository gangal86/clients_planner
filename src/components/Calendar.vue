<template>
  <div class="row justify-center">
  <q-date
    v-model="dateNow"
    :events="allClientsDates"
    event-color="orange"
    @update:model-value="updateDate"
    ref="calendar"
    :locale="currentLocale"
    class="col q-ma-md"
  />
  </div>
  <q-dialog v-model="card">
  <q-card>
    <q-card-section>
      <q-tab-panels v-model="dateNow">
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
    let card = ref(false);
    let dateNow = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'));
    let calendar = ref();

    const allClientsDates = computed(() => store.getters['storeClients/getAllClientsDates']);
    const allClients = computed(() => store.getters['storeClients/getAllClients']);

    const updateDate = (value, reason, details) => {
      if (reason == 'remove-day') {
        setTimeout(() => {
          calendar.value.setToday ();
        }, 100);
      }
      allClientsDates.value.find(item => item === dateNow.value)? card.value = true: card.value = false;
    }

    let currentLocale = {
        days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
        daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
        monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_')
      }

    return {
      card,
      dateNow,
      allClientsDates,
      allClients,
      calendar,
      updateDate,
      currentLocale
    }
  }
});
</script>

<style lang="scss" scoped>
  .q-date {
    max-width: 350px; 
  }
</style>
