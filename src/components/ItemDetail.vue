<template>
  <div>
    <a v-if="isListAvailable" href @click.prevent="close">close</a><br />
    <p>{{ contentId }}</p>
    <hr />
    <div v-if="item">
      <h2>{{ dataDetail.Title }}</h2>

      <ul>
        <li>
          {{ $t('altitude') }}: {{ item.Altitude
          }}{{ item.AltitudeUnitofMeasure }}
        </li>
        <li v-if="googleMapsLink">
          <a :href="googleMapsLink" target="_blank">Google Maps</a>
        </li>
        <li v-if="dataContactInfos.City">
          {{ $t('location') }}: {{ dataContactInfos.City }}
        </li>
        <li v-if="dataContactInfos.Url">
          {{ $t('web') }}:
          <a :href="dataContactInfos.Url" target="_blank">{{
            dataContactInfos.Url
          }}</a>
        </li>
        <li v-if="dataContactInfos.Phonenumber">
          {{ $t('phone') }}: {{ dataContactInfos.Phonenumber }}
        </li>
      </ul>

      <p v-html="dataDetail.BaseText"></p>

      <div v-if="itemCategories.length">
        <b>{{ $t('categories') }}</b>
        <ul>
          <li v-for="(value, i) of itemCategories" :key="i">{{ value }}</li>
        </ul>
      </div>

      <div v-if="itemCeremonies.length">
        <b>{{ $t('ceremonies') }}</b>
        <ul>
          <li v-for="(value, i) of itemCeremonies" :key="i">
            {{ value.name }} (max. {{ value.maxSeatingCapacity }} Personen)
          </li>
        </ul>
      </div>

      <div v-if="itemDishRates.length">
        <b>{{ $t('dishRates') }}</b>
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
        <b>{{ $t('operationSchedule') }}</b>
        <div v-for="(schedule, i) of itemOperationSchedule" :key="i">
          <ul>
            <li v-for="(time, j) of schedule.OperationScheduleTime" :key="j">
              {{ $t(`timeCodes.${time.Timecode}`) }} von {{ time.Start }} bis
              {{ time.End }}
              ({{ getItemScheduleDays(time) }})
            </li>
          </ul>
        </div>
      </div>

      <small>
        {{ $t('lastChange') }}: {{ item.LastChange | dateFormat }}
      </small>
    </div>
  </div>
</template>

<script>
import { GastronomyApi } from '@/api';

const GASTRONOMY_TYPES = [
  'DishCodes',
  'CuisineCodes',
  'FacilityCodes_CreditCard',
  'FacilityCodes_Equipment',
  'FacilityCodes_QualitySeals',
];

const SCHEDULE_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thuresday',
  'Friday',
  'Saturday',
  'Sunday',
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
        this.item?.CategoryCodes?.map(
          (c) =>
            this.gastronomyTypes.find((t) => t.Id === c.Id)?.TypeDesc[
              this.language
            ]
        ) || []
      );
    },
    itemCeremonies() {
      return (
        this.item?.CapacityCeremony?.map((c) => ({
          name: this.gastronomyTypes.find((t) => t.Id === c.Id)?.TypeDesc[
            this.language
          ],
          maxSeatingCapacity: c.MaxSeatingCapacity,
        })) || []
      );
    },
    itemDishRates() {
      return (
        this.item?.DishRates?.map((c) => ({
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
        name: this.$t(`gastronomyTypes.${type}`),
        values: filteredArray
          .filter((t) => t.Type === type)
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
    getItemScheduleDays() {
      return (scheduleTime) =>
        SCHEDULE_DAYS.map((day) =>
          scheduleTime[day] ? this.$t(`scheduleDays.${day}`) : null
        ).join(', ');
    },
  },
  created() {
    this.gastronomyApi = new GastronomyApi();
    this.loadGastronomyTypeList();
    this.loadGastronomyItem();
  },
  filters: {
    dateFormat(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
  },
  methods: {
    loadGastronomyItem() {
      new GastronomyApi()
        .gastronomyGetGastronomySingle(this.contentId)
        .then((value) => {
          this.item = value.data;
        });
    },
    loadGastronomyTypeList() {
      new GastronomyApi()
        .gastronomyGetAllGastronomyTypesList()
        .then((value) => {
          this.gastronomyTypes = value.data;
        });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
