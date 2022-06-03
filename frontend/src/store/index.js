import { createStore } from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

function httpRequest (method, url, data, headers) {
  return axios({ method, url, data, headers })
}

export default createStore({
  state: {
    user: {},
    viewedUser: {},
    tweets: [],
    follower: []
  },
  getters: {
    getUser: ({ user }) => user,
    getTweets ({ tweets }) {
      if (Array.isArray(tweets)) {
        tweets.forEach(tweet => { tweet.key = tweet._id + tweet.updatedAt })
      }
      return tweets
    },
    getViewedUser: ({ viewedUser }) => viewedUser
  },
  mutations: {
    SET_TWEETS (state, payload) { state.tweets = payload },
    SET_USER (state, payload) { state.user = payload },
    SET_VIEWED_USER (state, payload) {
      payload.tweets.forEach(tweet => { tweet.key = tweet._id + tweet.updatedAt })
      state.viewedUser = payload
    },
    SET_USER_FOLLOWER (state, payload) { state.user.follower = payload },
    SET_USER_FOLLOWING (state, payload) { state.user.following = payload },
    SET_VIEWED_USER_FOLLOWER (state, payload) { state.viewedUser.follower = payload },
    SET_VIEWED_USER_FOLLOWING (state, payload) { state.viewedUser.following = payload },
    ADD_TWEET (state, payload) { state.tweets.splice(0, 0, payload) }
  },
  actions: {
    async reset ({ commit }) {
      try {
        await httpRequest('get', '/reset')
        window.location.href = '/'
      } catch (err) {
        console.error(err)
      }
    },
    async testAccount ({ commit }) {
      try {
        commit('SET_USER', (await httpRequest('get', '/test-account')).data)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchTweets ({ commit }) {
      try {
        commit('SET_TWEETS', (await httpRequest('get', '/tweets')).data)
      } catch (err) {
        console.error(err)
      }
    },
    async userVerification ({ commit }) {
      try {
        const user = (await httpRequest('get', '/current-user')).data
        commit('SET_USER', user)
      } catch (err) {
        commit('SET_USER', {})
      }
    },
    async login ({ commit }, userData) {
      try {
        const { token, user, session_duration: sessionDuration } = (await httpRequest('post', '/login', userData)).data
        commit('SET_USER', user)
        return { token, sessionDuration }
      } catch (err) {
        commit('SET_USER', {})
      }
    },
    async register ({ commit }, userData) {
      try {
        const { token, user, session_duration: sessionDuration } = (await httpRequest('post', '/register', userData)).data
        commit('SET_USER', user)
        return { token, sessionDuration }
      } catch (err) {
        commit('SET_USER', {})
      }
    },
    async createTweet ({ commit }, tweetData) {
      try {
        const tweet = (await httpRequest('post', '/tweet', tweetData)).data
        commit('ADD_TWEET', tweet)
      } catch (err) {
        console.error(err)
      }
    },
    async likeTweet ({ commit }, id) {
      try {
        httpRequest('put', `/like?id=${id}`)
      } catch (err) {
        console.error(err)
      }
    },
    async removeTweetLike ({ commit }, id) {
      try {
        httpRequest('delete', `/like?id=${id}`)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchViewedUser ({ commit }) {
      try {
        const username = window.location.pathname
        const viewedUser = (await httpRequest('get', `${username}`)).data
        commit('SET_VIEWED_USER', viewedUser)
      } catch (err) {
        console.error(err)
      }
    },
    async followUser ({ commit }, id) {
      try {
        const { follower, user } = (await httpRequest('put', `/follow?user=${id}`)).data
        commit('SET_USER_FOLLOWING', follower.following)
        commit('SET_USER_FOLLOWER', follower.follower)
        commit('SET_VIEWED_USER_FOLLOWING', user.following)
        commit('SET_VIEWED_USER_FOLLOWER', user.follower)
      } catch (err) {
        console.error(err)
      }
    },
    async unfollowUser ({ commit }, id) {
      try {
        const { follower, user } = (await httpRequest('delete', `/follow?user=${id}`)).data
        commit('SET_USER_FOLLOWING', follower.following)
        commit('SET_USER_FOLLOWER', follower.follower)
        commit('SET_VIEWED_USER_FOLLOWING', user.following)
        commit('SET_VIEWED_USER_FOLLOWER', user.follower)
      } catch (err) {
        console.error(err)
      }
    }
  },
  modules: {
  }
})
