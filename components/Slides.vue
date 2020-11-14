<template>
  <div class="slides">
    <section
      data-auto-animate
      data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    >
      <div data-id="box-42-logo-1">
        <a
          href="https://www.42madrid.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="@/assets/img/42logo.png"
            alt="42 Madrid logo"
            class="demo-logo"
          />
        </a>
      </div>
      <h3>
        Herramientas para ser un estudiante más productivo sin que nuestra
        cartera sufra ‍🎓
      </h3>
      <div class="r-hstack justify-center">
        <div data-id="box-music-widget-1"></div>
      </div>
      <p>
        <small
          >Presentación creada por
          <a href="https://www.linkedin.com/in/alex-borbolla">aborboll</a>
          gracias a la tecnología
          <a href="https://revealjs.com/">reveal.js</a></small
        >
      </p>
    </section>
    <section
      data-auto-animate
      data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)"
      data-background-iframes="https://spotify-widget.herokuapp.com/canvas,https://spotify-widget.herokuapp.com/background"
      data-preload
      data-background-opacity="0.2"
    >
      <div data-id="box-42-logo-1" class="flex">
        <a
          href="https://www.42madrid.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="@/assets/img/42logo.png"
            alt="42 Madrid logo"
            height="80"
            style="margin: 0 auto 4rem auto; background: transparent"
            class="demo-logo"
          />
        </a>
      </div>
      <h3>
        Herramientas para ser un estudiante más productivo sin que nuestra
        cartera sufra ‍🎓
      </h3>
      <div data-id="box-music-widget-1">
        <iframe
          data-src="https://spotify-widget.herokuapp.com/widget"
          data-preload
          style="width: 100%"
        ></iframe>
      </div>
      <p style="margin: 0">
        <small
          >Presentación creada por
          <a
            href="https://www.linkedin.com/in/alex-borbolla"
            target="_blank"
            rel="noopener noreferrer"
            >aborboll</a
          >
          gracias a la tecnología
          <a
            href="https://revealjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            >reveal.js</a
          ></small
        >
      </p>
      <a
        href="https://www.heroku.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="@/assets/img/built-on-heroku-light.svg"
          height="80"
          alt="Hecho en heroku"
          style="margin: 0"
        />
      </a>
    </section>
    <section>
      <section>
        <h2>Buenas tardes 😄</h2>
      </section>
      <section data-auto-animate>
        <h1>Antes de nada...</h1>
      </section>
      <section data-auto-animate>
        <h1>Antes de nada...</h1>
        <img
          class="r-frame"
          height="400"
          src="@/assets/img/los-payasos-de-la-tele.gif"
          alt="Payasos de la tele"
        />
        <aside v-if="hasRole('presenter')" class="notes">
          Shhh, these are your private notes 📝
        </aside>
      </section>
      <section data-auto-animate>
        <h1>¿Quién soy?</h1>
      </section>
      <section data-auto-animate>
        <aside v-if="$store.state.auth.loggedIn" class="notes">
          Nombre, Años, Trabajo
        </aside>
        <h1>¿Quién soy?</h1>
        <img src="@/assets/img/avatar.jpeg" alt="Yo" height="150" />
        <p class="fragment fade-in-then-semi-out">Me llamo Alex Borbolla</p>
        <p class="fragment fade-in-then-semi-out">Tengo 21 años</p>
        <p class="fragment fade-in-then-semi-out">
          Trabajo como desarrollador web fullstack
        </p>
      </section>
      <section>
        <aside v-if="$store.state.auth.loggedIn" class="notes">
          Autodidacta, reddit, ❤️ Open source, nuevas tecnologías, rata
        </aside>
        <h1>¿Cosas sobre mi?</h1>
        <p class="fragment fade-in-then-semi-out">📚 Autodidacta 90%</p>
        <p class="fragment fade-in-then-semi-out">Amante de reddit 👀</p>
        <p class="fragment fade-in-then-semi-out">❤️ Open source</p>
        <p class="fragment fade-in-then-semi-out">
          Adicto a descubrir nuevas tecnologías 🤯
        </p>
        <p class="fragment fade-in">😂 No soy rata, pero si me gusta ahorrar</p>
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section
        data-background-color="rgba(127, 255, 212, 0.5)"
        data-auto-animate
      >
        <img
          src="@/assets/img/student-developer-pack-logo.png"
          height="400"
          alt="GitHub developer pack"
        />
      </section>
      <section data-background-color="rgba(3, 223, 252, 0.5)" data-auto-animate>
        <img
          src="@/assets/img/student-developer-pack-logo.png"
          height="150"
          alt="GitHub developer pack"
        />
        <img
          src="@/assets/img/github_dev_pack_partners.png"
          height="400"
          alt="GitHub developer pack partners"
        />
      </section>
      <section
        data-background-color="rgba(127, 255, 212, 0.5)"
        data-transition="concave-out"
        data-auto-animate
      >
        <img
          src="@/assets/img/student-developer-pack-logo.png"
          height="150"
          alt="GitHub developer pack"
        />
        <div class="flex items-center">
          <div class="w-1/2">
            <div class="r-stack">
              <div class="fragment fade-out" data-fragment-index="0">
                <img
                  src="@/assets/img/github_dev_pack_partners.png"
                  height="250"
                  alt="GitHub developer partners"
                />
              </div>
              <div class="fragment fade-in" data-fragment-index="0">
                <img
                  src="@/assets/img/persona-cohete.gif"
                  alt="Persona en cohete"
                />
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="r-stack">
              <div class="fragment fade-out" data-fragment-index="0">
                <span class="text-6xl text-white animate-pulse">
                  🤑 $45000
                </span>
              </div>
              <div class="fragment fade-in" data-fragment-index="0">
                <a
                  href="https://github-portal.42.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  >github-portal.42.fr</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section
      data-background-iframe="https://meet.jit.si/testdalexhd#jitsi_meet_external_api_id=0&config.startWithAudioMuted=false&config.startWithVideoMuted=true&config.enableWelcomePage=false&config.prejoinPageEnabled=false&interfaceConfig.TOOLBAR_BUTTONS=%5B%5D&interfaceConfig.HIDE_INVITE_MORE_HEADER=true&interfaceConfig.DISPLAY_WELCOME_PAGE_CONTENT=false&interfaceConfig.SHOW_CHROME_EXTENSION_BANNER=false&interfaceConfig.DISABLE_JOIN_LEAVE_NOTIFICATIONS=true&appData.localStorageContent=null"
    ></section>
    <section
      data-background-image="@/assets/img/Pokemon-Rage.gif"
      data-transition="zoom"
      data-background-size="600px"
      data-background-repeat="repeat"
    ></section>
    <section data-transition="zoom-in fade-out">
      <section data-auto-animate>
        <img
          src="@/assets/img/Raspberry_Pi_Logo.svg"
          class="silhouette"
          alt="Raspberry Pi Logo"
          height="300"
        />
      </section>
      <section data-auto-animate>
        <img
          src="@/assets/img/Raspberry_Pi_Logo.svg"
          alt="Raspberry Pi Logo"
          height="300"
          class="fade-out"
          data-fragment-index="0"
        />
        <h2>Raspberry PI</h2>
      </section>
      <section data-auto-animate>
        <img
          src="@/assets/img/Raspberry_Pi_Logo.svg"
          alt="Raspberry Pi Logo"
          height="300"
          class="fade-out"
          data-fragment-index="0"
        />
        <img
          src="@/assets/img/Raspberry_Pi.png"
          alt="Raspberry Pi"
          height="300"
          class="current-visible"
          data-fragment-index="0"
        />
        <h2>Raspberry PI</h2>
      </section>
      <section data-auto-animate>
        <img
          src="@/assets/img/Raspberry_Pi.png"
          alt="Raspberry Pi"
          height="300"
        />
        <h2>Raspberry PI</h2>
        <div class="r-stack">
          <span class="fragment fade-out" data-fragment-index="0"
            >Buen rendimiento</span
          >
          <span class="fragment current-visible" data-fragment-index="0"
            >Bajo Consumo</span
          >
          <span class="fragment">Muy compacto</span>
        </div>
      </section>
      <section data-auto-animate>
        <div class="flex items-center">
          <div class="w-1/2">
            <img
              src="@/assets/img/Raspberry_Pi.png"
              alt="Raspberry Pi"
              height="300"
            />
            <h2>Raspberry PI</h2>
            <div class="r-stack">
              <div class="fragment fade-out" data-fragment-index="0">
                <span>IOT</span>
              </div>
              <div class="fragment current-visible" data-fragment-index="0">
                <span>Servidores</span>
              </div>
              <div class="fragment" data-fragment-index="2">
                <span>Gaming</span>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="r-stack">
              <div class="fragment fade-out" data-fragment-index="0">
                <img src="@/assets/img/iot.png" height="400" />
              </div>
              <div class="fragment current-visible" data-fragment-index="0">
                <img src="@/assets/img/server.png" height="400" />
              </div>
              <div class="fragment" data-fragment-index="2">
                <img
                  src="@/assets/img/press+start+retro+gaming.gif"
                  height="320"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section data-auto-animate>
        <h3>Precios</h3>
        <i class="fab fa-aws"></i>
        <canvas data-chart="horizontalBar">
          <!--
