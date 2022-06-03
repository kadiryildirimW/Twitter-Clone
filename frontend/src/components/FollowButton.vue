<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FollowButton',
  computed: {
    ...mapGetters({ user: 'getUser', viewedUser: 'getViewedUser' }),
    isFollowed () {
      return this.user.following.indexOf(this.viewedUser._id) !== -1
    },
    followerLength () {
      return this.viewedUser.follower ? this.viewedUser.follower.length : 0
    },
    followingLength () {
      return this.viewedUser.following ? this.viewedUser.following.length : 0
    }
  },
  methods: {
    ...mapActions(['followUser', 'unfollowUser']),
    followButtonClick () {
      try {
        if (this.isFollowed) {
          this.unfollowUser(this.viewedUser._id)
        } else {
          this.followUser(this.viewedUser._id)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<template>
  <button :class="[{ 'follow' : isFollowed }]" @click="followButtonClick">{{ isFollowed ? 'Unfollow' : 'Follow' }}</button>
</template>

<style lang="scss" scoped>
button {
  border-radius: 1.125rem;
  height: 2.25rem;
  width: 6rem;
  outline: none;
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;

  background-color: #14171A;
  border: none;
  color: #fff;
}
.follow {
  background-color: #fff;
  border: 2px solid #657786;
  color: #14171A;
}
</style>
