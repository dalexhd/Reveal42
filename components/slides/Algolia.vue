<template>
  <section data-transition="zoom-in fade-out">
    <section data-auto-animate>
      <img
        data-src="@/assets/img/algolia.svg"
        alt="Algolia Logo"
        height="300"
        style="object-fit: cover; width: 305px; object-position: 0% 0"
        data-id="algolia"
      />
    </section>
    <section data-transition="zoom-in">
      <img
        data-src="@/assets/img/algolia.svg"
        alt="Algolia Logo"
        height="300"
      />
    </section>
    <section
      data-background-video="@/assets/video/algolia/algolia.mp4"
      data-background-video-preload="auto"
      :data-background-video-thumbnails="
        require(`@/assets/video/algolia/thumbnails.vtt`).default
      "
      :data-background-video-subtitles-enabled="$store.state.settings.subtitles"
      :data-background-video-subtitles="
        JSON.stringify([
          {
            label: 'Español',
            srclang: 'es',
            src: require(`@/assets/video/algolia/es.vtt`).default,
            default: true,
          },
          {
            label: 'English',
            srclang: 'en',
            src: require(`@/assets/video/algolia/en.vtt`).default,
          },
        ])
      "
      data-background-size="contain"
      data-background-interactive="false"
      :data-background-video-muted="$store.state.settings.muted"
    />
    <section data-auto-animate data-transition="zoom-in fade-out">
      <h3>Uno de los motores más potentes de búsqueda del mercado.</h3>
      <div class="r-stack">
        <img
          width="600"
          height="390"
          data-src="@/assets/img/flash.gif"
          alt="Flash"
        />
        <img
          width="500"
          height="350"
          class="fragment"
          data-src="@/assets/img/dentadura-voladora.gif"
          alt="Dentadura voladora"
        />
      </div>
    </section>
    <section
      data-background-iframe="https://react-instantsearch.netlify.app/examples/e-commerce/"
      data-background-interactive="true"
    />
    <section>
      <h3 class="justify">
        Indexa tu html para ofrecerte una experiencía de búsqueda mucho mas
        completa, interactiva y lo más importante: precisa!
      </h3>
    </section>
  </section>
</template>
