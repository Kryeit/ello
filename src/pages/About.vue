<script setup>

import IconKryeit from "@/components/icons/IconKryeit.vue";
</script>

<template>
  <div class="about-page">
    <h1 class="title">About Us</h1>
    <br>

    <h3 class="introduction">Kryeit is a Minecraft Java Edition server, fully centered around the Create mod.</h3>
    <br>
    <p>
      We try to bring a stable server experience to all players, with a focus on technical minecraft.
      Each season is thought to last 3-4 years, depending on version updates on Minecraft.
      There are rules in place to ensure a relaxed experience while playing, as well as a claim system to protect your builds.
    </p>
    <br>

    <h1>Our Staff</h1>
    <hr>

    <br>

    <div class="staff-section">
      <div class="staff-member">
        <img width="50%" src="../assets/staff/muriplz.png" alt="MuriPlz" />

        <p>MuriPlz</p>
      </div>
      <div class="staff-member">
        <IconKryeit />
        <p>_Tesseract</p>
      </div>
      <div class="staff-member">
        <!-- image at public/assets/staff/rhino.png -->
        <img width="50%" src="../assets/staff/rhino.png" alt="MrRedRhino" />
        <p>MrRedRhino</p>
      </div>
    </div>

    <div class="donation-section">

    </div>
  </div>
</template>

<style scoped>
.about-page {
  text-align: center;
  padding-top: 30px;
  font-family: 'Minecraftia', sans-serif;
}

.title {
  font-size: 5rem;
}

.staff-section {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
}

.staff-member {
  flex: 1;
  margin: 1em;
}

.staff-member p {
  font-size: 1.5rem;
}

</style>