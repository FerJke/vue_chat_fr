<template>
  <AuthLayer>
    <ElForm
      class="auth-form"
      :model="regForm"
      :rules="rules"
      ref="regForm"
      @submit.native.prevent="onSubmit('regForm')"
    >
      <h3 class="auth-form__title">Registration</h3>
      <ElFormItem label="Email:" prop="email">
        <ElInput v-model="regForm.email" auto-complete="false" />
      </ElFormItem>
      <ElFormItem label="Password:" prop="password">
        <ElInput type="password" v-model="regForm.password" auto-complete="false" />
      </ElFormItem>
      <ElFormItem label="Confirm password:" prop="confirmPassword">
        <ElInput type="password" v-model="regForm.confirmPassword" auto-complete="false" />
      </ElFormItem>
      <ElFormItem>
        <ElButton
          type="primary"
          plain
          :loading="isLoading"
          native-type="submit"
        >Registration</ElButton>
      </ElFormItem>
      <AuthServices>
          <router-link to="/login">Have an account?</router-link>
        </AuthServices>
    </ElForm>
  </AuthLayer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AuthLayer from '@/components/Auth/AuthLayer.vue';
import AuthServices from '@/components/Auth/AuthServices.vue';

export default {
  name: 'Registration',
  components: {
    AuthLayer,
    AuthServices,
  },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.regForm.password) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };

    return {
      regForm: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          {
            min: 6, max: 22, message: 'Length should be 6 to 22', trigger: 'blur',
          },
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPassword, trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters('authStore', ['getLoginLoader', 'getUserAuth']),
    isLoading() {
      return this.loginLoader;
    },
  },
  watch: {
    getUserAuth: 'redirectToProfile',
  },
  methods: {
    ...mapActions('authStore', ['registration']),
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;

        this.registration({
          email: this.regForm.email,
          password: this.regForm.password,
        });
      });
    },
    redirectToProfile(val) {
      if (val) {
        this.$router.push({ name: 'Profile' });
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
