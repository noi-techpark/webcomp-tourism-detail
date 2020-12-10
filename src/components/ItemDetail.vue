<template>
  <div>
    <h2>Detail</h2>
    <a v-if="isListAvailable" href @click.prevent="close">close</a><br />
    <p>Content Id: {{ contentId }}</p>
  </div>
</template>

<script>
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
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
