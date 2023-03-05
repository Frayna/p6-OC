<template>
  <div>
    <div class="photograph photographer-gallery photographer_head">
      <section v-bind:href="vueConfig.publicPath + 'photographer/?id=' + photographer.id">
        <h1>{{ photographer.name }}
          <button v-on:click="mediaModal ? 0 : contactModal = true" aira-label="Contact Me">Contactez-moi</button>
        </h1>
        <p class="city">{{ photographer.city + ', ' + photographer.country }}</p>
        <p class="description">{{ photographer.tagline }}</p>
        <div id="tag_list">
          <a v-for="tag in photographer.tags" :key="tag" class="link" v-bind:href="vueConfig.publicPath + '?tag=' + tag" v-bind:aria-label="tag">
            {{ '#' + (tag.charAt(0).toUpperCase() + tag.slice(1)) }}
          </a>
        </div>
      </section>
      <div>
        <img v-bind:src="vueConfig.publicPath + photographer.portrait.link" alt=""/>
      </div>
    </div>
    <div class="sorter">
      <label aria-label="Order by">Trier par : </label>
      <select v-model="sortBy" v-on:change="setSort(sortBy)">
        <option v-bind:style="sortBy == 'popularite' ? 'display:none' : ''" value="popularite">Popularité</option>
        <option v-bind:style="sortBy == 'date' ? 'display:none' : ''" value="date">Date</option>
        <option v-bind:style="sortBy == 'titre' ? 'display:none' : ''" value="titre">Titre</option>
      </select>
    </div>
    <section class="gallery">
      <div v-bind:key="element.title" v-for="(element, pictureID) in sorter(galleryAll)">
        <button v-on:click="contactModal ? 0 : openViewer(pictureID)">
          <img v-if="element.media == 'photo'" v-bind:src="vueConfig.publicPath + element.link + photographer.name + '/' + element.file" v-bind:alt="element.title + ', closeup view'"/>
          <video v-if="element.media == 'video'" v-bind:src="vueConfig.publicPath + element.link + photographer.name + '/' + element.file">
            {{ element.title + ', closeup view' }}
          </video>
        </button>
        <div>
          <p>{{ element.title }}</p> 
          <div v-on:click="element.liked = 1" tabindex="0" role="button">
            <i>{{ element.liked ? element.likes + element.liked : element.likes}}</i>
            <i class="fas fa-heart" aria-label="likes"></i>
          </div>
        </div>
      </div>
    </section>
    <ContactModal v-bind:close="() => { contactModal = !contactModal; bindLikes() }" v-if="contactModal"
      v-bind:photographer="photographer" />
    <MediaModal v-bind:close="() => { mediaModal = false; setMediaID(); bindLikes()}" v-if="getMediaID() || mediaModal" v-bind:medias="galleryAll"
      v-bind:index="getMediaID() || selected" v-bind:photographer="photographer" 
      v-bind:setId="(id) => setMediaID(id)"/>

    <section class="photographer_infos">
      <span>
        {{ galleryAll.reduce((acc, e) => e.liked ? acc + e.likes + e.liked : acc + e.likes, 0) }}
        <i class="fas fa-heart"></i>
      </span>
      <span> {{ photographer.price }} € / Jour </span>
    </section>

  </div>
</template>

<script>

import provider from '@/API/provider'
import MediaModal from '@/components/MediaModal.vue'
import ContactModal from '@/components/ContactModal.vue'
import router from '@/router/index'
import vueConfig from '@/vue.config'

