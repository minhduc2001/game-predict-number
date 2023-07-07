import { createStore } from "vuex";
import { auth } from "./auth.module";
import { session } from "./session.module";
import { transaction } from "./transaction.module";

const store = createStore({
  modules: {
    auth,
    session,
    transaction,
  },
});

export default store;
