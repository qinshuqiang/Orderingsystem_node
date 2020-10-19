<template>
  <div class="login">
    <div class="login-title">欢迎来到广州名媛点餐系统</div>
    <div class="login-username">
      <aboutInput
        name="用户名"
        typeName="username"
        :value="username"
        @set-val="setVal"
      ></aboutInput>
    </div>
    <div class="login-username">
      <aboutInput
        name="密码"
        typeName="password"
        type="password"
        :value="password"
        @set-val="setVal"
      ></aboutInput>
    </div>
    <div><button @click="submit">确认提交</button><button @click="registered">注册</button></div>
  </div>
</template>

<script>
import aboutInput from "@/components/aboutInput";
export default {
  name: "login",
  components: { aboutInput },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    setVal(e) {
      this[e.typeName] = e.value;
    },
    registered(){
      let { username, password } = this;

      this.post("user/registered", {
        userName: username,
        passWorld: password,
      }).then((res) => {
        if (!res.data.status) {
          alert("注册成功")
        } else {
          alert(res.data.errMsg);
        }
      });
    },
    submit() {
      let { username, password } = this;
      this.post("user/login", {
        userName: username,
        passWorld: password,
      }).then((res) => {
        if (!res.data.status) {
          localStorage.setItem('username',username)
          this.$router.push({ path: '/main'})
        } else {
          alert(res.data.errMsg);
        }
      });
    },
  },
};
</script>
<style scoped>
.login-title {
  font-size: 5vw;
  font-weight: 600;
}
.login-username {
  width: 30vw;
  height: 3vw;
  margin: 0 auto;
  margin-top: 20px;
}
button{
margin: 0 55px;
}
</style>
