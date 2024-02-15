<script setup>
import SectionItem from './SectionItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <SectionItem>
    <template #icon>
      <router-link to="/cities">
        <DocumentationIcon />
      </router-link>
    </template>
    <template #heading>Cities</template>

    A place where all Kryeit cities are listed, with different information.
    (WIP) Train connections to cities/posts!
  </SectionItem>

  <SectionItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Newspaper</template>

    This project is served and bundled with

    <br />

    More instructions are available in <code>README.md</code>.
  </SectionItem>

  <SectionItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Archive</template>

    Get official tools and libraries for your project:
  </SectionItem>

  <SectionItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Get involved with the Kryeit community. We are always looking for new contributors.
  </SectionItem>

  <SectionItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
  </SectionItem>
</template>
