<template>
  <AuthLayer>
    <div class="c-container">
      <ElForm
        class="auth-form"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        @submit.native.prevent="onSubmit('loginForm')"
      >
        <h3 class="auth-form__title">Sign In</h3>
        <ElFormItem label="Login:" prop="login">
          <ElInput v-model="loginForm.login" auto-complete="false" />
        </ElFormItem>
        <ElFormItem label="Password:" prop="password">
          <ElInput type="password" v-model="loginForm.password" auto-complete="false" />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            plain
            :loading="isLoading"
            native-type="submit"
          >Sing in</ElButton>
        </ElFormItem>
        <AuthServices>
          <router-link to="/registration">Don't have an account?</router-link>
          <router-link to="/forgot-password">Forgot password?</router-link>
        </AuthServices>
      </ElForm>
    </div>
  </AuthLayer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AuthLayer from '@/components/Auth/AuthLayer.vue';
import AuthServices from '@/components/Auth/AuthServices.vue';

export default {
  name: 'Login',
  components: {
    AuthLayer,
    AuthServices,
  },
  data: () => ({
    loginForm: {
      login: '',
      password: '',
    },
    rules: {
      login: [
        { required: true, message: 'Please input correct Email', trigger: 'blur' },
      ],
      password: [
        {
          required: true, min: 6, max: 22, message: 'Minimal length is 6', trigger: 'blur',
        },
      ],
    },
  }),
  computed: {
    ...mapGetters('authStore', ['getLoginLoader', 'getUserAuth']),
    isLoading() {
      return this.getLoginLoader;
    },
  },
  watch: {
    getUserAuth: 'redirectToHome',
  },
  methods: {
    ...mapActions('authStore', ['login']),
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;

        this.login({
          email: this.loginForm.login,
          password: this.loginForm.password,
        });
      });
    },
    redirectToHome(val) {
      if (val) {
        this.$router.push({ name: 'Home' });
      }
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
