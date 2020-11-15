import Plyr from "plyr/dist/plyr.polyfilled";
import {
  HORIZONTAL_SLIDES_SELECTOR,
  VERTICAL_SLIDES_SELECTOR,
} from "../utils/constants.js";
import { extend, queryAll, closest, sleep } from "../utils/util.js";
import { isMobile } from "../utils/device.js";

/**
 * Handles loading, unloading and playback of slide
 * content such as images, videos and iframes.
 */
export default class SlideContent {
  constructor(Reveal) {
    this.Reveal = Reveal;
    this.startEmbeddedIframe = this.startEmbeddedIframe.bind(this);
  }

  /**
   * Should the given element be preloaded?
   * Decides based on local element attributes and global config.
   *
   * @param {HTMLElement} element
   */
  shouldPreload(element) {
    // Prefer an explicit global preload setting
    let preload = this.Reveal.getConfig().preloadIframes;

    // If no global setting is available, fall back on the element's
    // own preload setting
    if (typeof preload !== "boolean") {
      preload = element.hasAttribute("data-preload");
    }

    return preload;
  }

  /**
   * Called when the given slide is within the configured view
   * distance. Shows the slide element and loads any content
   * that is set to load lazily (data-src).
   *
   * @param {HTMLElement} slide Slide to show
   */
  load(slide, options = {}) {
    // Show the slide element
    slide.style.display = this.Reveal.getConfig().display;

    // Media elements with data-src attributes
    queryAll(
      slide,
      "img[data-src], video[data-src], audio[data-src], iframe[data-src]"
    ).forEach((element) => {
      if (element.tagName !== "IFRAME" || this.shouldPreload(element)) {
        element.setAttribute("src", element.getAttribute("data-src"));
        element.setAttribute("data-lazy-loaded", "");
        element.removeAttribute("data-src");
      }
    });

    // Media elements with <source> children
    queryAll(slide, "video, audio").forEach((media) => {
      let sources = 0;

      queryAll(media, "source[data-src]").forEach((source) => {
        source.setAttribute("src", source.getAttribute("data-src"));
        source.removeAttribute("data-src");
        source.setAttribute("data-lazy-loaded", "");
        sources += 1;
      });

      // If we rewrote sources for this video/audio element, we need
      // to manually tell it to load from its new origin
      if (sources > 0) {
        media.load();
      }
    });

    // Show the corresponding background element
    const background = slide.slideBackgroundElement;
    if (background) {
      background.style.display = "block";

      const backgroundContent = slide.slideBackgroundContentElement;
      const backgroundIframe = slide.getAttribute("data-background-iframe");
      const backgroundName = slide.getAttribute("data-background-name");
      let backgroundIframes = slide.getAttribute("data-background-iframes");
      // If the background contains media, load it
      if (background.hasAttribute("data-loaded") === false) {
        background.setAttribute("data-loaded", "true");

        const backgroundImage = slide.getAttribute("data-background-image");
        const backgroundVideo = slide.getAttribute("data-background-video");
        let backgroundVideoSubtitles = slide.getAttribute(
          "data-background-video-subtitles"
        );
        let backgroundVideoSubtitlesEnabled = slide.getAttribute(
          "data-background-video-subtitles-enabled"
        );
        const backgroundVideoPreload = slide.getAttribute(
          "data-background-video-preload"
        );
        const backgroundVideoThumbnails = slide.getAttribute(
          "data-background-video-thumbnails"
        );
        const backgroundVideoVolume = slide.getAttribute(
          "data-background-video-volume"
        );
        const backgroundVideoLoop = slide.hasAttribute(
          "data-background-video-loop"
        );
        const backgroundInteractive = slide.getAttribute(
          "data-background-interactive"
        );
        const backgroundVideoMuted = slide.hasAttribute(
          "data-background-video-muted"
        );

        // Images
        if (backgroundImage) {
          backgroundContent.style.backgroundImage = `url(${encodeURI(
            backgroundImage
          )})`;
        }
        // Videos
        else if (backgroundVideo) {
          const video = document.createElement("video");
          const { h, v } = this.Reveal.getIndices(slide);
          video.id = ("id", `${backgroundVideo}-${h}-${v}`);
          let plyrOptions = {
            ...Plyr.defaults,
            debug: false,
            storage: {
              enabled: false,
            },
          };
          plyrOptions.autoPlay = false;
          if (backgroundVideoLoop) {
            video.setAttribute("loop", "");
          }
          if (backgroundVideoPreload) {
            video.setAttribute("preload", backgroundVideoPreload);
          }
          if (this.Reveal.role === "broadcaster") {
            plyrOptions.volume = backgroundVideoVolume
              ? parseFloat(backgroundVideoVolume)
              : 1;
          }
          if (
            backgroundVideoMuted ||
            (this.Reveal.isSpeakerNotes() &&
              !this.Reveal.getConfig().postMessageEvents)
          ) {
            video.setAttribute("muted", "");
          }

          // Inline video playback works (at least in Mobile Safari) as
          // long as the video is muted and the `playsinline` attribute is
          // present
          if (isMobile) {
            // video.setAttribute('muted', '');
            // video.setAttribute("autoplay", "");
            video.setAttribute("playsinline", "");
          }

          // Support comma separated lists of video sources
          backgroundVideo.split(",").forEach((source) => {
            video.innerHTML += `<source src="${source}">`;
          });

          if (backgroundVideoSubtitles) {
            backgroundVideoSubtitles = JSON.parse(backgroundVideoSubtitles);
            backgroundVideoSubtitles.forEach((subtitle) => {
              video.innerHTML += `<track label="${
                subtitle.label
              }" kind="subtitles" srclang="${subtitle.srclang}" src="${
                subtitle.src
              }" ${subtitle.default ? "default" : ""} />`;
            });
            if (typeof backgroundVideoSubtitlesEnabled === "undefined") {
              backgroundVideoSubtitlesEnabled = true;
            }
            plyrOptions = {
              ...plyrOptions,
              captions: {
                active: backgroundVideoSubtitlesEnabled,
                language: "es",
                update: false,
              },
            };
          }
          if (backgroundVideoThumbnails) {
            plyrOptions = {
              ...plyrOptions,
              previewThumbnails: {
                src: backgroundVideoThumbnails,
                enabled: true,
              },
            };
          }

          video.setAttribute("controls", "");
          backgroundContent.appendChild(video);
          if (
            backgroundInteractive &&
            backgroundInteractive === "false" &&
            !(
              this.Reveal.isSpeakerNotes() &&
              this.Reveal.getConfig().postMessageEvents
            )
          ) {
            plyrOptions.controls = [];
            backgroundContent.style.pointerEvents = "none";
          }
          const player = new Plyr(video, plyrOptions);
          if (
            this.Reveal.isSpeakerNotes() &&
            this.Reveal.getConfig().postMessageEvents
          ) {
            [
              "ready",
              "play",
              "pause",
              "seeked",
              "volumechange",
              "controlshidden",
              "controlsshown",
            ].forEach((event) => {
              player.on(event, ({ detail: { plyr } }) => {
                // Some ignore conditions
                if (
                  (event === "pause" && plyr.currentTime === 0) ||
                  (event === "seeked" && plyr.currentTime < 0.2) ||
                  (event === "pause" && plyr.seeking === true)
                )
                  return;
                // We emit events to the parent window (notes window).
                window.parent.postMessage(
                  JSON.stringify({
                    namespace: "plyr",
                    type: event,
                    data: {
                      id: plyr.media.id,
                      isHTML5: plyr.isHTML5,
                      isEmbed: plyr.isEmbed,
                      playing: plyr.playing,
                      paused: plyr.paused,
                      stopped: plyr.stopped,
                      ended: plyr.ended,
                      buffered: plyr.buffered,
                      currentTime: plyr.currentTime,
                      seeking: plyr.seeking,
                      duration: plyr.duration,
                      volume: plyr.volume,
                      muted: plyr.muted,
                      hasAudio: plyr.hasAudio,
                      speed: plyr.speed,
                      quality: plyr.quality,
                      loop: plyr.loop,
                      source: plyr.source,
                      poster: plyr.poster,
                      autoplay: plyr.autoplay,
                      currentTrack: plyr.currentTrack,
                      language: plyr.language,
                      pip: plyr.pip,
                      ratio: plyr.ratio,
                      download: plyr.download,
                      fullScreenActive: plyr.fullscreen.active,
                      fullScreenEnabled: plyr.fullscreen.enabled,
                    },
                  }),
                  "*"
                );
              });
            });
            setInterval(() => {
              const { h, v } = this.Reveal.getIndices();
              if (player.media.id === `${backgroundVideo}-${h}-${v}`) {
                window.parent.postMessage(
                  JSON.stringify({
                    namespace: "plyr",
                    type: "currentState",
                    data: {
                      id: player.media.id,
                      isHTML5: player.isHTML5,
                      isEmbed: player.isEmbed,
                      playing: player.playing,
                      paused: player.paused,
                      stopped: player.stopped,
                      ended: player.ended,
                      buffered: player.buffered,
                      currentTime: player.currentTime,
                      seeking: player.seeking,
                      duration: player.duration,
                      volume: player.volume,
                      muted: player.muted,
                      hasAudio: player.hasAudio,
                      speed: player.speed,
                      quality: player.quality,
                      loop: player.loop,
                      source: player.source,
                      poster: player.poster,
                      autoplay: player.autoplay,
                      currentTrack: player.currentTrack,
                      language: player.language,
                      pip: player.pip,
                      ratio: player.ratio,
                      download: player.download,
                      fullScreenActive: player.fullscreen.active,
                      fullScreenEnabled: player.fullscreen.enabled,
                    },
                  }),
                  "*"
                );
              }
            }, 1000);
          }
        }
        // Iframe
        else if (backgroundIframe && options.excludeIframes !== true) {
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("mozallowfullscreen", "");
          iframe.setAttribute("webkitallowfullscreen", "");

          iframe.setAttribute("data-src", backgroundIframe);

          if (backgroundName) {
            iframe.setAttribute("data-name", backgroundName);
          }

          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.maxHeight = "100%";
          iframe.style.maxWidth = "100%";

          backgroundContent.appendChild(iframe);
        }
        // Iframes
        else if (backgroundIframes && options.excludeIframes !== true) {
          backgroundIframes = backgroundIframes.split(/[\s,]+/);
          backgroundIframes.forEach((backgroundIframe, index) => {
            const iframe = document.createElement("iframe");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("mozallowfullscreen", "");
            iframe.setAttribute("webkitallowfullscreen", "");
            iframe.setAttribute("allowTransparency", "true");
            iframe.setAttribute("data-src", backgroundIframe);

            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.maxHeight = "100%";
            iframe.style.maxWidth = "100%";
            if (index === 0) {
              iframe.style.position = "fixed";
            }

            backgroundContent.appendChild(iframe);
          });
        }
      }

      // Start loading preloadable iframes
      const backgroundIframeElement = backgroundContent.querySelector(
        "iframe[data-src]"
      );
      if (backgroundIframeElement) {
        // Check if this iframe is eligible to be preloaded
        if (
          this.shouldPreload(background) &&
          !/autoplay=(1|true|yes)/gi.test(backgroundIframe)
        ) {
          if (
            backgroundIframe !== null &&
            backgroundIframeElement.getAttribute("src") !== backgroundIframe
          ) {
            backgroundIframeElement.setAttribute("src", backgroundIframe);
          }
        }
      }
    }
  }

