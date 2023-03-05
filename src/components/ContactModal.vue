<template>
  <dialog class="contact_modal" aria-labelledby="head_contact">
    <form
      class="viewer"
      v-on:submit="(e) => validate(e)">
      <button aria-label="Close Contact form" type="button" v-on:click="close()">
        <i class="fas fa-times"></i>
      </button>
      <h1 id="head_contact">Contactez-moi <br/> {{ photographer.name }}</h1>
      <label id="First_name">Prénom</label>
      <input aria-labelledby="First_name" id="first" required v-model="form.first" v-on:input="(e)=> resetError(e.target)"/>
      <label id="Last_name">Nom</label>
      <input aria-labelledby="Last_name" type="text" id="last" required v-model="form.last" v-on:input="(e)=> resetError(e.target)"/>
      <label id="Email">Email</label>
      <input aria-labelledby="Email" type="text" id="email" required v-model="form.email" v-on:input="(e)=> resetError(e.target)"/>
      <label id="Your_message">Votre message</label>
      <textarea aria-labelledby="Your_message" required v-model="form.message" v-on:input="(e)=> resetError(e.target)"></textarea>
      <input type="submit" aria-label="Send"/>
    </form>
  </dialog>
</template>

<script>
export default {
  name: 'ContactModal',
  props: ['close', 'photographer'],
  methods: {
    closeModal() {
      this.close()
    },
    resetError(target) {
      if(target instanceof HTMLInputElement)
        target.setCustomValidity('')
    },
    validate(event) {
      event.preventDefault()
      console.log('Submit');
      const nameRegex = /^[a-zA-Zăàáâãäåçèéêëìíîïðòóôõöùúûüýÿ-]{2,}$/
      const mailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      let valide = true

      document.querySelectorAll('[required]').forEach((e) => {
        if (!(e instanceof HTMLInputElement))
          return;
        switch (e.id) {
          case 'first':
            if (!e.value.match(nameRegex)) {
              console.log('First Error !')
              e.setCustomValidity(
                'Veuillez entrer 2 caractères ou plus, alphabétique uniquement'
              )
              valide = false
            }
            break
          case 'last':
            if (!e.value.match(nameRegex)) {
              e.setCustomValidity(
                'Veuillez entrer 2 caractères ou plus, alphabétique uniquement'
              )
              valide = false
            }
            break
          case 'email':
            if (!e.value.match(mailRegex)) {
              e.setCustomValidity(
                'Veuillez entrer un mail valide (identifiant@domain.extension)'
              )
              valide = false
            }
            break
        }
      })
      if (valide)
        this.closeModal()
      return valide
    },
  },
  mounted: function() {
    document.querySelectorAll('body *:not(dialog *):not([tabindex="-1"])').forEach((e) => {
      e.setAttribute('tabindex', '-1')
    })
  },
  unmounted: function() {
    document.querySelectorAll('body [tabindex = "-1"]').forEach((e) => {
      e.removeAttribute('tabindex')
    })
  },
  data() {
    return {
      form: {
        first: '',
        last: '',
        email: '',
        message: ''
      },
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles.scss';

.contact_modal {
  border: none;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  display: flex;
  justify-content: space-between;
}

.viewer {
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
        padding-top: 0.1rem;
    border-radius: 10px;
  }
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  background-color: $secondary-bg-color;
  color: black;
  border-radius: 10px;
  padding: 20px;
  width: 50vw;
  min-height: 60vh;
  text-align: left;
  max-width: 500px;
  label {
    width: 100%;
    margin-top: 20px;
    font-size: 24px;
    font-family: $primary-font-family;
    color: #312e2e;
  }
  input,
  textarea {
    padding: 6px;
    font-family: $primary-font-family;
    font-size: 18px;
    min-height: 40px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    resize: vertical;
  }

  textarea {
    min-height: 100px;
  }

  input[type='submit'] {
    background-color: $secondary-font-color;
    border: none;
    color: white;
    margin-top: 20px;
    border-radius: 6px;
    width: 200px;
    padding: 20px;
    font-family: $primary-font-family;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    @media (max-width: 768px) {
      margin: auto;
      padding: 10px;
    }
  }

  h1,
  h2,
  h3 {
    margin: 0;
    font-size: 35px;
    font-weight: normal;
    line-height: 3rem;
  }

  button {
    position: absolute;
    width: 10vw;
    font-size: 2rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    top: 0.3rem;
    right: calc(-4vw + 10px);
    @media (max-width: 768px) {
      right: calc(-4vw + 25px);
    }
    color: white;
  }
}
</style>
