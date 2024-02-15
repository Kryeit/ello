<template>
  <div class="sections-container">
    <!-- Each section taking up one-third of the width -->
    <div class="section">Section 1</div>
    <div class="section">Section 2</div>
    <div class="section">Section 3</div>
  </div>
</template>

<script>
export default {
  name: 'NavSections'
};
</script>

<style scoped>
.sections-container {
  height: 100%;
  padding-left: 12%;
  padding-right: 5%;
  display: flex; /* Establishes a flex container */
  width: 100%; /* Full width of the parent element */
  box-sizing: border-box; /* Includes padding and border in the element's width */
}

.section {
  flex: 1; /* Each child will take up an equal amount of space */
  margin: 3%; /* Add some space between the sections */
  padding: 16px; /* Inner spacing */
  border: 1px solid #ccc; /* Border for visual separation */
  box-sizing: border-box; /* Includes padding and border in the element's width */
  min-width: 0; /* Prevents flex items from overflowing */
  /* Add other styling as needed */
}

/* First and last child special styling to remove outer margins */
.section:first-child {
  margin-left: 0;
}

.section:last-child {
  margin-right: 0;
}
</style>
