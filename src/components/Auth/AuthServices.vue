<template>
  <div class="auth-services">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthServices',
};
</script>

<style lang="scss" scoped>
.auth-services {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
</style>
