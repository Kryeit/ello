<template>
  <div @click="changeLanguage">
    <img :src="selectedFlag" alt="Selected language flag" />
  </div>
</template>

<script>
import enFlag from '@/assets/flags/en.png'
import esFlag from '@/assets/flags/es.png'

export default {
  name: 'LanguageSelector',
  data() {
    return {
      languages: [
        {
          language: 'English',
          locale: 'en',
          flag: enFlag
        },
        {
          language: 'Español',
          locale: 'es',
          flag: esFlag
        }
      ],
      currentLanguageIndex: 0
    }
  },
  computed: {
    selectedFlag() {
      return this.languages[this.currentLanguageIndex].flag;
    }
  },
  methods: {
    changeLanguage() {
      this.currentLanguageIndex = (this.currentLanguageIndex + 1) % this.languages.length;
      this.$i18n.locale = this.languages[this.currentLanguageIndex].locale;
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  height: 28px;
  image-rendering: pixelated;
  border-radius: 4px;

}
</style>