  /**
   * Unloads and hides the given slide. This is called when the
   * slide is moved outside of the configured view distance.
   *
   * @param {HTMLElement} slide
   */
  unload(slide) {
    // Hide the slide element
    slide.style.display = "none";

    // Hide the corresponding background element
    const background = this.Reveal.getSlideBackground(slide);
    if (background) {
      background.style.display = "none";

      // Unload any background iframes
      queryAll(background, "iframe[src]").forEach((element) => {
        element.removeAttribute("src");
      });
    }

    // Reset lazy-loaded media elements with src attributes
    queryAll(
      slide,
      "video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]"
    ).forEach((element) => {
      element.setAttribute("data-src", element.getAttribute("src"));
      element.removeAttribute("src");
    });

    // Reset lazy-loaded media elements with <source> children
    queryAll(
      slide,
      "video[data-lazy-loaded] source[src], audio source[src]"
    ).forEach((source) => {
      source.setAttribute("data-src", source.getAttribute("src"));
      source.removeAttribute("src");
    });
  }

  /**
   * Enforces origin-specific format rules for embedded media.
   */
  formatEmbeddedContent() {
    const _appendParamToIframeSource = (sourceAttribute, sourceURL, param) => {
      queryAll(
        this.Reveal.getSlidesElement(),
        `iframe[${sourceAttribute}*="${sourceURL}"]`
      ).forEach((el) => {
        const src = el.getAttribute(sourceAttribute);
        if (src && !src.includes(param)) {
          el.setAttribute(
            sourceAttribute,
            src + (!/\?/.test(src) ? "?" : "&") + param
          );
        }
      });
    };

    // YouTube frames must include "?enablejsapi=1"
    _appendParamToIframeSource("src", "youtube.com/embed/", "enablejsapi=1");
    _appendParamToIframeSource(
      "data-src",
      "youtube.com/embed/",
      "enablejsapi=1"
    );

    // Vimeo frames must include "?api=1"
    _appendParamToIframeSource("src", "player.vimeo.com/", "api=1");
    _appendParamToIframeSource("data-src", "player.vimeo.com/", "api=1");
  }

