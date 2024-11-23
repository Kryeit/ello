<script setup>
</script>

<template>
  <div class="sidebar">
    <button class="catalog">
      <router-link  class="catalog-router" to="/store">
        Store
      </router-link>
    </button>
    <button class="cart">
      Cart
    </button>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35px;
  background-color: #976746;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-right-radius: 20% 20px;
  border-top-left-radius: 20% 20px;

  outline: 7px solid black; /* Black border as an outline */
}

.sidebar button {
  position: absolute;
  bottom: 4px;
  background: none;
  border: none;
  color: black;
  width: 115px;
  font-size: 1rem;
  font-weight: bold;
}

.catalog-router {
  color: black;
  text-decoration: none;
  font-weight: bold;

}

.catalog {
  left: calc(18vw - 55px);
  border-top-left-radius: 50%;
}

.cart {
  right: calc(18vw - 55px);
}
</style>

