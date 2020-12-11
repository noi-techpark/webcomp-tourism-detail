<template>
  <div>
    <a v-if="isListAvailable" href @click.prevent="close">close</a><br />
    <p>{{ contentId }}</p>
    <hr />
    <div v-if="item">
      <h2>{{ dataDetail.Title }}</h2>

      <ul>
        <li>Altitude: {{ item.Altitude }}{{ item.AltitudeUnitofMeasure }}</li>
        <li v-if="googleMapsLink">
          <a :href="googleMapsLink" target="_blank">Google Maps</a>
        </li>
        <li v-if="dataContactInfos.City">
          Location: {{ dataContactInfos.City }}
        </li>
        <li v-if="dataContactInfos.Url">
          Web:
          <a :href="dataContactInfos.Url" target="_blank">{{
            dataContactInfos.Url
          }}</a>
        </li>
        <li v-if="dataContactInfos.Phonenumber">
          Phone: {{ dataContactInfos.Phonenumber }}
        </li>
      </ul>

      <p>{{ dataDetail.BaseText }}</p>

      <div v-if="itemCategories.length">
        <b>Kategorien</b>
        <ul>
          <li v-for="(value, i) of itemCategories" :key="i">{{ value }}</li>
        </ul>
      </div>

      <div v-if="itemCeremonies.length">
        <b>Veranstaltungen</b>
        <ul>
          <li v-for="(value, i) of itemCeremonies" :key="i">
            {{ value.name }} (max. {{ value.maxSeatingCapacity }} Personen)
          </li>
        </ul>
      </div>

      <div v-if="itemDishRates.length">
        <b>Speisen</b>
        <ul>
          <li v-for="(value, i) of itemDishRates" :key="i">
            {{ value.name }} (von {{ value.minAmount }} bis
            {{ value.maxAmount }} {{ value.currencyCode }})
          </li>
        </ul>
      </div>

      <div v-for="type of itemGastronomyTypes" :key="type.type">
        <b>{{ type.name }}</b>
        <ul>
          <li v-for="(value, i) of type.values" :key="i">{{ value }}</li>
        </ul>
      </div>

      <div v-if="itemOperationSchedule.length">
        <b>Öffnungszeiten</b>
        <div v-for="(schedule, i) of itemOperationSchedule" :key="i">
          <ul>
            <li v-for="(time, j) of schedule.OperationScheduleTime" :key="j">
              {{ TIMECODES[time.Timecode][language] }} von {{ time.Start }} bis
              {{ time.End }}
              ({{ time | scheduleDays(language) }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GastronomyApi } from '@/api';

const GASTRONOMY_TYPES = [
  {
    type: 'DishCodes',
    name: 'Speisen',
  },
  {
    type: 'CuisineCodes',
    name: 'Küche',
  },
  {
    type: 'FacilityCodes_CreditCard',
    name: 'Zahlungsmittel',
  },
  {
    type: 'FacilityCodes_Equipment',
    name: 'Ausstattung',
  },
  {
    type: 'FacilityCodes_QualitySeals',
    name: 'Qualitätssiegel',
  },
];

const TIMECODES = {
  1: {
    en: 'General Opening Time',
    de: 'Allgemeine Öffnungszeiten',
    it: '',
  },
  2: {
    en: 'Time range for warm meals',
    de: 'Warme Mahlzeiten',
    it: '',
  },
  3: {
    en: 'Time range for pizza',
    de: 'Pizza',
    it: '',
  },
  4: {
    en: "Time range for snack's",
    de: 'Snacks',
    it: '',
  },
};

const SCHEDULE_DAYS = [
  {
    code: 'Monday',
    name: {
      en: 'Mo',
      de: 'Mo',
      it: 'Lu',
    },
  },
  {
    code: 'Tuesday',
    name: {
      en: 'Tu',
      de: 'Di',
      it: 'Ma',
    },
  },
  {
    code: 'Wednesday',
    name: {
      en: 'We',
      de: 'Mi',
      it: 'Me',
    },
  },
  {
    code: 'Thuresday',
    name: {
      en: 'Th',
      de: 'Do',
      it: 'Gi',
    },
  },
  {
    code: 'Friday',
    name: {
      en: 'Fr',
      de: 'Fr',
      it: 'Ve',
    },
  },
  {
    code: 'Saturday',
    name: {
      en: 'Sa',
      de: 'Sa',
      it: 'Sa',
    },
  },
  {
    code: 'Sunday',
    name: {
      en: 'Su',
      de: 'So',
      it: 'Do',
    },
  },
];

export default {
  props: {
    contentId: {
      type: String,
      required: true,
    },
    isListAvailable: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: 'de',
    },
  },
  data() {
    return {
      item: null,
      gastronomyApi: null,
      gastronomyTypes: [],
    };
  },
  computed: {
    dataDetail() {
      return this.item?.Detail?.[this.language] || {};
    },
    dataContactInfos() {
      return this.item?.ContactInfos?.[this.language] || {};
    },
    googleMapsLink() {
      return this.item?.Latitude && this.item?.Longitude
        ? `https://www.google.com/maps/search/?api=1&query=${this.item.Latitude},${this.item.Longitude}`
        : null;
    },
    itemCategories() {
      return (
        this.item?.CategoryCodes.map(
          (c) =>
            this.gastronomyTypes.find((t) => t.Id === c.Id)?.TypeDesc[
              this.language
            ]
        ) || []
      );
    },
    itemCeremonies() {
      return (
        this.item?.CapacityCeremony.map((c) => ({
          name: this.gastronomyTypes.find((t) => t.Id === c.Id)?.TypeDesc[
            this.language
          ],
          maxSeatingCapacity: c.MaxSeatingCapacity,
        })) || []
      );
    },
    itemDishRates() {
      return (
        this.item?.DishRates.map((c) => ({
          name: this.gastronomyTypes.find((t) => t.Id === c.Id)?.TypeDesc[
            this.language
          ],
          maxAmount: c.MaxAmount,
          minAmount: c.MinAmount,
          currencyCode: c.CurrencyCode,
        })) || []
      );
    },
    itemGastronomyTypes() {
      const filteredArray = this.gastronomyTypes.filter((t) =>
        this.item.Facilities.find((f) => t.Id === f.Id)
      );
      return GASTRONOMY_TYPES.map((type) => ({
        name: type.name,
        values: filteredArray
          .filter((t) => t.Type === type.type)
          .map((t) => t.TypeDesc[this.language]),
      })).filter((t) => t.values.length);
    },
    itemOperationSchedule() {
      return this.item.OperationSchedule.filter((s) => {
        const start = new Date(s.Start);
        const stop = new Date(s.Stop);
        const now = new Date();
        return (
          now.getTime() <= stop.getTime() && now.getTime() >= start.getTime()
        );
      });
    },
    TIMECODES: () => TIMECODES,
  },
  created() {
    this.gastronomyApi = new GastronomyApi();
    this.loadGastronomyTypeList();
    this.loadGastronomyItem();
  },
  filters: {
    scheduleDays(scheduleTime, language) {
      return SCHEDULE_DAYS.map((d) =>
        scheduleTime[d.code] ? d.name[language] : null
      ).join(', ');
    },
  },
  methods: {
    loadGastronomyItem() {
      this.gastronomyApi
        .gastronomyGetGastronomySingle(this.contentId)
        .then((value) => {
          this.item = value.data;
        });
    },
    loadGastronomyTypeList() {
      this.gastronomyApi.gastronomyGetAllGastronomyTypesList().then((value) => {
        this.gastronomyTypes = value.data;
      });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
