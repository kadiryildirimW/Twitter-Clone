<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters({ user: 'getUser' })
  },
  methods: {
    ...mapActions(['register', 'login', 'userVerification', 'createTweet', 'reset'])
  },
  async created () {
    const kadir = {
      firstname: 'Kadir',
      lastname: 'Yıldırım',
      email: 'kadir@gmail.com',
      username: 'kadir',
      location: 'Turkey, Antalya',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      link: 'kadir.com',
      birthday: new Date(2004, 0, 1),
      password: '12345678'
    }
    const ayse = {
      firstname: 'Ayse',
      lastname: 'Yıldırım',
      email: 'ayse@gmail.com',
      location: 'Turkey, Antalya',
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      link: 'about.ayse.com',
      username: 'ayse',
      birthday: new Date(2008, 0, 1),
      password: '12345678'
    }

    const token = this.$cookies.get('token-27jd*')
    if (token) {
      await this.userVerification()
      if (!this.user || !this.user.username) {
        alert('An error occurred, do you want to reset?')
        this.$cookies.remove('token-27jd*')
        this.reset()
      }
    } else {
      await this.register(kadir)
      await this.register(ayse)
      const login = this.login
      const $cookies = this.$cookies
      const createTweet = this.createTweet
      async function sessionKadir () {
        const { token, sessionDuration } = await login({ email: kadir.email, password: kadir.password })
        $cookies.set('token-27jd*', token, sessionDuration + 's')
        if (token) {
          await createTweet({ content: 'Test' })
          await createTweet({ content: 'Test2' })
        }
      }
      async function sessionAyse () {
        const { token, sessionDuration } = await login({ email: ayse.email, password: ayse.password })
        $cookies.set('token-27jd*', token, sessionDuration + 's')
        if (token) {
          await createTweet({ content: 'Test' })
          await createTweet({ content: 'Test2' })
        }
      }
      await sessionKadir()
      await sessionAyse()
    }
  }
}
</script>

<template>
  <nav>
    <div class="logo-item">
      <router-link to="/">
        <div class="logo-frame">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M288 208C288 216.8 280.8 224 272 224C263.2 224 255.1 216.8 255.1 208C255.1 199.2 263.2 192 272 192C280.8 192 288 199.2 288 208zM256.3-.0068C261.9-.0507 267.3 1.386 272.1 4.066L476.5 90.53C487.7 95.27 495.2 105.1 495.9 118.1C501.6 213.6 466.7 421.9 272.5 507.7C267.6 510.5 261.1 512.1 256.3 512C250.5 512.1 244.9 510.5 239.1 507.7C45.8 421.9 10.95 213.6 16.57 118.1C17.28 105.1 24.83 95.27 36.04 90.53L240.4 4.066C245.2 1.386 250.7-.0507 256.3-.0068H256.3zM160.9 286.2L143.1 320L272 384V320H320C364.2 320 400 284.2 400 240V208C400 199.2 392.8 192 384 192H320L312.8 177.7C307.4 166.8 296.3 160 284.2 160H239.1V224C239.1 259.3 211.3 288 175.1 288C170.8 288 165.7 287.4 160.9 286.2H160.9zM143.1 176V224C143.1 241.7 158.3 256 175.1 256C193.7 256 207.1 241.7 207.1 224V160H159.1C151.2 160 143.1 167.2 143.1 176z"/></svg>
        </div>
      </router-link>
    </div>
    <div class="item">
      <div class="frame">
        <router-link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg>
          <span>Home</span>
        </router-link>
      </div>
    </div>
    <div class="item">
      <div class="frame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-hash" viewBox="0 0 16 16">
          <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>
        </svg>
        <span>Explore</span>
      </div>
    </div>
    <div class="item">
      <div class="frame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
        </svg>
        <span>Notifications</span>
      </div>
    </div>
    <div class="item">
      <div class="frame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
        <span>Messages</span>
      </div>
    </div>
    <div class="item">
      <div class="frame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bookmarks" viewBox="0 0 16 16">
          <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
          <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
        </svg>
        <span>Bookmarks</span>
      </div>
    </div>
    <div class="item">
      <div class="frame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
          <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"/>
        </svg>
        <span>Lists</span>
      </div>
    </div>
    <div class="item">
      <router-link :to="user.username ? user.username : '#'">
        <div class="frame">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg>
          <span>Profile</span>
        </div>
      </router-link>
    </div>
    <div class="item">
      <div class="frame">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-sliders2" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5ZM12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5ZM1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8Zm9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5Zm1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/>
        </svg>
        <span>More</span>
      </div>
    </div>
  </nav>
  <main>
    <router-view/>
  </main>
  <aside>
    <div class="search-bar">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
      <input type="text" placeholder="Search Twitter">
    </div>
    <div class="trends">
      <div class="title">Trends for you</div>
      <div class="trend">
        <div class="category">Trending in Turkey</div>
        <div class="header">Why can't we walk while running</div>
        <div class="total-tweets">12.321 Tweets</div>
      </div>
      <div class="trend">
        <div class="category">politika falan filan</div>
        <div class="header">Kuşlar maldoır</div>
        <div class="total-tweets">12.321 Tweets</div>
      </div>
      <div class="trend">
        <div class="category">politika falan filan</div>
        <div class="header">Kuşlar maldoır</div>
        <div class="total-tweets">12.321 Tweets</div>
      </div>
      <div class="trend">
        <div class="category">politika falan filan</div>
        <div class="header">Kuşlar maldoır</div>
        <div class="total-tweets">12.321 Tweets</div>
      </div>
    </div>
  </aside>
