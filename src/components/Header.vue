<template>
  <header class="header">
    <div class="c-container header-content">
      <nav class="header-nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
      </nav>
      <template v-if="getUserAuth">
        <ElDropdown split-button>
          {{ userName }}
          <ElDropdownMenu slot="dropdown">
            <ElDropdownItem>
              <router-link :to="{ name: 'Profile' }">Profile</router-link>
            </ElDropdownItem>
            <ElDropdownItem>
              <ElButton type="warning" size="mini" @click="logOutHandler">LogOut</ElButton>
            </ElDropdownItem>
          </ElDropdownMenu>
        </ElDropdown>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { logOut } from '@/services/firebase/auth';

export default {
  name: 'Header',
  data: () => ({
    userName: null,
    isAuth: false,
  }),
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('authStore', ['getUserAuth']),
  },
  watch: {
    getUser: 'checkUserName',
  },
  methods: {
    async logOutHandler() {
      await logOut();
      this.$router.push({ name: 'Login' });
    },
    checkUserName() {
      this.userName = this.getUser ? this.getUser.firstName : 'User';
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px 0;
  background: #131719;
}
.header-content {
  display: flex;
  justify-content: space-between;
}
</style>
