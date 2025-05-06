<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  /** URL of the image to display */
  src: { type: String, required: true },
  /** Controls visibility via v-model */
  modelValue: { type: Boolean, required: true }
});
const emit = defineEmits(['update:modelValue']);

// Transform state
const scale = ref(1);
const translate = ref({ x: 0, y: 0 });

// Pointer tracking for drag & pinch
const pointers = new Map();
let startDist = 0;
let startScale = 1;
let pinchCenter = { x: 0, y: 0 };

/**
 * Compute CSS transform string
 */
const transformStyle = computed(() => `translate(${translate.value.x}px, ${translate.value.y}px) scale(${scale.value})`);

/**
 * Close the popup and reset state
 */
function close() {
  emit('update:modelValue', false);
  scale.value = 1;
  translate.value = { x: 0, y: 0 };
}

watch(() => props.modelValue, visible => {
  if (!visible) {
    // reset on hide
    scale.value = 1;
    translate.value = { x: 0, y: 0 };
  }
});

/** Zoom via wheel on desktop */
function onWheel(e) {
  e.preventDefault();
  const delta = -e.deltaY;
  const zoomFactor = delta > 0 ? 1.1 : 0.9;
  const rect = e.currentTarget.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  // apply zoom around pointer
  const newScale = scale.value * zoomFactor;
  translate.value.x = (translate.value.x - offsetX) * (newScale / scale.value) + offsetX;
  translate.value.y = (translate.value.y - offsetY) * (newScale / scale.value) + offsetY;
  scale.value = newScale;
}

/** Track pointer down for drag or pinch */
function onPointerDown(e) {
  e.currentTarget.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pointers.size === 2) {
    // pinch start: calculate distance and center
    const pts = Array.from(pointers.values());
    startDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
    startScale = scale.value;
    // pinch center relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    pinchCenter = {
      x: ((pts[0].x + pts[1].x) / 2) - rect.left,
      y: ((pts[0].y + pts[1].y) / 2) - rect.top
    };
  }
}

/** Handle pointer move for drag or pinch */
function onPointerMove(e) {
  if (!pointers.has(e.pointerId)) return;
  const prev = pointers.get(e.pointerId);
  const dx = e.clientX - prev.x;
  const dy = e.clientY - prev.y;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pointers.size === 1) {
    // drag
    translate.value.x += dx;
    translate.value.y += dy;
  } else if (pointers.size === 2) {
    // pinch
    const pts = Array.from(pointers.values());
    const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
    const factor = dist / startDist;
    const newScale = startScale * factor;
    // adjust translate to zoom around pinchCenter
    translate.value.x = (translate.value.x - pinchCenter.x) * (newScale / scale.value) + pinchCenter.x;
    translate.value.y = (translate.value.y - pinchCenter.y) * (newScale / scale.value) + pinchCenter.y;
    scale.value = newScale;
  }
}

/** Release pointer capture */
function onPointerUp(e) {
  e.currentTarget.releasePointerCapture(e.pointerId);
  pointers.delete(e.pointerId);
  if (pointers.size < 2) startDist = 0;
}
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="close">
    <div class="modal-content" @click.self="close">
      <div class="image-container"
           @wheel.prevent="onWheel"
           @pointerdown="onPointerDown"
           @pointermove.prevent="onPointerMove"
           @pointerup="onPointerUp"
           @pointercancel="onPointerUp"
      >
        <img
            :src="src"
            alt="Preview"
            class="popup-image"
            :style="{ transform: transformStyle }"
            draggable="false"
        />
      </div>
      <button class="close-btn" @click="close">✕</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -ms-user-drag: none;
  user-drag: none;
}
.modal-content {
  position: relative;
  width: auto;
  max-width: 90vw;
  height: 90vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-container {
  flex: 1;
  width: auto;
  max-height: calc(90vh - 40px);
  overflow: hidden;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-image {
  transform-origin: 0 0;
  user-select: none;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
}
.close-btn {
  margin-top: 8px;
  background: #d38911;
  border: 3px solid black;
  border-radius: 50%;
  color: black;
  width: 32px;
  height: 32px;
  font-size: 16px;
  line-height: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 42px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
}
</style>
