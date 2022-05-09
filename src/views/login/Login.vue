<script setup lang="ts">
import { reactive, ref } from "vue";
import { useEncrypt } from "./Hooks";
import { GetVertifyCode, Login } from "@/https/login/Login";
import { useFormSubmit, useRequest } from "@/mixins/Hooks";
import { VertifyCodeI, LoginResponseI, LoginParamsI } from "@/https/login/Type";
import { useRouter } from "vue-router";
import { TokenHandler } from "@/mixins/TokenUtil";
import { useStore } from "@/store";

const form = reactive({
  account: "",
  password: "",
  verificationCode: "",
});
const loginForm = ref<any>(null);
const rules = reactive({
  account: [{ required: true, message: "请输入登录名" }],
  password: [{ required: true, message: "请输入密码" }],
  verificationCode: [{ required: true, message: "请输入验证码" }],
});
const router = useRouter();
const store = useStore();

// 请求验证码
const { data, run: _GetVertifyCode } = useRequest<VertifyCodeI>(GetVertifyCode, {
  randomCodeFlag: "",
  imageBase64: "",
});
// 登录方法
const { submit: login, loading: btnLoading } = useFormSubmit<
  LoginResponseI,
  LoginParamsI
>(Login, { loading: "正在登录", success: "登录成功！", error: "登录失败！" });

const submitHandle = () => {
  loginForm.value!.validate(async (valid: boolean) => {
    if (valid) {
      const { encryptPassword } = await useEncrypt(form.password);
      const params = {
        account: form.account,
        password: encryptPassword.value,
        verificationCode: form.verificationCode,
        verificationCodeFlag: data.value!.randomCodeFlag,
      };
      try {
        const res = await login(params);
        TokenHandler.setToken(res.data.jsonWebToken);
        // 保存用户信息到本地
        store.commit("user/setUserInfo", res.data.user);
        router.push("/home");
      } catch {
        // 重新刷新验证码
        _GetVertifyCode();
      }
    } else {
      return false;
    }
  });
};
</script>

<template>
  <div class="loginPage flexRowCenter">
    <div class="loginContent">
      <el-form
        ref="loginForm"
        :model="form"
        label-width="120px"
        :rules="rules"
        @keydown.enter="submitHandle"
      >
        <el-form-item label="登录名" prop="account">
          <el-input clearable size="medium" v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            clearable
            size="medium"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-row>
            <el-col :span="20">
              <el-input
                clearable
                size="medium"
                v-model="form.verificationCode"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-image
                @click="_GetVertifyCode"
                class="validateImage"
                :src="data.imageBase64"
                fit="fill"
              ></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="submitHandle"
            :loading="btnLoading"
            style="width: 100%"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginPage {
  height: 100vh;
  background: #475164 url("@/assets/images/texture.png");
}
.loginContent {
  margin-top: 10%;
  width: 30vw;
  padding: 10px;
}
:deep(.el-form-item label) {
  color: white;
}
.validateImage {
  height: 36px;
  width: 100%;
}
</style>
