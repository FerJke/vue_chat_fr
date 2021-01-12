<template>
  <div class="profile-wrapper">
    <div class="profile-form-wrapper">
      <ElForm
        :model="profileForm"
        :rules="rules"
        ref="profileForm"
        @submit.native.prevent="onSubmit('profileForm')"
      >
        <h3 class="profile-title">Profile</h3>
        <ElFormItem label="Firt name:" prop="firstName">
          <ElInput v-model="profileForm.firstName" />
        </ElFormItem>

        <ElFormItem label="Last name:" prop="lastName">
          <ElInput v-model="profileForm.lastName" />
        </ElFormItem>

        <ElFormItem label="Country:" prop="country">
          <ElInput v-model="profileForm.country" />
        </ElFormItem>

        <ElFormItem label="City:" prop="city">
          <ElInput v-model="profileForm.city" />
        </ElFormItem>

        <AuthServices>
          <ElButton
            type="primary"
            native-type="submit"
            :loading=isLoading
          >
            Send
          </ElButton>
        </AuthServices>
      </ElForm>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthServices from '@/components/Auth/AuthServices.vue';

export default {
  name: 'Profile',
  components: {
    AuthServices,
  },
  data: () => ({
    profileForm: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
    },
    rules: {
      firstName: [
        { required: true, message: 'Please input First name', trigger: 'blur' },
      ],
      lastName: [
        { required: true, message: 'Please input Last name', trigger: 'blur' },
      ],
      country: [
        { required: true, message: 'Please input your country', trigger: 'blur' },
      ],
      city: [
        { required: true, message: 'Please input your city', trigger: 'blur' },
      ],
    },
  }),
  computed: {
    ...mapGetters('user', ['getIsLoading', 'getUser']),
    isLoading() {
      return this.getIsLoading;
    },
    userData() {
      return this.getUser;
    },
  },
  watch: {
    getUser: 'userDataHandler',
  },
  methods: {
    ...mapActions('user', ['crateUserInfo', 'updateUserInfo']),
    userDataHandler() {
      const {
        firstName,
        lastName,
        country,
        city,
      } = this.getUser || {};

      this.profileForm.firstName = firstName;
      this.profileForm.lastName = lastName;
      this.profileForm.country = country;
      this.profileForm.city = city;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return false;

        if (this.userData) {
          await this.updateUserInfo(this.profileForm);
        } else {
          await this.crateUserInfo(this.profileForm);
        }
      });
    },
  },
  mounted() {
    this.userDataHandler();
  },
};
</script>

<style lang="scss" scoped>
.profile-wrapper {
  background-color: #f7faff;
}
.profile-form-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 480px;
}
.profile-title {
  margin-bottom: 40px;
  font-size: 28px;
  letter-spacing: 0.2px;
  text-align: center;
}
</style>
