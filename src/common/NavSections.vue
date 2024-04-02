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
  display: flex;
  width: 100%;
  gap: 3%;
}

.section {
  flex: 1;
  padding: 16px;
  border: 1px solid #ccc;
  min-width: 0;
}
</style>
