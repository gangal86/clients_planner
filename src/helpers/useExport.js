export function useExport() {
  const currentDateFormat = 'HH:mm - DD/MM/YYYY';
  const calendarLocaleRu = {
    days: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    daysShort: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
    monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
  };
  const calendarLocaleEn = {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday '.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thur_Fri_Sat '.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December '.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec '.split('_'),
  };

  return {
    currentDateFormat,
    calendarLocaleRu,
    calendarLocaleEn,
  };
}
