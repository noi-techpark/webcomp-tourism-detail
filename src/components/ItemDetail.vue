<template>
  <div>
    <div class="back-button" @click.prevent="close" v-if="isListAvailable">
      <div
        style="min-height: 40px; min-width: 40px; max-height: 40px; max-width: 40px"
      >
        <arrow-icon-left viewBox="0 0 24 24" width="100%" height="40px" />
      </div>
      <span style="color: #888888">{{ $t('back') }}</span>
    </div>
    <div v-if="item" class="item">
      <div class="title-container" :style="titleImage">
        <div class="title">
          <h1>{{ itemDetail.Title }}</h1>
          <!-- Gastronomy -->
          <div v-if="itemCategories" class="props">
            <div>
              <span class="prop-key" v-if="item.CategoryCodes.length > 1"
                >{{ $t('categories') }}:</span
              >
              <span class="prop-key" v-else>{{ $t('category') }}:</span>
              {{ itemCategories }}
            </div>
          </div>
          <!-- POI / Activity -->
          <div v-if="itemAdditionalPoiInfos">
            <div v-if="itemAdditionalPoiInfos.MainType" class="props">
              <span class="prop-key">{{ $t('category') }}:</span
              >{{ itemAdditionalPoiInfos.MainType }}
            </div>
            <div v-if="itemAdditionalPoiInfos.SubType" class="props">
              <span class="prop-key">{{ $t('subcategory') }}:</span
              >{{ itemAdditionalPoiInfos.SubType }}
            </div>
          </div>
        </div>
      </div>

      <div class="detail-box">
        <ul class="props">
          <li v-if="item.Difficulty">
            <difficulty class="difficulty icon"></difficulty>
            <span class="prop-key">{{ $t('difficulty') }}:</span>
            <span class="text-dark">{{ item.Difficulty }}</span>
          </li>
          <li v-if="item.Altitude">
            <altitude-difference
              class="altitude-difference icon"
            ></altitude-difference>
            <span class="prop-key">{{ $t('altitude') }}: </span>
            <span class="text-dark"
              >{{ item.Altitude }}{{ item.AltitudeUnitofMeasure }}</span
            >
          </li>
          <li v-if="item.AltitudeDifference">
            <altitude-difference
              class="altitude-difference icon"
            ></altitude-difference>
            <span class="prop-key">{{ $t('props.AltitudeDifference') }}: </span>
            <span class="text-dark"
              >{{ item.AltitudeDifference
              }}{{ item.AltitudeUnitofMeasure }}</span
            >
          </li>
          <li v-if="item.AltitudeHighestPoint">
            <altitude-highest-point
              class="altitude-highest-point icon"
            ></altitude-highest-point>
            <span class="prop-key"
              >{{ $t('props.AltitudeHighestPoint') }}:
            </span>
            <span class="text-dark"
              >{{ item.AltitudeHighestPoint
              }}{{ item.AltitudeUnitofMeasure }}</span
            >
          </li>
          <li v-if="item.AltitudeLowestPoint">
            <altitude-lowest-point
              class="altitude-lowest-point icon"
            ></altitude-lowest-point>
            <span class="prop-key"
              >{{ $t('props.AltitudeLowestPoint') }}:
            </span>
            <span class="text-dark"
              >{{ item.AltitudeLowestPoint
              }}{{ item.AltitudeUnitofMeasure }}</span
            >
          </li>
          <li v-if="item.DistanceDuration">
            <distance-duration
              class="distance-duration icon"
            ></distance-duration>
            <span class="prop-key">{{ $t('props.DistanceDuration') }}: </span>
            <span class="text-dark">{{ item.DistanceDuration }}</span>
          </li>
          <li v-if="item.DistanceLength">
            <distance-length class="distance-length icon"></distance-length>
            <span class="prop-key">{{ $t('props.DistanceLength') }}: </span>
            <span class="text-dark">{{ item.DistanceLength }}</span>
          </li>
          <li v-if="googleMapsLink">
            <map-icon class="map-icon icon"></map-icon>
            <a :href="googleMapsLink" target="_blank">Google Maps</a>
          </li>
          <li v-if="itemContactInfos.City">
            <map-icon class="map-icon icon"></map-icon>
            <span class="prop-key">{{ $t('location') }}: </span>
            <span class="text-dark">{{ itemContactInfos.City }}</span>
          </li>
          <li v-if="itemContactInfos.Url">
            <external-link class="external-link icon"></external-link>
            <span class="prop-key">{{ $t('web') }}: </span>
            <a :href="itemContactInfos.Url" target="_blank">
              {{ itemContactInfos.Url }}
            </a>
          </li>
          <li v-if="itemContactInfos.Phonenumber">
            <phone class="phone icon"></phone>
            <span class="prop-key">{{ $t('phone') }}: </span>
            <span class="text-dark">{{ itemContactInfos.Phonenumber }}</span>
          </li>
          <li v-if="this.contentType === 'Gastronomy'">
            <calendar class="calendar icon"></calendar>
            <span v-if="isGastronomyItemOpen === true" style="color: #9BC320">{{
              $t(`scheduleTypes.1`)
            }}</span>
            <span v-if="isGastronomyItemOpen === false" style="color: red">{{
              $t(`scheduleTypes.2`)
            }}</span>
          </li>
          <li v-else-if="item.IsOpen != null">
            <calendar class="calendar icon"></calendar>
            <span
              :style="[
                item.IsOpen === true ? { color: '#9BC320' } : { color: 'red' },
              ]"
              >{{
                item.IsOpen === true
                  ? $t('scheduleTypes.1')
                  : $t('scheduleTypes.2')
              }}</span
            >
          </li>
        </ul>
      </div>

      <div
        v-if="itemDetail.BaseText"
        v-html="itemDetail.BaseText"
        class="text"
      ></div>

      <!-- COMMON -->
      <div v-if="contentType === 'Gastronomy' && isGastronomyItemOpen.length">
        <div class="subtitle">{{ $t('operationSchedule') }}</div>
        <div>
          <div v-for="(schedule, i) of isGastronomyItemOpen" :key="i">
            <!-- Opened || Closed -->
            <div v-if="schedule.Type === '1' || schedule.Type === '2'">
              <ul v-if="schedule.OperationScheduleTime">
                <div
                  v-for="(time, j) of schedule.OperationScheduleTime"
                  :key="j"
                  class="text"
                >
                  <span class="text-dark">{{
                    $t(`timeCodes.${time.Timecode}`)
                  }}</span>
                  von {{ time.Start }} bis
                  {{ time.End }}
                  ({{ getItemScheduleDays(time) }})
                </div>
              </ul>
            </div>
            <!-- Season -->
            <div v-if="schedule.Type === '3'">
              {{ schedule.Start | dateFormat }} bis
              {{ schedule.Stop | dateFormat }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="Object.keys(itemProps).length" class="additional-props-box">
        <ul
          class="props"
          :class="{ single: Object.keys(itemProps).length === 1 }"
        >
          <li v-for="(value, key) of itemProps" :key="key" class="text">
            <span class="prop-key">{{ $t(`props.${key}`) }}:</span>
            {{ value === true ? $t('yes') : value }}
          </li>
        </ul>
      </div>

      <div v-if="itemCeremonies.length">
        <div class="subtitle">{{ $t('ceremonies') }}</div>
        <ul>
          <li v-for="(value, i) of itemCeremonies" :key="i" class="text">
            <span class="text-dark">{{ value.name }}</span> (max.
            {{ value.maxSeatingCapacity }} Personen)
          </li>
        </ul>
      </div>

      <div v-if="itemDishRates.length">
        <div class="subtitle">{{ $t('dishRates') }}</div>
        <ul>
          <li v-for="(value, i) of itemDishRates" :key="i" class="text">
            <span class="text-dark">{{ value.name }}</span> (von
            {{ value.minAmount }} bis {{ value.maxAmount }}
            {{ value.currencyCode }})
          </li>
        </ul>
      </div>

      <div v-for="type of itemGastronomyTypes" :key="type.type">
        <div style="text-align: center; color: #949494">{{ type.name }}</div>
        <div class="gastronomyTypes">
          <div v-for="(value, i) of type.values" :key="i" class="category">
            {{ value }}
          </div>
        </div>
      </div>

      <div v-if="imageGallery">
        <img
          v-for="(image, i) of imageGallery"
          :key="i"
          :src="image.ImageUrl"
          height="200"
          width="200"
          class="image"
          @click="openImageDetail(image)"
        />
      </div>

      <small class="text">
        {{ $t('lastChange') }}: {{ item.LastChange | dateFormat }}
      </small>
    </div>
    <image-detail
      :imgUrl="imageUrl"
      v-if="showImage"
      :hasMultipleImgs="hasMultipleImgs"
      @close="closeImageDetail"
      @next-image="nextImage"
      @last-image="lastImage"
    ></image-detail>
  </div>
</template>

<script>
import ArrowIconLeft from '@/assets/img/arrow_left.svg';
import ExternalLink from '@/assets/img/ic_external-link.svg';
import AltitudeDifference from '@/assets/img/ic_altitudedifference.svg';
import AltitudeHighestPoint from '@/assets/img/ic_altitudehighestpoint.svg';
import AltitudeLowestPoint from '@/assets/img/ic_altitudelowestpoint.svg';
import Calendar from '@/assets/img/ic_calendar.svg';
import DistanceDuration from '@/assets/img/ic_distanceduration.svg';
import DistanceLength from '@/assets/img/ic_distanceduration.svg';
import MapIcon from '@/assets/img/ic_map.svg';
import Phone from '@/assets/img/ic_phone.svg';
import Difficulty from '@/assets/img/ic_difficulty.svg';
import { GastronomyApi, PoiApi, ActivityApi } from '@/api';
import ImageDetail from '@/components/ImageDetail';

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
  components: {
    ImageDetail,
    ArrowIconLeft,
    Difficulty,
    ExternalLink,
    AltitudeDifference,
    AltitudeHighestPoint,
    AltitudeLowestPoint,
    Calendar,
    DistanceDuration,
    DistanceLength,
    MapIcon,
    Phone,
  },
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
      showImage: false,
      imageUrl: null,
      selectedImage: null,
    };
  },
  computed: {
    titleImage() {
      const image = this.item?.ImageGallery[0];
      if (image == null) {
        return {};
      } else {
        return {
          backgroundImage: 'url(' + image.ImageUrl + ') ',
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
    },
    imageGallery() {
      return this.item?.ImageGallery || [];
    },
    hasMultipleImgs() {
      return this.imageGallery.length > 1;
    },
    itemDetail() {
      console.log(this.item?.Detail?.[this.language]);
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
        ).join(', ') || ''
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
    isGastronomyItemOpen() {
      const schedules = this.item.OperationSchedule.filter((s) => {
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
      const schedule =
        schedules !== null && schedules.length > 0 ? schedules[0] : null;
      let open = false;
      if (schedule !== null) {
        for (const time of schedule.OperationScheduleTime) {
          if (time.State === 1) {
            open = true;
          }
        }
      }
      return open;
    },
    getItemScheduleDays() {
      return (scheduleTime) =>
        SCHEDULE_DAYS.map((day) =>
          scheduleTime[day] ? this.$t(`scheduleDays.${day}`) : null
        )
          .filter((day) => day != null)
          .join(', ');
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
    openImageDetail(image) {
      this.imageUrl = image.ImageUrl;
      this.selectedImage = image;
      this.showImage = true;
    },
    closeImageDetail() {
      this.showImage = false;
    },
    nextImage() {
      const currentIndex = this.imageGallery.indexOf(this.selectedImage);
      if (currentIndex + 1 < this.imageGallery.length) {
        this.selectedImage = this.imageGallery[currentIndex + 1];
        this.imageUrl = this.selectedImage.ImageUrl;
      } else {
        this.selectedImage = this.imageGallery[0];
        this.imageUrl = this.selectedImage.ImageUrl;
      }
    },
    lastImage() {
      const currentIndex = this.imageGallery.indexOf(this.selectedImage);
      if (currentIndex - 1 >= 0) {
        this.selectedImage = this.imageGallery[currentIndex - 1];
        this.imageUrl = this.selectedImage.ImageUrl;
      } else {
        this.selectedImage = this.imageGallery[this.imageGallery.length - 1];
        this.imageUrl = this.selectedImage.ImageUrl;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item > div {
  margin-bottom: 1rem;
}
.title {
  background-color: #e8ecf1;
  padding: 2rem;
  opacity: 0.8;
  max-width: 100%;
  max-height: 400px;
}

h2 {
  margin-bottom: 2px;
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
    columns: 1;
  }

  @media (min-width: 768px) {
    &:not(.single) {
      columns: 2;
    }
  }

  @media (min-width: 992px) {
    &:not(.single) {
      columns: 3;
    }
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
    padding-right: 4px;
  }
}

.subtitle {
  color: #212529;
  font-size: 18px;
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
}

.subtype {
  padding-top: 4px;
  padding-bottom: 8px;
}

.categories {
  padding-bottom: 8px;
}

.gastronomyTypes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.category {
  padding: 4px 12px 4px 12px;
  margin-right: 8px;
  margin-top: 8px;
  height: 30px;
  border: 1px solid #e8ecf1;
  border-radius: 30px;
  opacity: 1;
  text-align: center;
  align-items: center;
  display: flex;
  color: #cfcfcf;
}

ul {
  padding-inline-start: 0px;
  margin: 0;
}

.text {
  color: #949494;
}

.text-dark {
  color: #2e3131;
}

.image {
  padding-right: 8px;
  padding-top: 8px;
  object-fit: cover;
}

.title-image {
  max-height: 400px;
  object-fit: cover;
  width: 100%;
}

.title-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 0 !important;
  overflow: hidden;
}

.info-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.back-button {
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  cursor: pointer;
}

.back-button:hover {
  cursor: pointer;
}

h1 {
  font-size: 36px;
  overflow-wrap: break-word;
  hyphens: auto;
}

.external-link {
  .a,
  .b {
    fill: none;
  }
  .a {
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.167px;
  }
}

.difficulty {
  .a,
  .b,
  .c {
    fill: none;
  }
  .b,
  .c {
    stroke: #000;
    stroke-width: 1.25px;
  }
  .c {
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

.altitude-difference {
  .a,
  .b,
  .c {
    fill: none;
  }
  .b,
  .c {
    stroke: #000;
  }
  .b {
    stroke-width: 1.25px;
  }
}

.altitude-highest-point {
  .a,
  .b {
    fill: none;
  }
  .b {
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.25px;
  }
}

.altitude-lowest-point {
  .a,
  .b {
    fill: none;
  }
  .b {
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.25px;
  }
}

.calendar {
  .a,
  .b {
    fill: none;
  }
  .b {
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.25px;
  }
}

.distance-duration {
  .a {
    fill: none;
  }
}

.distance-length {
  .a,
  .b,
  .c {
    fill: none;
  }
  .b,
  .c {
    stroke: #000;
  }
  .b {
    stroke-width: 1.25px;
  }
}

.info {
  .a,
  .b {
    fill: none;
  }
  .a {
    stroke: #000;
    stroke-width: 1.25px;
  }
}

.map-icon {
  .a {
    fill: none;
  }
}

.phone {
  .a,
  .b {
    fill: none;
  }
  .b {
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.25px;
  }
}

.icon {
  margin-right: 4px;
}
</style>
