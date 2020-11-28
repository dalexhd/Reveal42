<template>
  <div class="slides">
    <Cover />
    <Presentation />
    <DeveloperPack />
    <Algolia />
    <Hotjar />
    <Sentry />
    <Datadog />
    <JetBrains />
    <GitKraken />
    <Gitpod />
    <Github />
    <Heroku />
    <Aws />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Cover from "@/components/slides/Cover";
import Presentation from "@/components/slides/Presentation";
import DeveloperPack from "@/components/slides/DeveloperPack";
import Algolia from "@/components/slides/Algolia";
import Hotjar from "@/components/slides/Hotjar";
import Sentry from "@/components/slides/Sentry";
import Datadog from "@/components/slides/Datadog";
import JetBrains from "@/components/slides/JetBrains";
import GitKraken from "@/components/slides/GitKraken";
import Gitpod from "@/components/slides/Gitpod";
import Github from "@/components/slides/Github";
import Heroku from "@/components/slides/Heroku";
import Aws from "@/components/slides/AWS";
export default {
  comments: true,
  components: {
    Cover,
    Presentation,
    DeveloperPack,
    Algolia,
    Hotjar,
    Sentry,
    Datadog,
    JetBrains,
    GitKraken,
    Gitpod,
    Github,
    Heroku,
    Aws,
  },
};
</script>
