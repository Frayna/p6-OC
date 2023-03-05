<template>
  <div class="photograph">
    <a v-bind:href="'./photographer/?id=' + photographer.id">
      <img v-bind:src="vueConfig.publicPath + photographer.portrait.link" v-bind:alt="photographer.name"/>
      <h2>{{ photographer.name }}</h2>
    <p class="city">{{ photographer.city + ', ' + photographer.country }}</p>
    </a>
    <p class="description">{{ photographer.tagline }}</p>
    <p class="price"> {{ photographer.price }} € / Jour </p>
    <div class="tag-list">
      <a
        v-for="tag in photographer.tags"
        :key="tag"
        v-bind:class="Qtag == tag ? 'link link--active' : 'link'"
        v-bind:href="Qtag != tag ? vueConfig.publicPath + '?tag=' + tag : vueConfig.publicPath"
      >
        {{ '#' + (tag.charAt(0).toUpperCase() + tag.slice(1)) }}
      </a>
    </div>
  </div>
</template>

<script>
import router from '@/router/index'
import vueConfig from '@/vue.config'

export default {
  name: 'Photographer',
  props: ['photographer', 'Qtag', 'page'],
    data() {
    return {
        vueConfig
      }
  },
  methods: {
    setTag(value) {
      this.$route.query.tag === value
        ? router.push({ path: '/', query: {} })
        : router.push({ path: '/', query: { tag: value } })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles.scss';
.tag-list{
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>
