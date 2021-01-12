<template>
  <div class="chat-panel">
    <Avatar
      :content="userName"
      :width="50"
      :height="50"
      fColor="#fff"
      :fSize="18"
      :fWeight="600"
      bgColor="#8ba1ff"
    />
    <div class="chat-panel__form">
      <ElForm
        :inline="true"
        :model="chatForm"
        :rules="rules"
        ref="chatForm"
        @submit.native.prevent="onSubmit('chatForm')"
      >
        <ElFormItem prop="message">
          <ElInput
            type="textarea"
            v-model="chatForm.message"
            @input="typingMessage"
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton native-type="submit">Send</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'ChatPanel',
  components: {
    Avatar,
  },
  data: () => ({
    chatForm: {
      message: '',
    },
    rules: {
      message: [
        { required: true, message: 'Please input message', trigger: 'blur' },
        {
          min: 1, max: 2000, message: 'Length should be 1 to 2000', trigger: 'blur',
        },
      ],
    },
  }),
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('chats', ['getSelectedChatId']),
    userName() {
      return this.getUser.firstName.slice(0, 1).toUpperCase();
    },
  },
  methods: {
    typingMessage() {
      this.$emit('typing-message');
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;

        this.$emit('submit-message', this.chatForm.message);
      });
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-panel {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;

  &__form {
    display: flex;
    flex-grow: 1;
    padding-left: 20px;
  }

  &::v-deep {
    .el-form--inline {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .el-form-item {
      margin: 0;

      &:first-of-type {
        flex-grow: 1;
        margin-right: 10px;
      }
    }

    .el-form-item__content {
      width: 100%;
    }

    textarea {
      resize: none;
    }
  }
}
</style>
