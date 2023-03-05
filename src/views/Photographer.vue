<template>
  <div class="about">
    <Gallery />
  </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue'
export default {
  name: 'Photographer',
  components: {
    Gallery,
  },
  created() {
    document.documentElement.setAttribute('lang', 'fr')
  },
}
</script>

<style scoped lang="scss">
.about{
  margin: auto 10px;
}

</style>