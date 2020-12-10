<template>
  <div>
    <h2>List</h2>
    <div v-for="item of items" :key="item.id" @click.prevent="showDetail(item.id)">
      <hr class="solid">
      <div class="list-item">
        <div class="thumbnail"></div>
        <div class="info">
          <div class="title">{{ item.Shortname }}</div>
          <div v-if="contentType === 'Gastronomy'">{{ getActivityShortInfo(item) }}</div>
          <div v-if="contentType === 'Activity'"></div>
          <div v-if="contentType === 'POI'">{{ getActivityShortInfo(item) }}</div>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {ActivityApi, GastronomyApi} from "@/api";

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
      activityTypes: []
    };
  },
  created() {
    this.loadGastronomyTypeList()
    this.loadGastronomyList()
    //this.loadActivityTypeList()
    //this.loadActivityList()
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
      activityApi.activityGetActivityList().then((value => {
        this.items = value.data.Items
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
        this.items = value.data.Items
        console.log(value)
      }))
    },
    getActivityShortInfo(item) {
      const categories = this.getGastronomyTypes(item)
      const location = 'Location: ' + this.getLocation(item)
      const telephone = 'Tel: ' + item.ContactInfos.de.Phonenumber
      const url = 'Website: ' + item.ContactInfos.de.Url
      return categories + ', ' + location + ', ' + telephone + ', ' + url
    },
    getGastronomyTypes(item) {
      const categoryCodeIds = item.CategoryCodes.map((code) =>
          this.gastronomyTypes.find(x => x.Id === code.Id)
      )
      const categories = categoryCodeIds.map((category) => {
        if(this.language === 'de') {
          return category.TypeDesc.de
        } else if(this.language === 'it') {
          return category.TypeDesc.it
        } else {
          return category.TypeDesc.en
        }
      })
      return categories.join(', ')
    },
    getLocation(item) {
      if(this.language === 'de') {
        return item.ContactInfos.de.City
      } else if(this.language === 'it') {
        return item.ContactInfos.it.City
      } else {
        return item.ContactInfos.en.City
      }
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