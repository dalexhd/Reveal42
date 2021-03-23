<template>
  <section data-transition="zoom-in fade-out">
    <section data-transition="zoom-out">
      <img
        data-src="@/assets/img/datadog.svg"
        style="object-fit: cover; width: 305px; object-position: 0% 0"
        alt="DataDog square Logo"
        height="300"
      />
    </section>
    <section data-transition="zoom-in">
      <img
        data-src="@/assets/img/datadog.svg"
        alt="DataDog Logo"
        height="300"
      />
    </section>
    <section
      data-background-video="@/assets/video/datadog/datadog.mp4"
      data-background-video-preload="auto"
      data-background-video-thumbnails="@/assets/video/datadog/thumbnails.vtt"
      :data-background-video-subtitles-enabled="$store.state.settings.subtitles"
      :data-background-video-subtitles="
        JSON.stringify([
          {
            label: 'Español',
            srclang: 'es',
            src: require(`@/assets/video/datadog/es.vtt`),
            default: true,
          },
          {
            label: 'English',
            srclang: 'en',
            src: require(`@/assets/video/datadog/en.vtt`),
          },
        ])
      "
      data-background-size="contain"
      data-background-interactive="false"
      :data-background-video-muted="$store.state.settings.muted"
    />
    <section
      data-background-iframe="https://p.datadoghq.com/sb/7svjk4jalcnlifw5-45b3a2a8bc3616303909036435520f53?from_ts=1597338189730&live=true&theme=dark&to_ts=1597424589730"
      data-background-interactive="true"
    />
  </section>
</template>
