<template>
  <dialog class="media_modal" aria-label="image closeup view">
    <button type="button" aria-label="Close dialog" v-on:click="closeModal">
      <i class="fas fa-times"></i>
    </button>
    <button type="button" v-on:click="prev" aria-label="Previous image">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="viewer">
      <img
        v-if="medias[viewing].media == 'photo'"
        v-bind:src="vueConfig.publicPath + getSelected().link + photographer.name + '/' + getSelected().file"
        class="media"
        v-bind:alt="medias[viewing].title"
      />
      <video controls
        v-if="medias[viewing].media == 'video'"
        class="media"
        v-bind:alt="medias[viewing].title"
      >
      <source 
        v-bind:src="vueConfig.publicPath + getSelected().link + photographer.name + '/' + getSelected().file"
        v-bind:type="getSelected().type"
        >
      </video>
      <span class="city">{{medias[viewing].title}}</span>
    </div>
    <button type="button" v-on:click="next" aria-label="Next image">
      <i class="fas fa-chevron-right"></i>
    </button>
  </dialog>
</template>

<script>
import vueConfig from '@/vue.config'

export default {
  name: 'MediaModal',
  props: ['index', 'medias', 'close', 'photographer', 'setId'],
  methods: {
    closeModal() {
      this.close()
    },
    getSelected() {
      return this.medias[this.viewing]
    },
    next() {
      this.viewing == this.medias.length - 1 ? this.viewing = 0 : ++this.viewing;
      this.setId(this.viewing)
      return;
    },
    prev() {
      this.viewing ? --this.viewing : this.viewing = this.medias.length - 1;
      this.setId(this.viewing)
      return;
    },
    handleKeypress(event) {
      if(event.key === 'ArrowRight')
        this.next()
      if(event.key === 'ArrowLeft')
        this.prev()
      if(event.key === 'Escape')
        this.closeModal()
    }
  },
  data() {
    return {
      vueConfig,
      viewing: this.index,
    }
  },
  mounted: function() {
    window.addEventListener('keyup', this.handleKeypress)
    document.querySelectorAll('body *:not(dialog *):not([tabindex="-1"])').forEach((e) => {
      e.setAttribute('tabindex', '-1')
    })
  },
  unmounted: function() {
    window.removeEventListener('keyup', this.handleKeypress)
    document.querySelectorAll('body [tabindex="-1"]').forEach((e) => {
      e.removeAttribute('tabindex')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles.scss';

.media_modal {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  border: none;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 2;
  display: flex;
  justify-content: space-between;
  button:nth-of-type(1){
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    font-size: 50px;
    cursor: pointer;
    @media (max-width: 768px) {
      right: 10px;
    }
    @media (max-width: 480px) {
      right: 5px;
      font-size: 30px;
    }
  }
  button {
    color: $secondary-font-color;
  }
}

button {
  width: 10vw;
  font-size: 4rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin: auto;
      @media (max-width: 768px) {
      right: 10px;
    }
    @media (max-width: 480px) {
      right: 5px;
      font-size: 30px;
    }
}
.media {
  border-radius: 5px;
}
.viewer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  img, video {
    max-width: 75vw;
    height: 90vh;
    object-fit: cover;
  }
}
</style>
