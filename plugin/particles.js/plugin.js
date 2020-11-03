/* global particlesJS */
/**
 * Reveal Plugin
 * https://revealjs.com/creating-plugins/
 */
import 'particles.js/particles';

const initParticles = function (Reveal) {
  // check if particles option is given or not
  var particles = Reveal.getConfig().particlesJS || {};
  particlesJS('particles', particles);
};

export default () => {
  return {
    id: 'RevealParticles',
    init: function (deck) {
      initParticles(deck);
    }
  };
};
