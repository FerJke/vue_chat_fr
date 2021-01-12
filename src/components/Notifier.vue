<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notifier',
  computed: {
    ...mapGetters(['getLastMessage']),
  },
  watch: {
    getLastMessage: 'showMessage',
  },
  methods: {
    showMessage(value) {
      this.$message({ ...value });
    },
  },
};
</script>