return {
  data: {
    labels: ["\uf391", "\uf375", "\uf7bb", "\uf1a0", "\uf3ca"],
    datasets: [
      {
        data: [5, 6.81, 80],
        label: "My first dataset",
        backgroundColor: "rgba(20,220,220,.8)"
      }
    ]
  },
  options: {
    pointRadius: 0,  //<- set this
    responsive: true,
    dataset: {
      color: 'red'
    },
    tooltips: {
      titleFontFamily: "'Font Awesome 5 Brands', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    },
    scales: {
      yAxes: [{
        ticks: {
          fontFamily: "'Font Awesome 5 Brands'",
          fontSize: 40
        }
      }]
    }
  }
}
-->
        </canvas>
        <!-- Max potencia, a diario, 24h, 0.15eur el KWH => 10.51 al año -->
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section data-auto-animate>
        <img
          src="@/assets/img/algolia.svg"
          alt="Algolia Logo"
          height="300"
          style="object-fit: cover; width: 305px; object-position: 0% 0"
          data-id="algolia"
        />
      </section>
      <section data-transition="zoom-in">
        <img src="@/assets/img/algolia.svg" alt="Algolia Logo" height="300" />
      </section>
      <section
        data-background-video="@/assets/video/algolia/algolia.mp4"
        data-background-video-preload="auto"
        data-background-video-thumbnails="@/assets/video/algolia/thumbnails.vtt"
        :data-background-video-subtitles-enabled="
          $store.state.settings.subtitles
        "
        :data-background-video-subtitles="
          JSON.stringify([
            {
              label: 'Español',
              srclang: 'es',
              src: require(`@/assets/video/algolia/es.vtt`),
              default: true,
            },
            {
              label: 'English',
              srclang: 'en',
              src: require(`@/assets/video/algolia/en.vtt`),
            },
          ])
        "
        data-background-size="contain"
        data-background-interactive="false"
        :data-background-video-muted="$store.state.settings.muted"
      ></section>
      <section data-auto-animate data-transition="zoom-in fade-out">
        <h3>Uno de los motores más potentes de búsqueda del mercado.</h3>
        <div class="r-stack">
          <img
            width="600"
            height="390"
            src="@/assets/img/flash.gif"
            alt="Flash"
          />
          <img
            width="500"
            height="350"
            class="fragment"
            src="@/assets/img/dentadura-voladora.gif"
            alt="Dentadura voladora"
          />
        </div>
      </section>
      <section
        data-background-iframe="https://react-instantsearch.netlify.app/examples/e-commerce/"
        data-background-interactive="true"
      ></section>
      <section>
        <h3 class="justify">
          Indexa tu html para ofrecerte una experiencía de búsqueda mucho mas
          completa, interactiva y lo más importante: precisa!
        </h3>
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section data-transition="zoom-out">
        <img
          src="@/assets/img/hotjar-square.svg"
          alt="Hotjar square Logo"
          height="300"
        />
      </section>
      <section data-transition="zoom-in">
        <img src="@/assets/img/hotjar.svg" alt="Hotjar Logo" height="300" />
      </section>
      <section
        data-background-video="@/assets/video/hotjar/hotjar.mp4"
        data-background-video-preload="auto"
        :data-background-video-subtitles-enabled="
          $store.state.settings.subtitles
        "
        :data-background-video-subtitles="
          JSON.stringify([
            {
              label: 'Español',
              srclang: 'es',
              src: require('@/assets/video/hotjar/es.vtt'),
              default: true,
            },
            {
              label: 'English',
              srclang: 'en',
              src: require('@/assets/video/hotjar/en.vtt'),
            },
          ])
        "
        data-background-size="contain"
        data-background-interactive="false"
        data-background-video-volume="0.3"
        :data-background-video-muted="$store.state.settings.muted"
      ></section>
    </section>
    <section
      data-background-iframe="https://insights.hotjar.com/h?site=1807485&heatmap=5914349&token=c3971ad9abbcc5774213e71b69553ce7"
      data-background-interactive="true"
    ></section>
    <section
      data-background-iframe="https://insights.hotjar.com/r?site=1807485&recording=3536145500&token=dab1ce0b2b320c0518a82b78bb6b9563"
      data-background-interactive="true"
    ></section>
    <section data-transition="zoom-in fade-out">
      <section data-transition="zoom-out">
        <img
          src="@/assets/img/sentry-square.svg"
          alt="Sentry square Logo"
          height="300"
        />
      </section>
      <section data-transition="zoom-in">
        <img src="@/assets/img/sentry.svg" alt="Sentry Logo" height="300" />
      </section>
      <section
        data-background-video="@/assets/video/sentry/sentry.mp4"
        data-background-video-preload="auto"
        data-background-video-thumbnails="@/assets/video/sentry/thumbnails.vtt"
        :data-background-video-subtitles-enabled="
          $store.state.settings.subtitles
        "
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
      ></section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section data-transition="zoom-out">
        <img
          src="@/assets/img/datadog.svg"
          style="object-fit: cover; width: 305px; object-position: 0% 0"
          alt="DataDog square Logo"
          height="300"
        />
      </section>
      <section data-transition="zoom-in">
        <img src="@/assets/img/datadog.svg" alt="DataDog Logo" height="300" />
      </section>
      <section
        data-background-video="@/assets/video/datadog/datadog.mp4"
        data-background-video-preload="auto"
        data-background-video-thumbnails="@/assets/video/datadog/thumbnails.vtt"
        :data-background-video-subtitles-enabled="
          $store.state.settings.subtitles
        "
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
      ></section>
    </section>
    <section
      data-background-iframe="https://p.datadoghq.com/sb/7svjk4jalcnlifw5-45b3a2a8bc3616303909036435520f53?from_ts=1597338189730&live=true&theme=dark&to_ts=1597424589730"
      data-background-interactive="true"
    ></section>
    <section data-transition="zoom-in fade-out">
      <section>
        <img
          src="@/assets/img/jetbrains.svg"
          alt="Jetbrains Logo"
          height="300"
        />
      </section>
      <section>
        <h3>
          Un vscode especializado en diferentes lenguajes de programación.
        </h3>
      </section>
      <section>
        <h3>
          Ofrece una variedad de IDE's especializados en diferentes lenguajes de
          programación
        </h3>
      </section>
      <section>
        <h3>
          Destaca por su potencia, seguridad e integración con diferentes
          herramientas como docker y git
        </h3>
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section>
        <img
          src="@/assets/img/gitkraken-logo-light-hz.svg"
          alt="Gitkraken Logo"
          height="300"
        />
      </section>
      <section>
        <h3>
          Ahora puedes pescar tus ramas de GIT perdidas de forma interactiva y
          rápida 🎣
        </h3>
        <img src="@/assets/img/homer-pescando.gif" alt="Homer pescando" />
      </section>
    </section>
    <!-- <section data-transition="zoom-in fade-out">
          <section>
            <img src="@/assets/img/tower-logo-dark.svg" alt="Tower Logo" height="300" />
          </section>
          <section>
            <h3>Texto 1</h3>
          </section>
          <section>
            <h3>Texto 2</h3>
          </section>
          <section>
            <h3>Texto 3</h3>
          </section>
        </section> -->
    <section data-transition="zoom-in fade-out">
      <section>
        <img src="@/assets/img/Gitpod.svg" alt="Gitpod Logo" height="300" />
      </section>
      <section>
        <h3>Texto 1</h3>
      </section>
      <section>
        <h3>Texto 2</h3>
      </section>
      <section>
        <h3>Texto 3</h3>
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section>
        <img
          src="@/assets/img/GitHub_Logo_White.png"
          alt="Github Logo"
          height="300"
        />
      </section>
      <section>
        <h3>Texto 1</h3>
      </section>
      <section>
        <h3>Texto 2</h3>
      </section>
      <section>
        <h3>Texto 3</h3>
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section>
        <img
          src="@/assets/img/heroku-logotype-horizontal-white.svg"
          alt="Heroku Logo"
          height="300"
        />
      </section>
      <section>
        <h3>Texto 1</h3>
      </section>
      <section>
        <h3>Texto 2</h3>
      </section>
      <section>
        <h3>Texto 3</h3>
      </section>
    </section>
    <section data-transition="zoom-in fade-out">
      <section>
        <img src="@/assets/img/aws.svg" alt="AWS Logo" height="300" />
      </section>
      <section>
        <h3>Texto 1</h3>
      </section>
      <section>
        <h3>Texto 2</h3>
      </section>
      <section>
        <h3>Texto 3</h3>
      </section>
    </section>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  comments: true,
  methods: {
    // eslint-disable-next-line object-shorthand
    hasRole: function (role) {
      return (
        this.$store.state.auth.loggedIn &&
        this.$store.state.auth.user.role === role
      );
    },
  },
};
</script>
