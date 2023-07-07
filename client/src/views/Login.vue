<template>
  <div>
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-gray-900"
          style="background-size: 100%; background-repeat: no-repeat"
          :style="{
            'background-image':
              'url(https://wallpapers.com/images/hd/inazuma-genshin-7rrz1oc9p6t9gqon.jpg)',
          }"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                  <div class="btn-wrapper text-center">
                    <button
                      class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="../assets/images/github.png"
                        width="30px"
                      />Github</button
                    ><button
                      class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                      type="button"
                      style="transition: all 0.15s ease 0s"
                    >
                      <img
                        alt="..."
                        class="w-5 mr-1"
                        src="../assets/images/google.png"
                        width="30px"
                      />Google
                    </button>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-gray-500 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form @submit="handleLoginSubmit">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><input
                        type="email"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style="transition: all 0.15s ease 0s"
                        v-model="email"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><input
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s"
                        v-model="password"
                        required
                      />
                    </div>
                    <div>
                      <label class="inline-flex items-center cursor-pointer"
                        ><input
                          id="customCheckLogin"
                          type="checkbox"
                          class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                          style="transition: all 0.15s ease 0s"
                          v-model="rememberMe"
                        /><span class="ml-2 text-sm font-semibold text-gray-700"
                          >Remember me</span
                        ></label
                      >
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style="transition: all 0.15s ease 0s"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="flex flex-wrap mt-6 mx-2">
                    <div class="w-1/2">
                      <a href="#" class="text-black-300"
                        ><small>Forgot password?</small></a
                      >
                    </div>
                    <div class="w-1/2 text-right">
                      <router-link to="/register" class="text-black-300"
                        ><small
                          >Create new account
                          <span aria-hidden="true">&rarr;</span>
                        </small></router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import authService from "../services/auth.service";
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.autoLogin();
  },
  methods: {
    handleRememberMe() {
      let rememberMe = false;
      if (this.rememberMe == fasle) rememberMe = true;
      this.rememberMe = rememberMe;
    },
    loadData() {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      if (email && password) {
        this.email = email;
        this.password = password;
        this.rememberMe = true;
      }
    },
    saveLoginCredentials() {
      if (this.rememberMe) {
        localStorage.setItem("email", this.email);
        localStorage.setItem("password", this.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    },
    autoLogin() {
      if (this.email && this.password) {
        // this.login(this.email, this.password);
      }
    },
    async login() {
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.hasOwnProperty("id")) {
            this.$router.push("/");
          } else {
            this.toast.error(res);
          }
        });
    },
    handleLoginSubmit(event) {
      event.preventDefault();
      this.saveLoginCredentials();
      this.login();
    },
  },
};
</script>
