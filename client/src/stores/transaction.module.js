import TransactionService from "../services/transaction.service";

const initialState = { status: false, data: null, limit: 10 };

export const transaction = {
  namespaced: true,
  state: initialState,
  actions: {
    getData({ commit }, { limit }) {
      return TransactionService.listDataTable(limit).then(
        (data) => {
          commit("getDataSuscess", { data: data, limit: limit });
          return Promise.resolve(data);
        },
        (error) => {
          commit("getDataSuscess");
          return Promise.reject(error);
        }
      );
    },
    getDataOnPendding({ dispatch, state }) {
      dispatch("getData", { limit: state?.limit });
    },
    setSelection({ commit, dispatch, state }, data) {
      console.log(state);
      return TransactionService.setSelection(data).then(
        (data) => {
          dispatch("auth/reloadUser", null, { root: true });
          dispatch("getData", { limit: state?.limit });
          return Promise.resolve(data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    getDataSuscess(state, data) {
      state.status = true;
      state.data = data?.data;
      state.limit = data?.limit;
    },
    loginFailure(state) {
      state.status = false;
      state.data = null;
    },
  },
};
