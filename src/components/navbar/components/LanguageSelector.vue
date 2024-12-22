<script>
import enFlag from '@/assets/flags/en.png'
import esFlag from '@/assets/flags/es.png'

export default {
  name: 'LanguageSelector',
  data() {
    const languages = [
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
    ];
    const currentLanguageIndex = languages.findIndex(lang => lang.locale === this.$i18n.locale);
    return {
      languages,
      currentLanguageIndex: currentLanguageIndex !== -1 ? currentLanguageIndex : 0
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
      localStorage.setItem('language', this.$i18n.locale);
    }
  }
}
</script>

<template>
  <div @click="changeLanguage">
    <img :src="selectedFlag" alt="Selected language flag" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

img {
  width: 47px;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  border-radius: 4px;
}

div:active {
  transform: scale(0.95);
}
</style>