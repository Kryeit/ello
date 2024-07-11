<script setup>
import { ref } from 'vue';

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

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div class="item-card-wrapper">
    <v-card
        class="mx-auto item-card"
        max-width="374"
        @click="openModal"
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
              @click.stop="addToCart"
          >
            Add to Cart
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-img
            :src="item.imageUrl"
            height="300"
            cover
        ></v-img>
        <v-card-title class="text-h5 font-weight-bold">{{ item.name }}</v-card-title>
        <v-card-subtitle>${{ item.price.toFixed(2) }}</v-card-subtitle>
        <v-card-text>
          <p class="text-body-1"><strong>Short Description:</strong></p>
          <p>{{ item.shortDescription }}</p>
          <p class="text-body-1 mt-4"><strong>Details:</strong></p>
          <p>{{ item.longDescription }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addToCart">Add to Cart</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.item-card-wrapper {
  position: relative;
}

.item-card {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.item-card:hover {
  transform: scale(1.02);
}
</style>