<template>
  <div>
    <a v-if="isListAvailable" href @click.prevent="close">close</a><br />
    <p>{{ contentId }}</p>
    <hr />
    <div v-if="item">
      <h2>{{ dataDetail.Title }}</h2>

      <ul>
        <li>Altitude: {{ item.Altitude }}m</li>
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
    </div>
  </div>
</template>

<script>
import { GastronomyApi } from '@/api';

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
  },
  created() {
    this.gastronomyApi = new GastronomyApi();
    this.loadGastronomyItem();
  },
  methods: {
    loadGastronomyItem() {
      this.gastronomyApi
        .gastronomyGetGastronomySingle(this.contentId)
        .then((value) => {
          this.item = value.data;
          console.log(this.item);
        });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
