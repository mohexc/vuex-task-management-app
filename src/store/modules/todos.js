
import axios from "axios"

const state = {
  todos: [],
  isLoading: false,
}

const getters = {
  allTodos: (state) => state.todos,
  isLoading: (state) => state.isLoading
}

const actions = {
  async fetchTodos({ commit }) {
    try {
      commit('setLoading', true)
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
      commit('setTodos', data)
      commit('setLoading', false)
    } catch (error) {
      console.log('fetchTodos: Error', error.message)
    }
  },

  async addTodo({ commit }, title) {
    try {
      commit('setLoading', true)
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, commit: false })
      commit('newTodo', data)
      commit('setLoading', false)
    } catch (error) {
      console.log('addTodo: Error', error.message)
    }
  },

  async deleteTodo({ commit }, id) {
    try {
      commit('setLoading', true)
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      commit('removeTodo', id)
      commit('setLoading', false)
    } catch (error) {
      console.log('deleteTodo: Error', error.message)
    }
  },

  async filterTodos({ commit }, e) {
    try {
      commit('setLoading', true)
      const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      commit('setTodos', data)
      commit('setLoading', false)
    } catch (error) {
      console.log('filterTodos: Error', error.message)
    }
  },

  async updateTodo({ commit }, updateTodo) {
    try {
      commit('setLoading', true)
      commit('updateTodo', updateTodo)
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`)
      commit('setLoading', false)
    } catch (error) {
      console.log('updateTodo: Error', error.message)
    }
  }
}

const mutations = {
  setLoading: (state, value) => state.isLoading = value,

  setTodos: (state, todos) => (state.todos = todos),

  newTodo: (state, todo) => (state.todos.unshift(todo)),

  removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),

  updateTodo: (state, updateTodo) => {
    const foundIndex = state.todos.findIndex(todo => todo.id === updateTodo.id)
    if (foundIndex !== -1) {
      state.todos.splice(foundIndex, 1, updateTodo)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}