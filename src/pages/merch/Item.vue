<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

const addToCart = () => {
  emit('add-to-cart', props.item);
};
</script>

<template>
  <div class="item-card-wrapper">
    <v-hover v-slot="{ isHovering, props: hoverProps }">
      <v-card
          class="mx-auto item-card"
          max-width="374"
          v-bind="hoverProps"
          :elevation="isHovering ? 12 : 2"
          :class="{ 'on-hover': isHovering }"
      >
        <v-img
            :src="item.imageUrl"
            height="250"
            cover
        ></v-img>

        <v-card-title>{{ item.name }}</v-card-title>

        <v-card-subtitle>${{ item.price.toFixed(2) }}</v-card-subtitle>

        <v-card-text>
          <div>{{ item.shortDescription }}</div>

          <v-card-actions>
            <v-btn
                color="primary"
                variant="outlined"
                @click="addToCart"
            >
              Add to Cart
            </v-btn>
          </v-card-actions>

          <div v-if="isHovering" class="mt-4">
            <strong>Details:</strong>
            <p>{{ item.longDescription }}</p>
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<style scoped>
.item-card-wrapper {
  position: relative;
}

.item-card {
  transition: all 0.3s ease-in-out;
}

.item-card.on-hover {
  transform: scale(1.03);
  position: absolute;
  z-index: 10;
  background: white;
  transform-origin: center center;
}
</style>
