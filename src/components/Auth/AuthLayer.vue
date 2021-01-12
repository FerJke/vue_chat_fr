<template>
  <div class="auth-layer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthLayer',
};
</script>

<style lang="scss" scoped>
.auth-layer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  background: #c7e8ff url('../../assets/login-bg.jpg') no-repeat center center;
  background-size: cover;
  overflow-y: auto;
}
</style>