  /**
   * Start playback of any embedded content inside of
   * the given element.
   *
   * @param {HTMLElement} element
   */
  startEmbeddedContent(element) {
    if (element) {
      // Restart GIFs
      queryAll(element, 'img[src$=".gif"]').forEach((el) => {
        // Setting the same unchanged source like this was confirmed
        // to work in Chrome, FF & Safari
        el.setAttribute("src", el.getAttribute("src"));
      });

      // HTML5 media elements
      queryAll(element, "video, audio").forEach((el) => {
        if (closest(el, ".fragment") && !closest(el, ".fragment.visible")) {
          return;
        }

        // Prefer an explicit global autoplay setting
        let autoplay = this.Reveal.getConfig().autoPlayMedia;

        // If no global setting is available, fall back on the element's
        // own autoplay setting
        if (typeof autoplay !== "boolean") {
          autoplay =
            el.hasAttribute("data-autoplay") ||
            !!closest(el, ".slide-background");
        }

        if (autoplay && typeof el.play === "function") {
          // If the media is ready, start playback
          if (el.readyState > 1) {
            this.startEmbeddedMedia({ target: el });
          }
          // Mobile devices never fire a loaded event so instead
          // of waiting, we initiate playback
          else if (isMobile) {
            const promise = el.play();

            // If autoplay does not work, ensure that the controls are visible so
            // that the viewer can start the media on their own
            if (
              promise &&
              typeof promise.catch === "function" &&
              el.controls === false
            ) {
              promise.catch(() => {
                el.controls = true;

                // Once the video does start playing, hide the controls again
                el.addEventListener("play", () => {
                  el.controls = false;
                });
              });
            }
          }
          // If the media isn't loaded, wait before playing
          else {
            el.removeEventListener("loadeddata", this.startEmbeddedMedia); // remove first to avoid dupes
            el.addEventListener("loadeddata", this.startEmbeddedMedia);
          }
        }
      });

      // Normal iframes
      queryAll(element, "iframe[src]").forEach((el) => {
        if (closest(el, ".fragment") && !closest(el, ".fragment.visible")) {
          return;
        }

        this.startEmbeddedIframe({ target: el });
      });

      // Lazy loading iframes
      queryAll(element, "iframe[data-src]").forEach((el) => {
        if (closest(el, ".fragment") && !closest(el, ".fragment.visible")) {
          return;
        }

        if (el.getAttribute("src") !== el.getAttribute("data-src")) {
          el.removeEventListener("load", this.startEmbeddedIframe); // remove first to avoid dupes
          el.addEventListener("load", this.startEmbeddedIframe);
          el.setAttribute("src", el.getAttribute("data-src"));
        }
      });
    }
  }

