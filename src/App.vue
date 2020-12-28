<template>
  <div id="app">
    <item-detail
        v-if="detailContentId"
        :content-id="detailContentId"
        :is-list-available="islistAvailable"
        :content-type="contentType"
        :language="language"
        @close="closeDetail"
    />
    <items-list v-else @show-detail="showDetail" @change-current-page="changeCurrentPage" :language="language" :contentType="contentType"
                :contentIdList="contentIdList" :pageSize="pageSize" :category="category" :currentPage="currentPage"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemsList from './components/ItemsList.vue';
import ItemDetail from './components/ItemDetail.vue';
export default Vue.extend({
  components: {
    ItemsList,
    ItemDetail,
  },
  props: {
    contentType: {
      type: String,
      default: 'Gastronomy'
    },
    contentIdList: {
      type: String,
      default: "GASTROA7D574DE766311D3A84700104BE4ECF9,GASTRO4BD454B678F397F407538C59D54920D4",
    },
    category: {
      type: String,
      default: null
    },
    language: {
      type: String,
      default: 'en'
    },
    pageSize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      detailContentId: null,
      currentPage: 1
    };
  },
  computed: {
    contentIds() {
      return this.contentIdList !== null ? this.contentIdList.split(',') : [];
    },
    islistAvailable() {
      return this.contentIds.length != 1;
    },
  },
  watch: {
    language: {
      immediate: true,
      handler(value) {
        this.$i18n.locale = value;
      },
    },
  },
  created() {
    if (!this.islistAvailable) {
      this.detailContentId = this.contentIds[0];
    }
  },
  methods: {
    showDetail(detailContentId) {
      this.detailContentId = detailContentId;
    },
    closeDetail() {
      this.detailContentId = null;
    },
    changeCurrentPage(pageNum) {
      this.currentPage = pageNum;
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>