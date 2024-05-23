<template>
  <div class="toast" :style="{ zIndex: zIndex }" @click="closeToast">
    <img v-if="image" :src="image" alt="toast-image" class="toast-image"/>
    <div class="toast-content">
      <h4 class="toast-title">{{ title }}</h4>
      <p class="toast-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    image: String,
    title: String,
    description: String,
    zIndex: Number
  },
  methods: {
    closeToast() {
      this.$el.classList.add('toast-exit');
      setTimeout(() => this.$emit('close'), 500);
    }
  },
  mounted() {
    setTimeout(this.closeToast, 5000);
  }
}
</script>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  background-image: url('@/assets/toast.png');
  background-size: contain;
  background-repeat: no-repeat;
  padding: 20px;
  cursor: pointer;
  image-rendering: pixelated;
  animation: toast-enter 0.5s forwards;

}

.toast-exit {
  animation: toast-exit 0.5s forwards;
}

.toast-image {
  width: 70px;
  height: 70px;
  margin-right: 20px;
  image-rendering: pixelated;
}

.toast-content {
  flex: 1;
}

.toast-title, .toast-description {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toast-title, .toast-description, .toast-image {
  user-select: none;
}

@keyframes toast-enter {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-exit {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@media (max-width: 600px) {
  .toast {
    padding: 10px;
  }

  .toast-image {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }

  .toast-title {
    font-size: 12px;
  }

  .toast-description {
    font-size: 8px;
  }
}
</style>
