<template>
  <div>
    <a
      href=""
      v-for="tag in provider({ element: 'tags' })"
      :key="tag"
      v-bind:class="[Qtag == tag ? 'link link--active' : 'link']"
      v-on:click="setTag(tag)"
    >
      {{ '#' + (tag.charAt(0).toUpperCase() + tag.slice(1)) }}
    </a>
  </div>
</template>

<script>
import router from '@/router/index'
import provider from '@/API/provider'
import vueConfig from '@/vue.config'

export default {
  props: ['Qtag'],
  data() {
    return {
      vueConfig,
    }
  },
  methods: {
    provider,
    setTag(value) {
      this.$route.query.tag === value
        ? router.push({ path: vueConfig.publicPath, query: {} })
        : router.push({ path: vueConfig.publicPath, query: { tag: value } })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles.scss';

div {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top:30px;
  width: calc(80vw - 750px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin:auto;
  z-index: 5;
  @media (max-width: 1400px) {
    top:120px;
    width: 90%;
    justify-content: center;
  }
  @media (max-width: 768px){
    top:50px;
  }
}

</style>
