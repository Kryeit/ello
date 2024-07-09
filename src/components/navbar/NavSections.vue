<script setup>

</script>

<template>
  <div class="sections-container">

    <div class="section">Landmarks (WIP)</div>
    <div class="section">Merch (WIP)</div>
    <div class="section">Nothing thought</div>
  </div>
</template>

<style scoped>
.sections-container {
  height: 100%;
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 10px 20px 10px 100px;
}

.section {
  background-color: var(--color-background);
  flex: 1;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

@media (max-width: 900px) {
  .sections-container {
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 8px;
    gap: 8px;
  }

  .section {
    width: 100%;
  }
}

</style>
<script setup>
</script>