<template>
  <div class="toast" :style="{ zIndex: zIndex }">
    <img v-if="image" :src="image" alt="toast-image" class="toast-image"/>
    <div class="toast-content">
      <h4 class="toast-title">{{ title }}</h4>
      <p class="toast-description">{{ description }}</p>
    </div>
    <button class="toast-close" @click="closeToast">×</button>
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
      this.$emit('close');
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
  background-color: #333;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.toast-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.toast-content {
  flex: 1;
}

.toast-title {
  margin: 0;
  font-size: 16px;
}

.toast-description {
  margin: 5px 0 0;
  font-size: 14px;
}

.toast-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