</template>

<style>
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
div {
  box-sizing: border-box;
}
a {
  color: currentColor;
  text-decoration: none;
}
</style>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  width: 1150px;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
nav {
  padding-top: 1rem;
  width: 250px;
  box-sizing: border-box;
  position: fixed;
  .logo-item {
    height: 3.5rem;
    display: flex;
    align-items: center;
    .logo-frame {
      height: 3rem;
      padding: 0.5rem;
      margin-left: 0.5rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      svg {
        height: 2rem;
        fill: #1DA1F2;
      }
    }
    .logo-frame:hover {
      background-color: #EFEFEF;
    }
  }
  .item {
    height: 3.5rem;
    display: flex;
    align-items: center;
    .frame {
      height: 3rem;
      padding-left: 1.2rem;
      padding-right: 2rem;
      border-radius: 1.5rem;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      cursor: pointer;
      svg {
        margin-right: 1rem;
        height: 1.5rem;
      }
    }
    .frame:hover {
      background-color: #EFEFEF;
    }
  }
}
main {
  width: 600px;
  min-height: 100%;
  box-sizing: border-box;
  margin-left: 250px;
}
aside {
  width: 300px;
  position: fixed;
  top: 0;
  margin-left: 850px;
  box-sizing: border-box;
  padding-left: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  .search-bar {
    display: flex;
    align-items: center;
    height: 3rem;
    background-color: #F5F8FA;
    border-radius: 1.5rem;
    padding: 1rem;
    width: 100%;
    svg {
      margin-right: 1rem;
    }
    input {
      outline: none;
      border: none;
      background: transparent;
      height: 2rem;
      font-size: 0.9rem;
    }
  }
  .trends {
    margin-top: 1rem;
    border-radius: 1rem;
    background-color: #F5F8FA;
    padding-bottom: 2rem;
    .title {
      font-size: 1.2rem;
      font-weight: bold;
      padding: 1rem;
    }
    .trend {
      cursor: pointer;
      padding: 1rem;
      .category {
        color: #657786;
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }
      .header {
        font-weight: bold;
        font-size: 0.95rem;
        margin-bottom: 0.3rem;
      }
      .header::before {
        content: '#';
      }
      .total-tweets {
        color: #657786;
        font-size: 0.9rem;
      }
    }
    .trend:hover {
      background-color: #E1E8ED;
    }
  }
}
@media only screen and (max-width: 1180px) {
  aside {
    display: none;
  }
  #app {
    width: 850px;
    margin: 0 auto;
  }
  main {
    margin-left: auto;
  }
}
@media only screen and (max-width: 850px) {
  nav, aside {
    display: none;
  }
  main {
    max-width: 100%;
    margin: auto;
  }
}
</style>
