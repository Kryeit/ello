<template>
  <div class="sections-container">

    <!-- Each section taking up one-third of the width -->
    <div class="section">Work In Progress</div>
    <div class="section">Work In Progress</div>
    <div class="section">Work In Progress</div>
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
  padding-bottom: 2rem;
}

.section {
  background-color: var(--neutral-dark);
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
    gap: 0.5rem;
  }

  .section {
    width: 100%;
    margin-bottom: 1rem;
  }
}

</style>
