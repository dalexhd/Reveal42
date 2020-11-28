<template>
  <section data-transition="zoom-in fade-out">
    <section data-transition="zoom-out">
      <img
        data-src="@/assets/img/sentry-square.svg"
        alt="Sentry square Logo"
        height="300"
      />
    </section>
    <section data-transition="zoom-in">
      <img data-src="@/assets/img/sentry.svg" alt="Sentry Logo" height="300" />
    </section>
    <section
      data-background-video="@/assets/video/sentry/sentry.mp4"
      data-background-video-preload="auto"
      data-background-video-thumbnails="@/assets/video/sentry/thumbnails.vtt"
      :data-background-video-subtitles-enabled="$store.state.settings.subtitles"
      :data-background-video-subtitles="
        JSON.stringify([
          {
            label: 'Español',
            srclang: 'es',
            src: require(`@/assets/video/sentry/es.vtt`),
            default: true,
          },
          {
            label: 'English',
            srclang: 'en',
            src: require(`@/assets/video/sentry/en.vtt`),
          },
        ])
      "
      data-background-size="contain"
      data-background-interactive="false"
      data-background-video-volume="0.8"
      :data-background-video-muted="$store.state.settings.muted"
    />
  </section>
</template>
