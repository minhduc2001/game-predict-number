<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">CLTX</span>
          <img class="h-auto w-[150px]" src="../assets/logo.png" alt="logo" />
        </a>
      </div>

      <PopoverGroup v-if="currentUser" class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Trang chủ</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Nạp Xu</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Rút Xu</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Biến động số dư</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Lịch sử</a
        >
      </PopoverGroup>
      <PopoverGroup v-else class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Trang chủ</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Lịch sử</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
          >Đăng ký</a
        >
      </PopoverGroup>
      <div
        v-if="currentUser"
        class="hidden lg:flex lg:flex-1 lg:justify-end items-center"
      >
        <v-avatar
          class="mr-2"
          image="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/kamisato_ayaka/image.png?strip=all&quality=100&w=160"
        ></v-avatar>
        <a
          href="#"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="logOut"
          >Log out <span aria-hidden="true">&rarr;</span></a
        >
      </div>

      <div v-else class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/login" class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></a
        >
      </div>
    </nav>
  </header>
</template>

<script>
import { PopoverGroup } from "@headlessui/vue";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut(e) {
      this.$store.dispatch("auth/logout");
      // this.$router.push("/");
    },
  },
  mounted() {
    this.$store.dispatch("auth/reloadUser");
  },
  beforeUnmount() {
    // EventBus.remove("logout");
  },
};
</script>
