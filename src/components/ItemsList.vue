<template>
  <div class="list">
    <h2 class="page-title">{{ $t(contentType) }}</h2>
    <!-- <h3>parameter: {{ contentType }} - {{ language }} - {{ category }} - {{ sourceFilter }} - {{ locFilter }} - {{ withImageOnly }}</h3> -->
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        :placeholder="$t('searchOdhActivityPoi')"
        v-model="searchInput"
        @keyup="searchODHActivityPoiList"
      />
      <div class="search-button">
        <search-icon
          @click="loadODHActivityPoiList(currentPage)"
          width="24px"
          height="24pxs"
        ></search-icon>
      </div>
    </div>
    <paging
      :current-page="currentPage"
      :total-pages="totalPages"
      @next-page="nextPage"
      @last-page="lastPage"
      @go-to-page="goToPage"
    ></paging>
    <template v-if="items.length > 0">
      <div
        v-for="item of items"
        :key="item.id"
        @click.prevent="showDetail(item.Id)"
        class="item-container"
      >
        <hr class="solid" />
        <div class="list-item">
          <div v-if="enablePlaceholder">
            <div
            v-if="item.ImageGallery === null || item.ImageGallery.length === 0"
          >
            <div class="thumbnail">
              <PlaceholderGastro
                class="gastroSvg"
                viewBox="0 0 595.3 367.54"
                width="60px"
                height="60px"
                preserveAspectRatio="xMidYMid slice"
                v-if="item.ODHTags.find((x) => x.Id === 'gastronomy')"
              ></PlaceholderGastro>
              <PlaceholderActivity
                class="activitySvg"
                viewBox="0 0 595.3 367.54"
                width="60px"
                height="60px"
                preserveAspectRatio="xMidYMid slice"
                v-if="item.ODHTags.find((x) => x.Id === 'activity')"
              ></PlaceholderActivity>
              <POIPlaceholder
                class="poiSvg"
                viewBox="0 0 595.3 367.54"
                width="60px"
                height="60px"
                preserveAspectRatio="xMidYMid slice"
                v-if="item.ODHTags.find((x) => x.Id === 'poi')"
              ></POIPlaceholder>
            </div>
          </div>
          <div v-else>
            <img class="thumbnail" :src="item.ImageGallery[0].ImageUrl" />
          </div>
          </div>
         
          <div class="info">
            <div class="title">{{ getTitle(item, language) }}</div>
            <div v-if="contentType === 'Gastronomy'" class="short-info">
              {{ getODHActivityPoiShortInfo(item) }}
            </div>
            <div v-else-if="contentType === 'Activity'" class="short-info">
              {{ getODHActivityPoiShortInfo(item) }}
            </div>
            <div v-else-if="contentType === 'POI'" class="short-info">
              {{ getODHActivityPoiShortInfo(item) }}
            </div>
            <div v-else-if="contentType === 'ODHActivityPoi'" class="short-info">
              {{ getODHActivityPoiShortInfo(item) }}
            </div>
          </div>
          <div class="arrow-icon">
            <arrow-icon-right viewBox="0 0 24 24" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="isLoading" class="loading-spinner">
      <spinner></spinner>
    </div>
    <div class="noResult" v-else>{{ $t('noResults') }}</div>
    <div v-if="items.length === 1" class="item-container"></div>
    <div class="bottom-divider" v-if="items.length > 0">
      <hr class="solid" />
    </div>
    <div class="bottom-divider bottom-divider2" v-if="items.length > 1">
      <hr class="solid" />
    </div>
    <paging
      :current-page="currentPage"
      :total-pages="totalPages"
      @next-page="nextPage"
      @last-page="lastPage"
      @go-to-page="goToPage"
    ></paging>
  </div>
</template>

<script>
import { GastronomyApi, ODHActivityPoiApi } from '@/api';
import Paging from '@/components/Paging';
import ArrowIconRight from '@/assets/img/arrow_right.svg';
import PlaceholderGastro from '@/assets/img/gastro-placeholder.svg';
import PlaceholderActivity from '@/assets/img/Activity-Placeholder.svg';
import POIPlaceholder from '@/assets/img/POI-Placeholder.svg';
import Spinner from '@/components/Spinner';
import SearchIcon from '@/assets/img/ic_search.svg';

