<template>
  <AuthLayer>
    <div class="c-container">
      <ElForm
        class="auth-form"
        :model="forgotForm"
        :rules="rules"
        ref="forgotForm"
        @submit.native.prevent="onSubmit('forgotForm')"
      >
        <h3 class="auth-form__title">Forgot password?</h3>
        <ElFormItem label="Email:" prop="email">
          <ElInput v-model="forgotForm.email" auto-complete="false" />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            plain
            :loading="isLoading"
            native-type="submit"
          >Restore</ElButton>
        </ElFormItem>
        <AuthServices>
          <router-link to="/login">Have an account?</router-link>
        </AuthServices>
      </ElForm>
    </div>
  </AuthLayer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthLayer from '@/components/Auth/AuthLayer.vue';
import AuthServices from '@/components/Auth/AuthServices.vue';

export default {
  name: 'ForgotPassword',
  components: {
    AuthLayer,
    AuthServices,
  },
  data: () => ({
    forgotForm: {
      email: '',
    },
    rules: {
      email: [
        { required: true, message: 'Please input Email', trigger: 'blur' },
      ],
    },
  }),
  computed: {
    ...mapGetters('authStore', ['getLoginLoader']),
    isLoading() {
      return this.getLoginLoader;
    },
  },
  methods: {
    ...mapActions('authStore', ['forgotPassword']),
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;

        this.forgotPassword(this.forgotForm.email);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-container {
  margin: auto;
}
.auth-form {
  margin: 0 auto;
  width: 100%;
  max-width: 540px;
  padding: 30px 25px;
  border-radius: 6px;
  background: rgba(255,255,255, 0.95);
  box-shadow: 0 0 10px 3px rgba(0,0,0, 0.15);

  & ::v-deep .el-form-item__label {
    line-height: 1.5;
  }
}
.auth-form__title {
  margin: 0 0 25px;
  color: #2b2b2b;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
}
</style>
