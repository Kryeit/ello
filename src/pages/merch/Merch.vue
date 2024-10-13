<script setup>
import {ref} from 'vue';
import {addToCart, cart} from '@/js/merch/cart.js';
import Cart from "@/pages/merch/Cart.vue";
import Item from "@/pages/merch/Item.vue";

const items = ref([
  {
    id: 1,
    name: "Cool T-Shirt",
    price: 19.99,
    imageUrl: new URL('@/assets/flags/es.png', import.meta.url).href,
    shortDescription: "A comfortable and stylish t-shirt.",
    longDescription: "This t-shirt is made from 100% organic cotton, featuring a unique design that's perfect for any casual occasion. Available in multiple sizes and colors."
  },
  {
    id: 2,
    name: "Awesome Mug",
    price: 9.99,
    imageUrl: "/images/mug.jpg",
    shortDescription: "A large mug for your favorite beverages.",
    longDescription: "This ceramic mug holds up to 16oz of your favorite hot or cold drink. Microwave and dishwasher safe. Features a unique design that won't fade with use."
  },
  {
    id: 3,
    name: "Stylish Cap",
    price: 14.99,
    imageUrl: "/images/cap.jpg",
    shortDescription: "A trendy cap for sunny days.",
    longDescription: "This adjustable cap is perfect for outdoor activities. Made from breathable material with UV protection."
  },
  {
    id: 4,
    name: "Cozy Hoodie",
    price: 39.99,
    imageUrl: "/images/hoodie.jpg",
    shortDescription: "A warm and comfortable hoodie.",
    longDescription: "Stay warm in style with this soft, fleece-lined hoodie. Features a kangaroo pocket and adjustable drawstring."
  },
  {
    id: 5,
    name: "Sleek Water Bottle",
    price: 24.99,
    imageUrl: "/images/bottle.jpg",
    shortDescription: "A durable, insulated water bottle.",
    longDescription: "Keep your drinks cold for up to 24 hours or hot for up to 12 hours. Made from BPA-free stainless steel."
  },
  {
    id: 6,
    name: "Eco-Friendly Tote Bag",
    price: 12.99,
    imageUrl: "/images/tote.jpg",
    shortDescription: "A spacious and sturdy tote bag.",
    longDescription: "This reusable tote bag is perfect for shopping or carrying everyday items. Made from recycled materials."
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 79.99,
    imageUrl: "/images/earbuds.jpg",
    shortDescription: "High-quality wireless earbuds.",
    longDescription: "Enjoy crystal-clear sound with these comfortable, long-lasting wireless earbuds. Includes a charging case."
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 29.99,
    imageUrl: "/images/yogamat.jpg",
    shortDescription: "A non-slip, cushioned yoga mat.",
    longDescription: "Perfect for yoga, pilates, or any floor exercise. Made from eco-friendly materials with excellent grip."
  },
  {
    id: 9,
    name: "Sticker Pack",
    price: 7.99,
    imageUrl: "/images/stickers.jpg",
    shortDescription: "A pack of 10 unique stickers.",
    longDescription: "Decorate your laptop, water bottle, or any surface with these high-quality, waterproof vinyl stickers."
  },
  {
    id: 10,
    name: "Phone Case",
    price: 19.99,
    imageUrl: "/images/phonecase.jpg",
    shortDescription: "A protective and stylish phone case.",
    longDescription: "Keep your phone safe with this durable case. Available for various phone models with a range of designs."
  },
  {
    id: 11,
    name: "Laptop Sleeve",
    price: 34.99,
    imageUrl: "/images/laptopsleeve.jpg",
    shortDescription: "A padded sleeve for your laptop.",
    longDescription: "Protect your laptop in style with this padded sleeve. Fits most 13-15 inch laptops and features a front pocket for accessories."
  },
  {
    id: 12,
    name: "Sunglasses",
    price: 59.99,
    imageUrl: "/images/sunglasses.jpg",
    shortDescription: "Trendy sunglasses with UV protection.",
    longDescription: "Look cool while protecting your eyes. These sunglasses offer 100% UV protection and come with a protective case."
  },
  {
    id: 13,
    name: "Desk Plant",
    price: 15.99,
    imageUrl: "/images/plant.jpg",
    shortDescription: "A low-maintenance desk plant.",
    longDescription: "Bring some nature to your workspace with this cute, easy-to-care-for succulent. Comes in a stylish pot."
  },
  {
    id: 14,
    name: "Portable Charger",
    price: 44.99,
    imageUrl: "/images/charger.jpg",
    shortDescription: "A high-capacity portable charger.",
    longDescription: "Never run out of battery again with this powerful 20000mAh portable charger. Charge multiple devices simultaneously."
  },
  {
    id: 15,
    name: "Notebook Set",
    price: 16.99,
    imageUrl: "/images/notebooks.jpg",
    shortDescription: "A set of 3 premium notebooks.",
    longDescription: "Stay organized with these high-quality notebooks. Featuring thick paper, bookmarks, and elastic closures."
  }
]);

const handleAddToCart = (item) => {
  addToCart(item);
};
</script>

<template>
  <div class="header">
    <h1>Merch Store</h1>
    <div class="cart-container">
      <Cart/>
    </div>
  </div>

  <v-container>
    <v-row>
      <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-4"
      >
        <Item :item="item" @add-to-cart="handleAddToCart"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  flex-wrap: wrap;
}

.header h1 {
  flex-grow: 1;
  text-align: center;
  margin: 0;
  padding: 16px 0;
}

.cart-container {
  display: flex;
  align-items: center;
  padding: 16px 0;
}
</style>
