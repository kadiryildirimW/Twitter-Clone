<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  // eslint-disable-next-line
  name: 'Tweet',
  props: [
    'id',
    'content',
    'author',
    'likes',
    'retweets',
    'replies',
    'originalTweet',
    'repliedTweet'
  ],
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    isLiked () {
      return this.user ? this.likesObj.indexOf(this.user._id) !== -1 : 'wait'
    }
  },
  data () {
    return {
      likeCount: this.likes.length,
      likesObj: this.likes
    }
  },
  methods: {
    ...mapActions(['likeTweet', 'removeTweetLike']),
    likeEvent () {
      if (this.isLiked === 'wait') return
      if (this.isLiked) {
        this.removeTweetLike(this.id)
        this.likesObj.splice(this.likesObj.indexOf(this.user._id), 1)
      } else {
        this.likeTweet(this.id)
        this.likesObj.push(this.user ? this.user._id : 'unkown')
      }
    }
  }
}
</script>

<template>
  <div class="tweet">
    <div class="left">
      <div class="avatar">
        <router-link :to="author.username">
          <img :src="author.profilePicture">
        </router-link>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <router-link :to="author.username">
          <span class="name">{{ author.firstname }} {{ author.lastname }}</span>
          <span class="username">@{{ author.username }}</span>
        </router-link>
      </div>
      <div class="content" v-html="content"></div>
      <div class="interactions">
        <div class="item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat empty" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1DA1F2" class="bi bi-arrow-repeat fill" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
          <span>{{ retweets.length }}</span>
        </div>
        <div class="item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat empty" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00C897" class="bi bi-chat-fill fill" viewBox="0 0 16 16">
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
          </svg>
          <span>{{ replies.length }}</span>
        </div>
        <div :class="['item', { 'active': isLiked }]" @click="likeEvent">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart empty" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FC345C" class="bi bi-heart-fill fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
          <span @click.stop>{{ likesObj.length }}</span>
        </div>
        <div class="item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes  tweet {
  0% { transform: translateX(-100%); opacity: 0;}
  100% { transform: translateX(0); opacity: 1;}
}
.tweet {
  width: 100%;
  padding: 1rem;
  min-height: 4rem;
  display: inline-block;
  border-bottom: 1px solid #E1E8ED;
  animation-name: tweet;
  animation-duration: 800ms;
  .left {
    float: left;
    width: 3rem;
    .avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 1.50rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .right {
    float: left;
    width: calc(100% - 3.5rem);
    padding-left: 1rem;
    .name {
      font-weight: bold;
      font-size: 1rem;
      margin-right: 0.4rem;
    }
    .username {
      color: #657786;
      font-size: 0.95rem;
    }
    .content {
      margin-top: 0.4rem;
      font-size: 0.95rem;
      color: #2b2b2b;
      word-break: break-word;
    }
    .interactions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      height: 1rem;
      align-items: center;
      .item {
        display: flex;
        height: 1rem;
        align-items: center;
        cursor: pointer;
        svg {
          margin-right: 1rem;
          transition-property: transform;
          transition-duration: 400ms;
        }
        span {
          font-size: 0.9rem;
          color: #657786;
        }
        .fill {
          display: none;
        }
      }
      .item:hover {
        svg {
          transform: translateY(-0.5rem);
        }
      }
      .item.active {
        .empty {
          display: none;
        }
        .fill {
          display: block;
        }
      }
    }
  }
}
</style>