export default {
  components: {
    Spinner,
    Paging,
    ArrowIconRight,
    PlaceholderGastro,
    PlaceholderActivity,
    POIPlaceholder,
    SearchIcon,
  },
  props: {
    language: {
      type: String,
      default: 'en',
    },
    contentType: {
      type: String,
      //default: 'Activity',
    },
    contentIdList: {
      type: String,
      default: null,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    category: {
      type: String,
      default: null,
    },
    subcategory: {
      type: String,
      default: null,
    },
    locFilter: {
      type: String,
      default: null,
    },
    sourceFilter: {
      type: String,
      default: null,
    },
    currentPage: {
      type: Number,
      default: 1,
    },    
    withImageOnly: {
      type: Boolean,
      default: false,
    },
    enablePlaceholder: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      items: [],
      gastronomyTypes: [],
      activityTypes: [],
      odhactivitypoiTypes: [],
      totalPages: 0,
      isLoading: false,
      searchInput: '',
    };
  },
  created() {        this.loadODHActivityPoiList(this.currentPage);    
  },
  // computed: {
  //   placeholderImage() {
  //     if (this.contentType === 'Gastronomy') {
  //       return 'gastro';
  //     } else if (this.contentType === 'Activity') {
  //       return 'activity';
  //     } else {
  //       return 'poi';
  //     }
  //   },
  // },
  methods: {
    nextPage() {
      this.items = [];
      this.loadODHActivityPoiList(this.currentPage + 1);      
      this.$emit('change-current-page', this.currentPage + 1);
    },
    lastPage() {
      this.items = [];
      this.loadODHActivityPoiList(this.currentPage - 1);     
      this.$emit('change-current-page', this.currentPage - 1);
    },
    goToPage(pageNum) {
      this.items = [];
      this.loadODHActivityPoiList(pageNum);     
      this.$emit('change-current-page', pageNum);
    },
    showDetail(contentId) {
      this.$emit('show-detail', contentId);
    },
    searchODHActivityPoiList() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.loadODHActivityPoiList, 300, 1);
    },
    loadODHActivityPoiTypeList() {
      const odhactivityApi = new ODHActivityPoiApi();
      odhactivityApi
        .oDHActivityPoiGetAllODHActivityPoiTypesList()
        .then((value) => {
          this.odhactivitypoiTypes = value.data;
        });
    },
    loadODHActivityPoiList(pageNum) {
      this.isLoading = true;
      const odhactivityApi = new ODHActivityPoiApi();
      odhactivityApi
        .oDHActivityPoiGetODHActivityPoiList(
          pageNum,
          this.pageSize,
          this.category,
          this.subcategory,
          null,
          this.contentIdList,
          this.locFilter,
          this.language,
          null,
          null,
          this.sourceFilter,
          this.contentType != 'ODHActivityPoi' ? this.contentType.toLowerCase() : null,
          true,
          true,
          null,
          null,
          null,
          null,
          '',
          this.language,
          null,
          this.searchInput,
          this.withImageOnly ? 'in(ImageGallery.[*].License,"CC0")' : null,
          []
        )
        .then((value) => {
          this.items = value?.data?.Items ?? [];
          this.$emit('change-current-page', value?.data?.CurrentPage);
          this.totalPages = value?.data?.TotalPages;
          this.isLoading = false;
        });
    },
    loadGastronomyTypeList() {
      const gastronomyApi = new GastronomyApi();
      gastronomyApi.gastronomyGetAllGastronomyTypesList().then((value) => {
        this.gastronomyTypes = value.data;
      });
    },
    getODHActivityPoiShortInfo(item) {
      const shortInfo = [];
      shortInfo.push(...this.getODHActivityPoiTypes(item));
      //shortInfo.push(...this.getGastronomyTypes(item));
      shortInfo.push(this.getODHActivityPoiLocationInfo(item)); 
      if (item?.ContactInfos?.en?.Phonenumber) {
        const telephone =
          this.$t('phone') + ': ' + item.ContactInfos.en.Phonenumber;
        shortInfo.push(telephone);
      }
      if (item?.ContactInfos[this.language]?.Url) {
        const url = this.$t('web') + ': ' + item.ContactInfos[this.language]?.Url;
        shortInfo.push(url);
      }
      if (item?.Difficulty) {
        const difficulty = 'Difficulty: ' + item?.Difficulty;
        shortInfo.push(difficulty);
      }
      return shortInfo.filter((info) => info != null).join(', ');
    },
    getODHActivityPoiTypes(item) {      
      const categories = [];      
      
      if (item?.AdditionalPoiInfos[this.language]?.Categories){
        item?.AdditionalPoiInfos[this.language]?.Categories.forEach(
          categoryname => categories.push(categoryname)
          );        
      }
      return categories;
    },
    getODHActivityPoiLocationInfo(item) {      
      let municipality = "";
      let district = "";

      if (item?.LocationInfo?.MunicipalityInfo?.Name[this.language]) {
        municipality = item?.LocationInfo?.MunicipalityInfo?.Name[this.language];                       
      }     
      if (item?.LocationInfo?.DistrictInfo?.Name[this.language] ) {

        if(municipality != item?.LocationInfo?.DistrictInfo?.Name[this.language])
        district = ' - ' + item?.LocationInfo?.DistrictInfo?.Name[this.language];                
      }     

      const location =
          this.$t('location') + ': ' + municipality + district; 

      return location;
    },   
    // getGastronomyTypes(item) {
    //   const categoryCodeIds = item.CategoryCodes.map((code) =>
    //     this.gastronomyTypes.find((x) => x.Id === code.Id)
    //   );
    //   const categories = categoryCodeIds.map((category) => {
    //     if (this.language === 'de') {
    //       return category?.TypeDesc?.de ?? '-';
    //     } else if (this.language === 'it') {
    //       return category?.TypeDesc?.it ?? '-';
    //     } else {
    //       return category?.TypeDesc?.en ?? '-';
    //     }
    //   });
    //   return categories;
    // },    
    getActivityTypes(item) {
      let categoryCodeIds = item.ActivityTypes.map((code) =>
        this.activityTypes.find((x) => x.Id === code.Id)
      );
      categoryCodeIds = categoryCodeIds.filter(function (el) {
        return el != null;
      });
      const categories = categoryCodeIds.map((category) => {
        if (this.language === 'de') {
          return category?.TypeDesc?.de ?? '-';
        } else if (this.language === 'it') {
          return category?.TypeDesc?.it ?? '-';
        } else {
          return category?.TypeDesc?.en ?? '-';
        }
      });
      return categories;
    },
    getTitle(item, language) {
      return item?.Detail?.[language]?.Title ?? '';
    },
    getPoiTypes(item) {
      const poiType = item.AdditionalPoiInfos[this.language].MainType;
      const subType = item.AdditionalPoiInfos[this.language].SubType;
      const categories = [];
      if (poiType !== null) {
        categories.push(poiType);
      }
      if (subType !== null) {
        categories.push(subType);
      }
      return categories;
    },
  },
};
</script>
<style scoped lang="scss">
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
  background-color: #e8ecf1;
  object-fit: cover;
}

