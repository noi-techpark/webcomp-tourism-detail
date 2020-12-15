<template>
  <div>
    <a v-if="isListAvailable" href @click.prevent="close">close</a><br />
    <p>{{ contentId }}</p>
    <hr />
    <div v-if="item">
      <h2>{{ itemDetail.Title }}</h2>

      <ul>
        <li v-if="item.Altitude">
          {{ $t('altitude') }}: {{ item.Altitude
          }}{{ item.AltitudeUnitofMeasure }}
        </li>
        <li v-if="item.Difficulty">
          {{ $t('difficulty') }}: {{ item.Difficulty }}
        </li>
        <li v-if="googleMapsLink">
          <a :href="googleMapsLink" target="_blank">Google Maps</a>
        </li>
        <li v-if="itemContactInfos.City">
          {{ $t('location') }}: {{ itemContactInfos.City }}
        </li>
        <li v-if="itemContactInfos.Url">
          {{ $t('web') }}:
          <a :href="itemContactInfos.Url" target="_blank">{{
            itemContactInfos.Url
          }}</a>
        </li>
        <li v-if="itemContactInfos.Phonenumber">
          {{ $t('phone') }}: {{ itemContactInfos.Phonenumber }}
        </li>
      </ul>

      <p v-if="itemDetail.BaseText" v-html="itemDetail.BaseText"></p>

      <!-- POI / Activity -->
      <div v-if="itemAdditionalPoiInfos">
        <div v-if="itemAdditionalPoiInfos.MainType">
          <b>{{ $t('mainType') }}:</b> {{ itemAdditionalPoiInfos.MainType }}
        </div>
        <div v-if="itemAdditionalPoiInfos.SubType">
          <b>{{ $t('subType') }}:</b> {{ itemAdditionalPoiInfos.SubType }}
        </div>
      </div>

      <div>
        <ul>
          <li v-for="(value, key) of itemPoiProps" :key="key">
            <b>{{ $t(`props.${key}`) }}:</b>
            {{ value === true ? $t('yes') : value }}
          </li>
        </ul>
      </div>

      <!-- Gastronomy -->
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

      <!-- COMMON -->
      <div v-if="itemOperationSchedule.length">
        <b>{{ $t('operationSchedule') }}</b>
        <div v-for="(schedule, i) of itemOperationSchedule" :key="i">
          <!-- Opened || Closed -->
          <div v-if="schedule.Type === '1' || schedule.Type === '2'">
            <b>{{ $t(`scheduleTypes.${schedule.Type}`) }}:</b>
            <ul v-if="schedule.OperationScheduleTime">
              <li v-for="(time, j) of schedule.OperationScheduleTime" :key="j">
                {{ $t(`timeCodes.${time.Timecode}`) }} von {{ time.Start }} bis
                {{ time.End }}
                ({{ getItemScheduleDays(time) }})
              </li>
            </ul>
          </div>
          <!-- Season -->
          <div v-if="schedule.Type === '3'">
            {{ schedule.Start | dateFormat }} bis
            {{ schedule.Stop | dateFormat }}
          </div>
        </div>
      </div>

      <small>
        {{ $t('lastChange') }}: {{ item.LastChange | dateFormat }}
      </small>
    </div>
  </div>
</template>

<script>
import { GastronomyApi, PoiApi, ActivityApi } from '@/api';

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
    contentType: {
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
    itemDetail() {
      return this.item?.Detail?.[this.language] || {};
    },
    itemContactInfos() {
      return this.item?.ContactInfos?.[this.language] || {};
    },
    googleMapsLink() {
      return this.item?.Latitude && this.item?.Longitude
        ? `https://www.google.com/maps/search/?api=1&query=${this.item.Latitude},${this.item.Longitude}`
        : null;
    },
    itemAdditionalPoiInfos() {
      const infos = this.item?.AdditionalPoiInfos?.[this.language] || {};
      return infos.MainType || infos.SubType ? infos : null;
    },
    itemPoiProps() {
      if (!this.item) {
        return {};
      }

      const showProps = [
        'IsOpen',
        'AltitudeDifference',
        'AltitudeLowestPoint',
        'AltitudeHighestPoint',
        'AltitudeSumUp',
        'AltitudeSumDown',
        'DistanceLength',
        'DistanceDuration',
        'HasFreeEntrance',
        'BikeTransport',
        'LiftAvailable',
        'RunToValley',
        'IsWithLight',
        'HasRentals',
        'IsPrepared',
        'FeetClimb',
      ];

      const props = {};
      for (const key of showProps) {
        if (!!this.item[key] && this.item[key] !== '0.0') {
          props[key] = this.item[key];
        }
      }

      return props;
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
          (((s.Type === '1' || s.Type === '2') && s.OperationScheduleTime) ||
            s.Type === '3') &&
          now.getTime() <= stop.getTime() &&
          now.getTime() >= start.getTime()
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
    if (this.contentType === 'Gastronomy') {
      this.loadGastronomyItem();
      this.loadGastronomyTypeList();
    } else if (this.contentType === 'POI') {
      this.loadPoiItem();
    } else if (this.contentType === 'Activity') {
      this.loadActivityItem();
    }
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
    loadPoiItem() {
      new PoiApi().poiGetPoiSingle(this.contentId).then((value) => {
        this.item = value.data;
      });
    },
    loadActivityItem() {
      new ActivityApi()
        .activityGetActivitySingle(this.contentId)
        .then((value) => {
          this.item = value.data;
        });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
