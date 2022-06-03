<script>
import { mapGetters, mapActions } from 'vuex'
import Tweet from '@/components/Tweet'
import FollowButton from '@/components/FollowButton'

export default {
  name: 'ProfileView',
  components: {
    Tweet,
    FollowButton
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      viewedUser: 'getViewedUser'
    }),
    followingLength () {
      return this.viewedUser.following ? this.viewedUser.following.length : 0
    },
    followerLength () {
      return this.viewedUser.follower ? this.viewedUser.follower.length : 0
    }
  },
  methods: {
    ...mapActions(['fetchViewedUser'])
  },
  created () {
    this.fetchViewedUser()
  }
}
</script>

<template>
  <div class="profile">
    <div class="navigator">
      <span>{{ viewedUser.firstname }} {{ viewedUser.lastname }}</span>
    </div>
    <div class="detail">
      <div class="background" v-if="viewedUser.backgroundPicture" :style="{ backgroundImage: `url('${viewedUser.backgroundPicture}')` }"></div>
      <div class="avatar">
        <img :src="viewedUser.profilePicture">
      </div>
      <div v-if="user.username !== viewedUser.username" class="right">
        <FollowButton />
      </div>
      <div class="content">
        <div class="name">{{ viewedUser.firstname }} {{ viewedUser.lastname }}</div>
        <div class="username">@{{ viewedUser.username }}</div>
        <div class="bio">{{ viewedUser.bio }}</div>
        <div class="row">
          <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            <span>{{ viewedUser.location }}</span>
          </div>
          <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
            </svg>
            <a href="#" class="link">{{ viewedUser.link }}</a>
          </div>
          <div class="col">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <span>Joined 15 August, 2019</span>
          </div>
        </div>
        <div class="bottom">
          <span class="following">Following</span> {{ followingLength }}
          <span class="follower">Follower</span> {{ followerLength }}
        </div>
        <div class="nav">
          <div class="item active">Tweets</div>
          <div class="item">Likes</div>
        </div>
      </div>
    </div>
    <div class="tweets" v-if="viewedUser.tweets">
      <Tweet
        v-for="tweet in viewedUser.tweets"
        :key="tweet.key"
        :id="tweet._id"
        :content="tweet.content"
        :author="viewedUser"
        :likes="tweet.likes"
        :retweets="tweet.retweets"
        :replies="tweet.replies"
        :originalTweet="tweet.originalTweet"
        :repliedTweet="tweet.repliedTweet"
      />
    </div>
  </div>
</template>

<style lang="scss">
.profile {
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
    width: 100%;
  }
  .detail {
    border-bottom: 1px solid #E1E8ED;
    .background {
      height: 13rem;
    }
    .right {
      float: right;
      margin-top: -3rem;
      margin-right: 1rem;
    }
    .avatar {
      margin-top: -4rem;
      margin-left: 1rem;
      height: 8rem;
      width: 8rem;
      padding: 0.25rem;
      background-color: #fff;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    .content {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 1rem;
      .name {
        font-weight: bold;
        font-size: 1.2rem;
      }
      .username {
        margin-top: 0.1rem;
        color: #657786;
      }
      .bio {
        margin-top: 1rem;
        color: #14171A;
      }
      .row {
        display: flex;
        justify-content: space-between;
        height: 1rem;
        margin-top: 1rem;
        color: #6d6d6d;
        font-size: 0.95rem;
        .col {
          display: flex;
          align-items: center;
          svg {
            margin-right: 0.3rem;
          }
          .link {
            color: #1DA1F2;
          }
          .link:hover {
            text-decoration: underline;
          }
        }
      }
      .bottom {
        height: 1rem;
        font-size: 0.95rem;
        margin-top: 1.5rem;
        .follower, .following {
          color: #6d6d6d;
        }
        .follower {
          margin-left: 1rem;
        }
      }
      .nav {
        height: 2rem;
        display: flex;
        justify-content: space-around;
        margin-top: 2rem;
        .item {
          color: #657786;
        }
        .item.active {
          color: #14171A;
          font-weight: bold;
          border-bottom: 3px solid #1DA1F2;
        }
      }
    }
  }
}
</style>
