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
    <items-list
      v-else
      @show-detail="showDetail"
      @change-current-page="changeCurrentPage"
      :language="language"
      :contentType="contentType"
      :contentIdList="contentIdList"
      :pageSize="pageSize"
      :category="category"
      :currentPage="currentPage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemsList from './components/ItemsList.vue';
import ItemDetail from './components/ItemDetail.vue';
import VueI18n from 'vue-i18n';

import messagesEn from '@/assets/locales/en.json';
import messagesDe from '@/assets/locales/de.json';
import messagesIt from '@/assets/locales/it.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en: messagesEn,
    de: messagesDe,
    it: messagesIt,
  },
});

export default Vue.extend({
  i18n,
  components: {
    ItemsList,
    ItemDetail,
  },
  props: {
    contentType: {
      type: String,
      default: 'Activity',
    },
    contentIdList: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: 'de',
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      detailContentId: null,
      currentPage: 1,
    };
  },
  computed: {
    contentIds() {
      return this.contentIdList !== null
        ? this.contentIdList.split(',').filter((e) => e)
        : [];
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
    },
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
