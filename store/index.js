export const state = () => ({
  user: null,
  error: null,
  loading: false,
  jobDone: false
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setIsLoading(state, payload) {
    state.loading = payload;
  },
  setJobDone(state, payload) {
    state.jobDone = payload;
  }
};

export const actions = {
  signUpUser({ commit }, payload) {
    commit("setIsLoading", true);
    commit("clearError");
    let newUser = null;
    const db = this.$fireApp.firestore();
    this.$fireApp
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        newUser = data.user;
        return data.user.updateProfile({ name: payload.name }).then(() => {
          const authUser = {
            id: data.user.uid,
            email: data.user.email,
            name: data.user.name
          };
          commit("setUser", authUser);
          commit("setJobDone", true);
          commit("setIsLoading", false);
        });
      })
      .then(() => {
        let userRef = db.collection("users").doc(newUser.uid);
        return userRef.set({
          email: payload.email,
          name: payload.name,
          createdAt: new Date().toISOString()
        });
      })
      .catch(error => {
        commit("setIsLoading", false);
        commit("setError", error);
      });
  },

  loginUser({ commit }, payload) {
    commit("setIsLoading", true);
    commit("clearError");

    this.$fireApp
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        const authUser = {
          id: data.user.uid,
          email: data.user.email,
          name: data.user.displayName
        };
        commit("setUser", authUser);
        commit("setJobDone", true)
        commit("setIsLoading", false);
      })
      .catch(error => {
        commit("setBusy", false);
        commit("setError", error);
      })


  }
};

export const getters = {
  user(state) {
    return state.user;
  },
  loginStatus(state) {
    return state.user !== null && state.user !== undefined;
  },
  error(state) {
    return state.error;
  },
  loading(state) {
    return state.loading;
  },
  jobDone(state) {
    return state.jobDone;
  }
};