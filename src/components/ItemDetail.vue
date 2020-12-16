<template>
  <div>
    <a v-if="isListAvailable" href @click.prevent="close">close</a><br />

    <div v-if="item" class="item">
      <h2>{{ itemDetail.Title }}</h2>

      <div class="detail-box">
        <ul class="props">
          <li v-if="item.Difficulty">
            <img src="@/assets/img/ic_difficulty.svg" />
            <span class="prop-key">{{ $t('difficulty') }}:</span>
            {{ item.Difficulty }}
          </li>
          <li v-if="item.Altitude">
            <img src="@/assets/img/ic_altitudedifference.svg" />
            <span class="prop-key">{{ $t('altitude') }}:</span>
            {{ item.Altitude }}{{ item.AltitudeUnitofMeasure }}
          </li>
          <li v-if="item.AltitudeDifference">
            <img src="@/assets/img/ic_altitudedifference.svg" />
            <span class="prop-key">{{ $t('props.AltitudeDifference') }}:</span>
            {{ item.AltitudeDifference }}{{ item.AltitudeUnitofMeasure }}
          </li>
          <li v-if="item.AltitudeHighestPoint">
            <img src="@/assets/img/ic_altitudehighestpoint.svg" />
            <span class="prop-key"
              >{{ $t('props.AltitudeHighestPoint') }}:</span
            >
            {{ item.AltitudeHighestPoint }}{{ item.AltitudeUnitofMeasure }}
          </li>
          <li v-if="item.AltitudeLowestPoint">
            <img src="@/assets/img/ic_altitudelowestpoint.svg" />
            <span class="prop-key">{{ $t('props.AltitudeLowestPoint') }}:</span>
            {{ item.AltitudeLowestPoint }}{{ item.AltitudeUnitofMeasure }}
          </li>
          <li v-if="item.DistanceDuration">
            <img src="@/assets/img/ic_distanceduration.svg" />
            <span class="prop-key">{{ $t('props.DistanceDuration') }}:</span>
            {{ item.DistanceDuration }}
          </li>
          <li v-if="item.DistanceLength">
            <img src="@/assets/img/ic_distancelength.svg" />
            <span class="prop-key">{{ $t('props.DistanceLength') }}:</span>
            {{ item.DistanceLength }}
          </li>
          <li v-if="googleMapsLink">
            <img src="@/assets/img/ic_map.svg" />
            <a :href="googleMapsLink" target="_blank">Google Maps</a>
          </li>
          <li v-if="itemContactInfos.City">
            <img src="@/assets/img/ic_map.svg" />
            <span class="prop-key">{{ $t('location') }}:</span>
            {{ itemContactInfos.City }}
          </li>
          <li v-if="itemContactInfos.Url">
            <img src="@/assets/img/ic_external-link.svg" />
            <span class="prop-key">{{ $t('web') }}:</span>
            <a :href="itemContactInfos.Url" target="_blank">
              {{ itemContactInfos.Url }}
            </a>
          </li>
          <li v-if="itemContactInfos.Phonenumber">
            <img src="@/assets/img/ic_phone.svg" />
            <span class="prop-key">{{ $t('phone') }}:</span>
            {{ itemContactInfos.Phonenumber }}
          </li>
        </ul>
      </div>

      <!-- POI / Activity -->
      <div v-if="itemAdditionalPoiInfos">
        <div v-if="itemAdditionalPoiInfos.MainType">
          <b>{{ $t('mainType') }}:</b> {{ itemAdditionalPoiInfos.MainType }}
        </div>
        <div v-if="itemAdditionalPoiInfos.SubType">
          <b>{{ $t('subType') }}:</b> {{ itemAdditionalPoiInfos.SubType }}
        </div>
      </div>

      <div v-if="itemDetail.BaseText" v-html="itemDetail.BaseText"></div>

      <div v-if="Object.keys(itemProps).length" class="additional-props-box">
        <ul
          class="props"
          :class="{ single: Object.keys(itemProps).length === 1 }"
        >
          <li v-for="(value, key) of itemProps" :key="key">
            <span class="prop-key">{{ $t(`props.${key}`) }}:</span>
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
    itemProps() {
      if (!this.item) {
        return {};
      }

      const showProps = [
        'IsOpen',
        'AltitudeSumUp',
        'AltitudeSumDown',
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

<style lang="scss" scoped>
.item > div {
  margin-bottom: 1.5rem;
}
h2 {
  background-color: #e8ecf1;
  padding: 2rem;
  margin-bottom: 0;
}
.detail-box {
  border: 1px solid #e8ecf1;
  padding: 2rem;
}
.additional-props-box {
  padding: 2rem;
  background-color: #e8ecf1;
}
.props {
  list-style: none;
  padding: 0;
  margin: 0;
  font-style: italic;

  &:not(.single) {
    columns: 3;
  }

  > li {
    padding: 0.2rem 0;
  }

  img {
    height: 16px;
    width: 16px;
    margin-right: 0.7em;
  }

  a {
    color: #2980b9;
    text-decoration: none;
  }

  .prop-key {
    color: #888888;
  }
}
</style>
