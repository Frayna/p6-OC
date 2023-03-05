<template>
  <div id="root" class="wrapper">
    <nav id="nav">
      <header>
        <a v-bind:href="vueConfig.publicPath"><img v-bind:src="vueConfig.publicPath + 'logo.png'" alt="Fisheye Home page" class="logo" id="logo"/> </a>
        <a id="content-link" href="#main" v-on:click="goContent" v-if="checkMainRoute()">Passer au contenu</a>
        <ListTags v-bind:Qtag="$route.query.tag" v-if="checkMainRoute()"/>
      </header>
    </nav>
    <main id="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import ListTags from '@/components/ListTags.vue'
import vueConfig from '@/vue.config'

export default {
  name: 'App',
  components: {
    ListTags,
  },
  data() {
    return {
      vueConfig,
    }
  },
  methods:{
    showGoContent: function() {
      if(this.checkMainRoute() && window.screen.width >= 768) {
        const contentLink = document.getElementById('content-link')
        if(contentLink)
          contentLink.style.display = 'block'
      }
    },
    goContent: function() {
      const main = document.getElementById('main')
      if(main)
        main.focus()
    },
    checkMainRoute: function() {
      return this.$route.path == vueConfig.publicPath;
    }
  },
  mounted: function() {
      window.addEventListener('keyup', this.showGoContent)
      window.addEventListener('scroll', this.showGoContent)
  },
  unmounted: function() {
    window.removeEventListener('keyup', this.showGoContent)
    window.removeEventListener('scroll', this.showGoContent)  
  }
}
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
@import '@/styles.scss';

#content-link {
  display: none;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 5px;
  background-color: $secondary-bg-color;
  color: black;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 5px;
  text-decoration: none;
  z-index: 10;
}

@media screen and (max-width: 768px) {
  .logo {
    width: 150px;
    margin-left: -15px;
  }
}

</style>
