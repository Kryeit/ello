<script setup>
import {useColorMode, useCycleList} from '@vueuse/core'
import {watchEffect} from 'vue-demi'

const mode = useColorMode({
  modes: {
    cafe: 'cafe',
    contrast: 'contrast',
  },
})

const {state, next} = useCycleList(['dark', 'light', 'cafe', 'contrast', 'auto'], {initialValue: mode})

watchEffect(() => mode.value = state.value)
</script>

<template>
  <button class="tgl-btn" @click="next()">
    <Moon v-if="state === 'dark'" i-carbon-moon class="align-middle"/>
    <Sun v-if="state === 'light'" i-carbon-sun class="align-middle"/>
    <Cafe v-if="state === 'cafe'" i-carbon-cafe class="align-middle"/>
    <Contrast v-if="state === 'contrast'" i-carbon-contrast class="align-middle"/>
    <Laptop v-if="state === 'auto'" i-carbon-laptop class="align-middle"/>
  </button>
</template>

<style>
.tgl-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  background-color: var(--color-text);
  border: none;
  outline: none;
  color: var(--color-background-mute);
  text-shadow: 1px 1px 1px var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  vertical-align: middle;
  width: 47px;
  height: 47px;
}

.tgl-btn:active {
  transform: scale(0.95);
}
</style>