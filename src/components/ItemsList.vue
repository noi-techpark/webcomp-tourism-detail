<template>
  <div>
    <h2>List</h2>
    <ul>
      <li v-for="item of items" :key="item.id">
        <a href @click.prevent="showDetail(item.id)">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: '1',
          name: 'Item 1',
        },
        {
          id: '2',
          name: 'Item 2',
        },
        {
          id: '3',
          name: 'Item 3',
        },
      ],
    };
  },
  methods: {
    showDetail(contentId) {
      this.$emit('show-detail', contentId);
    },
  },
};
</script>