export default {
  name: 'Gallery',
  components: {
    MediaModal,
    ContactModal,
  },
  props: [],
  methods: {
    bindLikes() {
      document.querySelectorAll('[role="button"]').forEach(function(button) {
      button.setAttribute('tabindex', '0')
      button.addEventListener('keyup', function(event) { 
        if (event instanceof KeyboardEvent && event.key === 'Enter')
          if (button instanceof HTMLElement)
              button.click();
        });
      });
    },
    openViewer(id) {
      this.setMediaID(id)
      this.selected = id;
      this.mediaModal = true; 
    },
    getID() {
      return this.$route.query.id
    },
    setMediaID(id) {
      router.push({ path: vueConfig.publicPath + 'photographer', query: {...this.$route.query, mediaId: id } });
    },
    getMediaID() {
      return this.$route.query.mediaId
    },
    getSort() {
      return this.$route.query.order
    },
    setSort(order) {
      router.push({ path: vueConfig.publicPath + 'photographer', query: {...this.$route.query, order } });
    },
    provider,
    sorter(array) {
      if (this.$route.query.order === 'popularite')
        return array.sort((a, b) => b.likes - a.likes)
      if (this.$route.query.order === 'date')
        return array.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())
      if (this.$route.query.order === 'titre')
        return array.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        )
      return array
    },
  },
  data() {
    return {
      vueConfig,
      photographer: provider({
        element: 'photographer',
        id: this.$route.query.id,
      }),
      galleryPictures: provider({
        element: 'media',
        photographerId: this.$route.query.id,
        type: 'image',
      }),
      galleryVideo: provider({
        element: 'media',
        photographerId: this.$route.query.id,
        type: 'video',
      }),
      galleryAll: provider({
        element: 'media',
        photographerId: this.$route.query.id,
        type: 'all',
      }),
      sortBy: 'popularite',
      mediaModal: false,
      contactModal: false,
      selected: -1,
    }
  },
  mounted: function () {
    if(!this.getSort()) {
      this.setSort('popularite')
      this.sortBy = 'popularite'
    } else {
      this.sortBy = this.getSort()
    }
    this.bindLikes()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles.scss';

#tag_list {
  padding-top : 2px;
  display: flex;
  flex-wrap: wrap;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto 20px;
  padding-top: 20px;

  @media (max-width: 1400px) {
    justify-content: space-evenly;
  }

  @media (max-width: 768px) {
    margin:auto;
    gap: 10px;
  }

  p {
    margin: 8px 0;
  }

  button {
    margin: 0px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    text-align: left;
      @media (max-width: 768px) {
        width: 100%;
        margin: auto;
      }
  }

    >div {
      @media (max-width: 768px) {
        width: 200px;
        margin: auto;
      }
  
      @media (max-width: 480px) {
        width: 100%;
        margin: 0;
      }
      >div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
  
        >div {
          margin: auto;
          margin-right: 0;
          display: flex;
          
          i:first-child {
            padding-right: 6px;
            font-family: $primary-font-family;
          }
  
          i {
            color: $secondary-font-color;
            font-size: 1.1rem;
            font-weight: bold;
            font-family: $fontawesome;
            cursor: pointer;
            margin:auto
          }
        }
      }
    }
    
    
    

  img,
  video {
    width: 400px;
    height: 400px;
    object-fit: cover;
    border-radius: 5px;

    @media (max-width: 768px) {
      width: 200px;
      height: 200px;
    }

    @media (max-width: 480px) {
      width: 100%;
      height: 200px;
    }
  }

  p {
    font-size: 1.1rem;
    color: $secondary-font-color;
  }
}

.sorter {
  margin-left: 60px;
  font-family: $primary-font-family;
  font-weight: bold;
  padding-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0px;
    display:none;
  }

  select {
    background-color: $secondary-font-color;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-left: 10px;
  }

}

.photographer_head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: auto;
  margin-left: 60px;
  background-color: #fafafa;
  border-radius: 5px;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
  }

  button {
    margin-left: 5vw;
    background-color: $secondary-font-color;
    border: none;
    color: white;
    padding: 20px 15px;
    border-radius: 10px;
    font-family: $primary-font-family;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;

    @media (max-width: 1000px) {
      position: fixed;
      bottom: 3vw;
      padding: 10px 15px;
      margin: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  text-align: left;

  img {
    width: 200px;
    height: 200px;
    border-radius: 200px;
    object-fit: cover;
    margin-right: 60px;

    @media (max-width: 768px) {
      margin-right: 0px;
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
  }

  a {
    @media (max-width: 768px) {
      font-size: .9rem;

    }
        @media (max-width: 480px) {
      font-size: .7rem;

    }
  }

  h1 {
    color: $primary-font-color;
    font-weight: 400;
    font-size: 36px;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  p {
    @media (max-width: 768px) {
      font-size: 1rem;
      margin: 4px 0;
    }
    @media (max-width: 480px) {
      font-size: .8rem;
    }
  }
}

.photographer_infos {
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 20px;
  background-color: $primary-font-color;
  width: 250px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
  font-size: 18px;

  @media (max-width: 1000px) {
    display: none;
  }
}
</style>
