<template>
  <div class="list">
    <h2 class="page-title">{{ $t(contentType) }}</h2>
    <paging
        :current-page="currentPage"
        :total-pages="totalPages"
        @next-page="nextPage"
        @last-page="lastPage"
        @go-to-page="goToPage"></paging>
    <template v-if="items.length > 0">
      <div v-for="item of items" :key="item.id" @click.prevent="showDetail(item.Id)" class="item-container">
        <hr class="solid">
        <div class="list-item">
          <div class="thumbnail" v-if="item.ImageGallery === null || item.ImageGallery.length === 0"></div>
          <div v-else><img class="thumbnail" :src="item.ImageGallery[0].ImageUrl"/></div>
          <div class="info">
            <div class="title">{{ getTitle(item, language) }}</div>
            <div v-if="contentType === 'Gastronomy'" class="short-info">{{ getGastronomyShortInfo(item) }}</div>
            <div v-else-if="contentType === 'Activity'" class="short-info">{{ getActivityShortInfo(item) }}</div>
            <div v-else-if="contentType === 'POI'" class="short-info">{{ getPoiShortInfo(item) }}</div>
          </div>
          <img src="@/assets/img/arrow_right.svg" width="28" height="28"/>
        </div>
      </div>
    </template>
    <div v-else-if="isLoading" class="loading-spinner">
      <img src="@/assets/img/loading.gif"/>
    </div>
    <div class="noResult" v-else>{{ $t('noResults')}}</div>
    <div class="bottom-divider" v-if="items.length > 0"><hr class="solid"></div>
    <div class="bottom-divider bottom-divider2" v-if="items.length > 0"><hr class="solid"></div>
    <paging
        :current-page="currentPage"
        :total-pages="totalPages"
        @next-page="nextPage"
        @last-page="lastPage"
        @go-to-page="goToPage"></paging>
  </div>
</template>

<script>
import {ActivityApi, GastronomyApi, PoiApi} from "@/api";
import Paging from "@/components/Paging";

