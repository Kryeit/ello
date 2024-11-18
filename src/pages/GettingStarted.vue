<template>
  <div>
    <h1>Getting started on Kryeit</h1>
    <ul>


      <li><router-link to="/getting-started#join">Joining the server & Installing our modpack</router-link></li>
      <li><router-link to="/getting-started#posts">Post System</router-link></li>
      <li><router-link to="/getting-started#claiming">Claiming</router-link></li>
      <li><a href="https://map.kryeit.com" target="_blank">BlueMap</a></li>
    </ul>

    <h2 id="join">Joining the Server</h2>

    <h3>Installing Our Modpack</h3>
    <p>Our server IP is: "kryeit.com". But since this is a modded server, you need to install our modpack to join.</p>

    <h3 style="color: green">Modrinth App</h3>
    <p>This is the recommended installation option. We made a 1-minute-long walkthrough video if you don't like reading.</p>
    <VideoPlayer :src="Installation"/>

    <h4>Instructions:</h4>
    <ol>
      <li>Download the Modrinth launcher. Visit <a href="https://modrinth.com/app">https://modrinth.com/app</a> for instructions and the download link</li>
      <li>Click the search icon in the sidebar. Search for "Kryeit" in the Modpacks tab and click "Install".</li>
      <li>Once in Minecraft, enter the server address "kryeit.com". Have fun!</li>
    </ol>

    <h3 style="color: orange">CurseForge</h3>
    <ol>
      <li>The CurseForge Team made a tutorial on how to install modpacks here: <a href="https://support.curseforge.com/en/support/solutions/articles/9000196984-installing-minecraft-modpacks">https://support.curseforge.com/en/support/solutions/articles/9000196984-installing-minecraft-modpacks</a></li>
      <li>In the searchbar search for Kryeit and install its latest version.</li>
      <li>Once in Minecraft, enter the server address "kryeit.com". Have fun!</li>
    </ol>

    <h3 style="color: rebeccapurple">Manual</h3>
    <p>If you do not want to install any additional programs, you can also use the Modpack through the vanilla launcher. This option is more tedious than the ones above and not recommended.</p>
    <p>We made a 1-minute-long walkthrough video to watch if you don't like reading. It's probably easier watching how it's done than reading the following instructions.</p>
    <VideoPlayer :src="ManualInstallation"/>

    <h4>Instructions:</h4>
    <ol>
      <li>Install the Fabric Modloader. Visit <a href="https://fabricmc.net/wiki/install">https://fabricmc.net/wiki/install</a></li>
      <li>In the installer window, select the <strong>Minecraft version 1.20.1</strong> when asked</li>
      <li>Download the required mods as a zip from <a href="http://kryeit.com/api/modpack">http://kryeit.com/api/modpack</a></li>
      <li>Extract all the files and drag them into your "mods" folder</li>
      <li>Once in Minecraft, enter the server address "kryeit.com". Have fun!</li>
    </ol>
    <p><a href="https://modrinth.com/modpack/kryeit">https://modrinth.com/modpack/kryeit</a></p>

    <h2>Basic guide on server mechanics</h2>

    <h3 id="posts">Post System</h3>
    <img src="@/assets/kryeit/post.webp" alt="post">
    <p>A post is a teleportation landmark, the only place you can use teleporting commands (/visit and /home). The posts are spread out across the world, with 5K blocks in between each other.</p>
    <p>You will spawn at the latest admin named post, which are named automatically the 1st of each month.</p>

    <h3 id="claiming">Claiming</h3>
    <p>Use /claim and click 2 opposite corners to claim your land, also use /abandon to unclaim the land.</p>
  </div>
</template>

<script setup>
import VideoPlayer from "@/components/VideoPlayer.vue";

import Installation from "@/assets/media/installation.mp4";
import ManualInstallation from "@/assets/media/manual_installation.mp4";
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  margin-top: 10px;
}
a {
  color: var(--color-text);
  font-style: italic;

}

h3 {
  margin-top: 10px;
  margin-bottom: 10px;
}

img {
  width: 100%;
}

</style>