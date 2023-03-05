<template>
  <div class="home">
    <h1>Nos photographes</h1>
    <ul class="list">
      <li v-for="photographer in provider({ element: 'photographer', tags:this.$route.query.tag})" :key="photographer.id">
        <Photographer v-bind:photographer="photographer" v-bind:Qtag="this.$route.query.tag"/>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Photographer from '@/components/Photographer.vue'
import provider from '@/API/provider'

export default {
  name: 'Home',
  components: {
    Photographer,
  },
  data() {
    return {
      photographerList: provider({ element: 'photographer', tags:this.$route.query.tag}),
      tag: this.$route.query.tag,
    }
  },
  computed:{
    photographerFilter() {
      return provider({ element: 'photographer', tags:this.$route.query.tag})
    }
  },
  methods: {
    provider,

  },
  created() {
    document.documentElement.setAttribute('lang', 'fr');
  }
}
</script>

<style scoped lang="scss">
@import '@/styles.scss';
.home{
  position: relative;
}

h1 {
	color: $secondary-font-color;
	font-weight: lighter;
	position: absolute;
	top:-100px;
	right: 80px;
}
.list {
  padding-top: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
  list-style: none;
  max-width: 1600px;
  margin: auto;
  min-height: calc(100vh - 200px);
  @media (max-width: 1400px) {
    padding: 0;
    padding-top:120px;
  }
  @media (max-width: 768px){
    top:50px;
  }
}

@media screen and (max-width: 768px) {
  h1 {
    top:-45px;
    font-size: 20px;
    right: 20px;
  }
}

</style>
