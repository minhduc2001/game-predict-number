import SessionService from "../services/session.service";

const initialState = { disabledInput: false, cl: [], tx: [] };

export const session = {
  namespaced: true,
  state: initialState,
  actions: {
    getCLTX({ commit }) {
      return SessionService.getCLTX().then(
        (data) => {
          console.log(data);
          commit("getCLTXSuccess", data);
          return Promise.resolve(data);
        },
        (error) => {
          commit("getCLTXFail");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    disable() {
      initialState.disabledInput = !initialState.disabledInput;
    },
    getCLTXSuccess(state, data) {
      state.cl = data.cl;
      state.tx = data.tx;
    },
    getCLTXFail() {},
  },
};
