import { reactive } from "vue";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000";

// export const socket = io(URL);
