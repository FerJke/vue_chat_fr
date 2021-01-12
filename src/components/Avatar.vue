<template>
  <div class="avatar" :style="stylesObj">
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    width: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 40,
    },
    fColor: {
      type: String,
      default: '#000',
    },
    fSize: {
      type: Number,
      default: 16,
    },
    fWeight: {
      type: Number,
      default: 400,
    },
    bgColor: {
      type: String,
      default: '#eee',
    },
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    stylesObj() {
      return {
        minWidth: `${this.width}px`,
        minHeight: `${this.height}px`,
        maxWidth: `${this.width}px`,
        maxHeight: `${this.height}px`,
        color: this.fColor,
        fontSize: `${this.fSize}px`,
        fontWeight: this.fWeight,
        backgroundColor: this.bgColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
}
</style>