.poiSvg g {
  .a,
  .d {
    fill: none;
  }
  .b {
    fill: #e8ecf1;
  }
  .c {
    clip-path: url(#a);
  }
  .d {
    stroke: #fff;
    stroke-miterlimit: 10;
    stroke-width: 9px;
  }
  .e {
    fill: #fff;
  }
}

.gastroSvg g {
  .a,
  .e {
    fill: none;
  }
  .b {
    fill: #e8ecf1;
  }
  .c {
    clip-path: url(#a);
  }
  .d {
    fill: #fff;
  }
  .e {
    stroke: #fff;
    stroke-miterlimit: 10;
    stroke-width: 9px;
  }
}

.activitySvg g {
  .a {
    fill: #e8ecf1;
  }
  .b {
    fill: #fff;
  }
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 24px;
}

hr.solid {
  border-top: 1px solid #e8ecf1;
  margin: 8px 40px 8px 40px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.short-info {
  font-size: 14px;
  word-break: break-word;
  color: #888888;
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
  cursor: pointer;
}

.bottom-divider {
  width: 100%;
}

.bottom-divider2 {
  visibility: hidden;
}

@media (min-width: 768px) {
  .item-container {
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
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.noResult {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
}

.arrow-icon {
  min-height: 40px;
  min-width: 40px;
  max-height: 40px;
  max-width: 40px;
  display: flex;
}

input:focus {
  outline: none;
}

.search-bar {
  width: 100%;
  margin: 16px;
  display: flex;
  border: 1px solid #e8ecf1;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: none;
  flex-grow: 1;
}

.search-button {
  padding-top: 4px;
  padding-right: 20px;
  cursor: pointer;
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
}
</style>