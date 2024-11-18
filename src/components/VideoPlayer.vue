<script>
export default {
  props: ['src'],
  data() {
    return {
      isVisible: false,
      videoPlaying: false,
    }
  },
  mounted() {
    const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            this.isVisible = true;
            this.$nextTick(() => {
              this.$refs.videoPlayer.volume = 0.1;
            });
            observer.disconnect();
          }
        },
        {
          rootMargin: "100px"
        }
    );
    observer.observe(this.$el);
  },
  methods: {
    restartVideo() {
      this.$refs.videoPlayer.currentTime = 0;
    }
  }
}
</script>

<template>
  <div class="video-container" @click="playVideo">
    <video v-if="isVisible" ref="videoPlayer" :src="src" @ended="restartVideo" @play="videoPlaying = true" @pause="videoPlaying = false" controls controlsList="nodownload">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>
.video-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

video {
  width: 80%;
}
</style>
