<template>
  <div id="app" class="reveal">
    <!-- Any section element inside of this container is displayed as a slide -->
    <Enchanced />
    <Slides />
    <Particles v-if="$store.state.settings.particles" />
    <Snackbar />
    <client-only>
      <RevealScript />
    </client-only>
  </div>
</template>
<script>
import Slides from "../components/Slides";
import Particles from "../components/Particles";
import Snackbar from "../components/Snackbar";
import Enchanced from "../components/Enchanced";

export default {
  components: {
    Slides,
    Particles,
    Enchanced,
    Snackbar,
    RevealScript() {
      if (process.client) {
        return import("../components/RevealScript");
      }
    },
  },
  layout: "presentation",
  head({
    $config: { googleAnalyticsId, hotjarSiteId, amplitudeKey, metomicId },
    $route: { query },
  }) {
    const isReceiver = query.receiver === null;
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/themes/black.css",
          id: "theme",
          pbody: true,
        },
      ],
      script: [
        googleAnalyticsId && !isReceiver
          ? {
              src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
              type: "text/x-metomic",
              "data-micropolicy": "statistics",
              async: true,
            }
          : {},
        googleAnalyticsId && !isReceiver
          ? {
              hid: "gtm-script",
              type: "text/x-metomic",
              "data-micropolicy": "statistics",
              innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsId}', {'page_path': location.pathname + location.search + location.hash});`,
            }
          : {},
        hotjarSiteId && !isReceiver
          ? {
              hid: "hotjar-script",
              type: "text/x-metomic",
              "data-micropolicy": "statistics",
              innerHTML: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarSiteId},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }
          : {},
        amplitudeKey && !isReceiver
          ? {
              hid: "amplitude-script",
              type: "text/x-metomic",
              "data-micropolicy": "statistics",
              innerHTML: `(function(b,e){function f(a,b){a.prototype[b]=function(){return this._q.push([b].concat(Array.prototype.slice.call(arguments,0))),this}}function g(a){function b(b){a[b]=function(){a._q.push([b].concat(Array.prototype.slice.call(arguments,0)))}}for(var c=0;c<o.length;c++)b(o[c])}var h=b.amplitude||{_q:[],_iq:{}},j=e.createElement("script");j.type="text/javascript",j.integrity="sha384-girahbTbYZ9tT03PWWj0mEVgyxtZoyDF9KVZdL+R53PP5wCY0PiVUKq0jeRlMx9M",j.crossOrigin="anonymous",j.async=!0,j.src="https://cdn.amplitude.com/libs/amplitude-7.2.1-min.gz.js",j.onload=function(){b.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var k=e.getElementsByTagName("script")[0];k.parentNode.insertBefore(j,k);for(var i=function(){return this._q=[],this},m=["add","append","clearAll","prepend","set","setOnce","unset"],a=0;a<m.length;a++)f(i,m[a]);h.Identify=i;for(var n=function(){return this._q=[],this},c=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"],l=0;l<c.length;l++)f(n,c[l]);h.Revenue=n;var o=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"];g(h),h.getInstance=function(a){return a=(a&&0!==a.length?a:"$default_instance").toLowerCase(),h._iq.hasOwnProperty(a)||(h._iq[a]={_q:[]},g(h._iq[a])),h._iq[a]},b.amplitude=h})(window,document),amplitude.getInstance().init("${amplitudeKey}");`,
            }
          : {},
        metomicId && !isReceiver
          ? {
              src: `https://config.metomic.io/config.js?id=${metomicId}`,
              crossorigin: true,
              charset: "utf-8",
            }
          : {},
        metomicId && !isReceiver
          ? {
              src: "https://consent-manager.metomic.io/embed.js",
              crossorigin: true,
              charset: "utf-8",
            }
          : {},
      ],
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/css/pages/index.scss";
</style>
