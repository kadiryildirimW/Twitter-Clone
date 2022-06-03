<script>
import { mapActions, mapGetters } from 'vuex'
import Tweet from '@/components/Tweet'

export default {
  name: 'HomeView',
  components: {
    Tweet
  },
  computed: {
    ...mapGetters({
      tweets: 'getTweets',
      user: 'getUser'
    })
  },
  data () {
    return {
      content: '',
      editorReady: true
    }
  },
  methods: {
    ...mapActions(['fetchTweets', 'createTweet']),
    editablecontent (event) {
      this.content = event.target.innerHTML
    },
    async tweet () {
      const editor = this.$refs.tweetEditor
      if (!editor.innerText) {
        return
      }
      try {
        this.editorReady = false
        await this.createTweet({ content: this.content })
        editor.innerHTML = ''
      } catch (err) {
        console.error(err)
      } finally {
        this.editorReady = true
      }
    }
  },
  created () {
    this.fetchTweets()
  }
}
</script>

<template>
  <div class="home">
    <div class="navigator">
      <span>Home</span>
    </div>
    <div class="tweet-creator">
      <div class="left">
        <div class="avatar">
          <router-link v-if="user.username" :to="user.username">
            <img :src="user.profilePicture">
          </router-link>
        </div>
      </div>
      <div class="right">
        <div contenteditable="true" @input="editablecontent" class="content" placeholder="What's happening?" ref="tweetEditor"></div>
        <span class="tweet-button-container" @click="tweet">
          <button class="tweet-button" :disabled="!editorReady">Tweet</button>
        </span>
      </div>
    </div>
    <Tweet v-for="tweet in tweets"
      :key="tweet.key"
      :id="tweet._id"
      :content="tweet.content"
      :author="tweet.author"
      :likes="tweet.likes"
      :retweets="tweet.retweets"
      :replies="tweet.replies"
      :originalTweet="tweet.originalTweet"
      :repliedTweet="tweet.repliedTweet"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  width: 100%;
  border: 1px solid #E1E8ED;
  .navigator {
    width: 100%;
    position: sticky;
    top: 0;
    font-size: 1.3rem;
    height: 3rem;
    line-height: 3rem;
    padding-left: 1rem;
    opacity: 0.95;
    font-weight: bold;
    border-bottom: 1px solid #E1E8ED;
    background-color: #fff;
  }
  .tweet-creator {
    border-bottom: 1px solid #E1E8ED;
    padding: 1rem;
    display: inline-block;
    width: 100%;
    .left {
      float: left;
      width: 3.5rem;
    }
    .right {
      float: left;
      width: calc(100% - 3.5rem);
      padding-left: 1rem;
    }
    .avatar {
      border-radius: 1.75rem;
      height: 3.5rem;
      width: 3.5rem;
      float: left;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .content {
      width: 100%;
      float: left;
      outline: none;
      border: none;
      font-size: 1.2rem;
      min-height: 5rem;
      border-bottom: 1px solid #E1E8ED;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }
    .tweet-button-container {
      display: inline-block;
      cursor: pointer;
      .tweet-button {
        cursor: pointer;
        background-color: #1DA1F2;
        color: #fff;
        outline: none;
        border: none;
        border-radius: 1.15rem;
        height: 2.3rem;
        width: 5rem;
        transition-property: transform;
        transition-duration: 400ms;
      }
    }
    .tweet-button-container:hover {
      .tweet-button {
        transform: translateY(-0.5rem);
      }
    }
    [contenteditable=true]:empty:before{
      content: attr(placeholder);
      pointer-events: none;
      display: block; /* For Firefox */
      color: #777;
    }
  }
}
</style>