  /**
   * Starts playing an embedded video/audio element after
   * it has finished loading.
   *
   * @param {object} event
   */
  startEmbeddedMedia(event) {
    const isAttachedToDOM = !!closest(event.target, "html");
    const isVisible = !!closest(event.target, ".present");

    if (isAttachedToDOM && isVisible) {
      event.target.currentTime = 0;
      event.target.play();
    }

    event.target.removeEventListener("loadeddata", this.startEmbeddedMedia);
  }

  /**
   * "Starts" the content of an embedded iframe using the
   * postMessage API.
   *
   * @param {object} event
   */
  startEmbeddedIframe(event) {
    const iframe = event.target;

    if (iframe && iframe.contentWindow) {
      const isAttachedToDOM = !!closest(event.target, "html");
      const isVisible = !!closest(event.target, ".present");

      if (isAttachedToDOM && isVisible) {
        // Prefer an explicit global autoplay setting
        let autoplay = this.Reveal.getConfig().autoPlayMedia;

        // If no global setting is available, fall back on the element's
        // own autoplay setting
        if (typeof autoplay !== "boolean") {
          autoplay =
            iframe.hasAttribute("data-autoplay") ||
            !!closest(iframe, ".slide-background");
        }

        // YouTube postMessage API
        if (
          /youtube\.com\/embed\//.test(iframe.getAttribute("src")) &&
          autoplay
        ) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        }
        // Vimeo postMessage API
        else if (
          /player\.vimeo\.com\//.test(iframe.getAttribute("src")) &&
          autoplay
        ) {
          iframe.contentWindow.postMessage('{"method":"play"}', "*");
        }
        // Generic postMessage API
        else {
          iframe.contentWindow.postMessage("slide:start", "*");
        }
      }
    }
  }

  /**
   * Stop playback of any embedded content inside of
   * the targeted slide.
   *
   * @param {HTMLElement} element
   */
  stopEmbeddedContent(element, options = {}) {
    options = extend(
      {
        // Defaults
        unloadIframes: true,
      },
      options
    );

    if (element && element.parentNode) {
      // HTML5 media elements
      queryAll(element, "video, audio").forEach((el) => {
        if (!el.hasAttribute("data-ignore") && typeof el.pause === "function") {
          el.setAttribute("data-paused-by-reveal", "");
          el.pause();
        }
      });

      // Generic postMessage API for non-lazy loaded iframes
      queryAll(element, "iframe").forEach((el) => {
        if (el.contentWindow) el.contentWindow.postMessage("slide:stop", "*");
        el.removeEventListener("load", this.startEmbeddedIframe);
      });

      // YouTube postMessage API
      queryAll(element, 'iframe[src*="youtube.com/embed/"]').forEach((el) => {
        if (
          !el.hasAttribute("data-ignore") &&
          el.contentWindow &&
          typeof el.contentWindow.postMessage === "function"
        ) {
          el.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      });

      // Vimeo postMessage API
      queryAll(element, 'iframe[src*="player.vimeo.com/"]').forEach((el) => {
        if (
          !el.hasAttribute("data-ignore") &&
          el.contentWindow &&
          typeof el.contentWindow.postMessage === "function"
        ) {
          el.contentWindow.postMessage('{"method":"pause"}', "*");
        }
      });

      if (options.unloadIframes === true) {
        // Unload lazy-loaded iframes
        queryAll(element, "iframe[data-src]").forEach((el) => {
          // Only removing the src doesn't actually unload the frame
          // in all browsers (Firefox) so we set it to blank first
          el.setAttribute("src", "about:blank");
          el.removeAttribute("src");
        });
      }
    }
  }
}
