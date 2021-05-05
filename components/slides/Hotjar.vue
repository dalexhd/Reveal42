<template>
  <section data-transition="zoom-in fade-out">
    <section data-transition="zoom-out">
      <img
        data-src="@/assets/img/hotjar-square.svg"
        alt="Hotjar square Logo"
        height="300"
      />
    </section>
    <section data-transition="zoom-in">
      <img data-src="@/assets/img/hotjar.svg" alt="Hotjar Logo" height="300" />
    </section>
    <section
      data-background-video="@/assets/video/hotjar/hotjar.mp4"
      data-background-video-preload="auto"
      :data-background-video-subtitles-enabled="$store.state.settings.subtitles"
      :data-background-video-subtitles="
        JSON.stringify([
          {
            label: 'Español',
            srclang: 'es',
            src: require('@/assets/video/hotjar/es.vtt').default,
            default: true,
          },
          {
            label: 'English',
            srclang: 'en',
            src: require('@/assets/video/hotjar/en.vtt').default,
          },
        ])
      "
      data-background-size="contain"
      data-background-interactive="false"
      data-background-video-volume="0.3"
      :data-background-video-muted="$store.state.settings.muted"
    />
    <section
      data-background-iframe="https://insights.hotjar.com/h?site=1807485&heatmap=5914349&token=c3971ad9abbcc5774213e71b69553ce7"
      data-background-interactive="true"
    />
    <section
      data-background-iframe="https://insights.hotjar.com/r?site=1807485&recording=3536145500&token=dab1ce0b2b320c0518a82b78bb6b9563"
      data-background-interactive="true"
    />
  </section>
</template>
