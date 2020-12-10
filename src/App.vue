<template>
  <div id="app">
    <item-detail
      v-if="detailContentId"
      :content-id="detailContentId"
      :is-list-available="islistAvailable"
      @close="closeDetail"
    />
    <items-list v-else @show-detail="showDetail" />
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
    contentIdList: {
      type: String,
      default: '1,2,3',
    },
  },
  data() {
    return {
      detailContentId: null,
    };
  },
  computed: {
    contentIds() {
      return this.contentIdList.split(',');
    },
    islistAvailable() {
      return this.contentIds.length > 1;
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