export default {
  components: {Paging},
  props: {
    language: {
      type: String,
      default: 'en'
    },
    contentType: {
      type: String,
      default: 'Gastronomy'
    },
    contentIdList: {
      type: String,
      default: null
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      items: [],
      gastronomyTypes: [],
      activityTypes: [],
      currentPage: 0,
      totalPages: 0,
      isLoading: false
    };
  },
  created() {
    if(this.contentType === 'Gastronomy') {
      this.loadGastronomyTypeList()
      this.loadGastronomyList(1)
    } else if(this.contentType === 'Activity') {
      this.loadActivityTypeList()
      this.loadActivityList(1)
    } else if(this.contentType === 'POI') {
      this.loadPoiList(1)
    }
  },
  methods: {
    nextPage() {
      this.items = []
      if(this.contentType === 'Gastronomy') {
        this.loadGastronomyList(this.currentPage + 1)
      } else if(this.contentType === 'Activity') {
        this.loadActivityList(this.currentPage + 1)
      } else {
        this.loadPoiList(this.currentPage + 1)
      }
      this.currentPage = this.currentPage + 1
    },
    lastPage() {
      this.items = []
      if(this.contentType === 'Gastronomy') {
        this.loadGastronomyList(this.currentPage - 1)
      } else if(this.contentType === 'Activity') {
        this.loadActivityList(this.currentPage - 1)
      } else {
        this.loadPoiList(this.currentPage - 1)
      }
      this.currentPage = this.currentPage - 1
    },
    goToPage(pageNum) {
      this.items = []
      if(this.contentType === 'Gastronomy') {
        this.loadGastronomyList(pageNum)
      } else if(this.contentType === 'Activity') {
        this.loadActivityList(pageNum)
      } else {
        this.loadPoiList(pageNum)
      }
      this.currentPage = pageNum
    },
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
    loadActivityList(pageNum) {
      this.isLoading = true;
      const activityApi = new ActivityApi()
      activityApi.activityGetActivityList(null, pageNum, this.pageSize, null, null,
          this.contentIdList,null,null,null,null,null,null,
          null,null,true,true,null,null,null,null,
          null,null,null,[]).then((value => {
        this.items = value?.data?.Items ?? []
        this.currentPage = value?.data?.CurrentPage
        this.totalPages = value?.data?.TotalPages
        for(const item of this.items) {
          console.log(item.ImageGallery.length)
        }
        console.log(value)
        this.isLoading = false;
      }))
    },
    loadGastronomyTypeList() {
      const gastronomyApi = new GastronomyApi()
      gastronomyApi.gastronomyGetAllGastronomyTypesList().then((value) => {
        this.gastronomyTypes = value.data
        console.log(value)
      })
    },
    loadGastronomyList(pageNum) {
      this.isLoading = true;
      const gastronomyApi = new GastronomyApi()
      gastronomyApi.gastronomyGetGastronomyList(
          pageNum, this.pageSize, this.contentIdList, null, null, null, null,
          null, null, null, true, true, null, null,
          null, null, null, null, null, null
      ).then((value => {
        this.items = value?.data?.Items ?? []
        this.currentPage = value?.data?.CurrentPage
        this.totalPages = value?.data?.TotalPages
        for(const item of this.items) {
          console.log(item.ImageGallery.length)
        }
        console.log(value)
        this.isLoading = false;
      }))
    },
    loadPoiList(pageNum) {
      this.isLoading = true;
      const poiApi = new PoiApi()
      poiApi.poiGetPoiFiltered(pageNum, this.pageSize, null, null, this.contentIdList, null, null,
      null, null, true, true, null, null, null, null, null,
      null, null, null, []
      ).then((value => {
        this.items = value?.data?.Items ?? []
        this.currentPage = value?.data?.CurrentPage
        this.totalPages = value?.data?.TotalPages
        console.log(value)
        this.isLoading = false;
      }))
    },
    getGastronomyShortInfo(item) {
      const categories = this.getGastronomyTypes(item)
      const location = this.$t('location') + ': ' + (item?.ContactInfos?.[this.language]?.City ?? '')
      const telephone = this.$t('phone') + ': ' + (item?.ContactInfos?.en?.Phonenumber ?? '')
      const url = this.$t('web') + ': ' + (item?.ContactInfos?.en?.Url ?? '')
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
      const location = this.$t('location') + ': ' + (item?.ContactInfos?.[this.language]?.City ?? '')
      const telephone = this.$t('phone') + ': ' + (item?.ContactInfos?.en?.Phonenumber ?? '')
      const url = this.$t('web') + ': ' + (item?.ContactInfos?.en?.Url ?? '')
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
      const location = this.$t('location') + ': ' + (item?.ContactInfos?.[this.language]?.City ?? '')
      const telephone = this.$t('phone') + ': ' + (item?.ContactInfos?.en?.Phonenumber ?? '')
      const url = this.$t('web') + ': ' + (item?.ContactInfos?.en?.Url ?? '')
      return categories + ', ' + location + ', ' + telephone + ', ' + url
    },
    getPoiTypes(item) {
      const poiType = item.AdditionalPoiInfos[this.language].MainType
      const subType = item.AdditionalPoiInfos[this.language].SubType
      const categories = []
      if(poiType !== null) {
        categories.push(poiType)
      }
      if(subType !== null) {
        categories.push(subType)
      }
      return categories.join(', ')
    }
  },
};
</script>
<style scoped>
  .list-item {
    display: flex;
    flex-direction: row;
    padding: 8px 40px 8px 40px;
    align-items: center;
  }

  .thumbnail {
    min-height: 60px;
    min-width: 60px;
    max-width: 60px;
    max-height: 60px;
    background-color: #E8ECF1;
  }

  .info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 24px;
  }

  hr.solid {
    border-top: 1px solid #CFCFCF;
    margin: 8px 40px 8px 40px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .short-info {
    font-size: 14px;
    word-break: break-word;
  }

  .page-title {
    font-weight: bold;
    font-size: 36px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .item-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .bottom-divider {
    width: 100%;
  }

  .bottom-divider2 {
    visibility: hidden;
  }

  @media(min-width: 768px){
    .item-container{
      width: 50%;
    }

    .bottom-divider {
      width: 50%;
    }

    .bottom-divider2 {
      visibility: visible;
    }
  }

  .loading-spinner {
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .noResult {
    margin-left: 40px;
  }
</style>