export const state = () => ({
  snackbar: "",
  position: null,
  color: null,
  timeout: null,
});

export const getters = {
  snackbar: (state) => state.snackbar,
};

export const actions = {
  setSnackbar(context, payload) {
    context.commit("setSnackbarHandler", payload);
  },
};
export const mutations = {
  setSnackbarHandler(state, snackbar) {
    state.snackbar = snackbar;
  },
};
