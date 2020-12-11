const state =  {
  formJson: '',
}

const mutations = {
  SET_FORM_JSON: (state, formJson) => {
    state.formJson = formJson
  }
}

const actions = {
  // 用户登录
  setFormJson({ commit }, formJson) {
    commit('SET_FORM_JSON', formJson)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

