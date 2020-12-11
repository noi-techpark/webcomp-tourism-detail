<template>
  <div>
    <h2>List</h2>
    <div v-for="item of items" :key="item.id" @click.prevent="showDetail(item.Id)">
      <hr class="solid">
      <div class="list-item">
        <div class="thumbnail"></div>
        <div class="info">
          <div class="title">{{ getTitle(item, language) }}</div>
          <div v-if="contentType === 'Gastronomy'">{{ getGastronomyShortInfo(item) }}</div>
          <div v-else-if="contentType === 'Activity'">{{ getActivityShortInfo(item) }}</div>
          <div v-else-if="contentType === 'POI'">{{ getPoiShortInfo(item) }}</div>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
    <hr class="solid">
  </div>
</template>

<script>
import {ActivityApi, GastronomyApi, PoiApi} from "@/api";

export default {
  props: {
    language: {
      type: String,
      default: 'en'
    },
    contentType: {
      type: String,
      default: 'Gastronomy'
    },
  },
  data() {
    return {
      items: [],
      gastronomyTypes: [],
      activityTypes: [],
      poiTypes: []
    };
  },
  created() {
    if(this.contentType === 'Gastronomy') {
      this.loadGastronomyTypeList()
      this.loadGastronomyList()
    } else if(this.contentType === 'Activity') {
      this.loadActivityTypeList()
      this.loadActivityList()
    } else if(this.contentType === 'POI') {
      this.loadPoiTypeList();
      this.loadPoiList();
    }
  },
  methods: {
    showDetail(contentId) {
      this.$emit('show-detail', contentId);
    },
    loadActivityTypeList() {
      const activityApi = new ActivityApi()
      activityApi.activityGetAllActivityTypesList().then((value) => {
        this.activityTypes = value.data
        console.log(value)
      })
    },
    loadActivityList() {
      const activityApi = new ActivityApi()
      activityApi.activityGetActivityList(null, 1, 20, null, null,
          null,null,null,null,null,null,null,
          null,null,true,true,null,null,null,null,
          null,null,null,[]).then((value => {
        this.items = value?.data?.Items ?? []
        console.log(value)
      }))
    },
    loadGastronomyTypeList() {
      const gastronomyApi = new GastronomyApi()
      gastronomyApi.gastronomyGetAllGastronomyTypesList().then((value) => {
        this.gastronomyTypes = value.data
        console.log(value)
      })
    },
    loadGastronomyList() {
      const gastronomyApi = new GastronomyApi()
      gastronomyApi.gastronomyGetGastronomyList(
          1, 20, null, null, null, null, null,
          null, null, null, true, true, null, null,
          null, null, null, null, null, null
      ).then((value => {
        this.items = value?.data?.Items ?? []
        console.log(value)
      }))
    },
    loadPoiTypeList() {
      const poiApi = new PoiApi()
      poiApi.poiGetAllPoiTypesList().then((value) => {
        this.poiTypes = value.data
        console.log(value)
      })
    },
    loadPoiList() {
      const poiApi = new PoiApi()
      poiApi.poiGetPoiFiltered(1, 20, null, null, null, null, null,
      null, null, true, true, null, null, null, null, null,
      null, null, null, []
      ).then((value => {
        this.items = value?.data?.Items ?? []
        console.log(value)
      }))
    },
    getGastronomyShortInfo(item) {
      const categories = this.getGastronomyTypes(item)
      const location = 'Location: ' + (item?.ContactInfos?.[this.language]?.City ?? '')
      const telephone = 'Tel: ' + (item?.ContactInfos?.en?.Phonenumber ?? '')
      const url = 'Website: ' + (item?.ContactInfos?.en?.Url ?? '')
      return categories + ', ' + location + ', ' + telephone + ', ' + url
    },
    getGastronomyTypes(item) {
      const categoryCodeIds = item.CategoryCodes.map((code) =>
          this.gastronomyTypes.find(x => x.Id === code.Id)
      )
      const categories = categoryCodeIds.map((category) => {
        if(this.language === 'de') {
          return category?.TypeDesc?.de ?? ''
        } else if(this.language === 'it') {
          return category?.TypeDesc?.it ?? ''
        } else {
          return category?.TypeDesc?.en ?? ''
        }
      })
      return categories.join(', ')
    },
    getActivityShortInfo(item) {
      const categories = this.getActivityTypes(item)
      const location = 'Location: ' + (item?.ContactInfos?.[this.language]?.City ?? '')
      const telephone = 'Tel: ' + (item?.ContactInfos?.en?.Phonenumber ?? '')
      const url = 'Website: ' + (item?.ContactInfos?.en?.Url ?? '')
      const difficulty = 'Difficulty: ' + (item?.Difficulty ?? '')
      return categories + ', ' + location + ', ' + telephone + ', ' + url + ', ' + difficulty
    },
    getActivityTypes(item) {
      let categoryCodeIds = item.ActivityTypes.map((code) =>
          this.activityTypes.find(x => x.Id === code.Id)
      )
      categoryCodeIds = categoryCodeIds.filter(function (el) {
        return el != null;
      })
      const categories = categoryCodeIds.map((category) => {
        if(this.language === 'de') {
          return category?.TypeDesc?.de ?? ''
        } else if(this.language === 'it') {
          return category?.TypeDesc?.it ?? ''
        } else {
          return category?.TypeDesc?.en ?? ''
        }
      })
      return categories.join(', ')
    },
    getTitle(item, language) {
      return item?.Detail?.[language]?.Title ?? ''
    },
    getPoiShortInfo(item) {
      const categories = this.getPoiTypes(item);
      const location = 'Location: ' + (item?.ContactInfos?.[this.language]?.City ?? '')
      const telephone = 'Tel: ' + (item?.ContactInfos?.en?.Phonenumber ?? '')
      const url = 'Website: ' + (item?.ContactInfos?.en?.Url ?? '')
      return categories + ', ' + location + ', ' + telephone + ', ' + url
    },
    getPoiTypes(item) {
      let categoryCodeIds = item.PoiTypes.map((code) =>
          this.poiTypes.find(x => x.Id === code.Id)
      )
      categoryCodeIds = categoryCodeIds.filter(function (el) {
        return el != null;
      })
      const categories = categoryCodeIds.map((category) => {
        if(this.language === 'de') {
          return category?.TypeDesc?.de ?? ''
        } else if(this.language === 'it') {
          return category?.TypeDesc?.it ?? ''
        } else {
          return category?.TypeDesc?.en ?? ''
        }
      })
      return categories.join(', ')
    }
  },
};
</script>
<style scoped>
  .list-item {
    display: flex;
    flex-direction: row;
    padding: 8px;
    align-items: center;
  }

  .thumbnail {
    height: 80px;
    width: 80px;
    background-color: grey;
  }

  .info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 20px;
  }

  .arrow {
    height: 20px;
    width: 20px;
    background-color: grey;
  }

  hr.solid {
    border-top: 1px solid lightgray;
    margin: 8px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }
</style>