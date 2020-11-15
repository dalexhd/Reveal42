// we can either import Klaro without styles...
import * as Klaro from "klaro";

// we define a minimal configuration
const config = {
  htmlTexts: true,
  acceptAll: true,
  translations: {
    es: {
      consentNotice: {
        description:
          "¡Hola! ¿Me deja habilitar algunos servicios adicionales con el único fin de <b>mejorar esta plataforma</b>? Siempre podrá cambiar o retirar su consentimiento en el menú situado en la parte superior derecha.",
        learnMore: "Ajustar manualmente",
      },
      consentModal: {
        description:
          "Aquí puede evaluar y personalizar los servicios que nos gustaría utilizar en este sitio web. ¡Usted decide! Habilite o deshabilite los servicios como considere oportuno.",
        privacyPolicy: {
          name: "política de privacidad",
          text: "Para saber más, por favor lea nuestra {privacyPolicy}.",
          title: "Servicios que nos gustaría utilizar",
        },
      },
      purposes: {
        analytics: {
          title: "Analítica Web",
          description:
            "Recopilan información anónima sobre cómo los visitantes utilizan nuestra página web con el fin de mejorarla.",
        },
        presentation: {
          title: "Contenido opcional de la presentación",
        },
      },
    },
  },
  services: [
    {
      name: "googleAnalytics",
      title: "Google Analytics",
      description:
        "El servicio de Google Analytics utiliza cookies para evaluar el uso de nuestras páginas web, para recopilar informes sobre la interacción de los usuarios en ellas, así como para proporcionarnos servicios adicionales de Internet.",
      cookies: [/^ga/i],
      purposes: ["analytics"],
    },
    {
      name: "hotjar",
      title: "Hotjar",
      description:
        "Hotjar es un servicio tecnológico que nos ayuda a comprender mejor la experiencia de los usuarios de nuestro sitio web (por ejemplo, cuánto tiempo pasan y en qué páginas, en qué enlaces eligen hacer clic, qué les gusta y qué no les gusta, etc.), lo que nos permite mantener y mejorar nuestros servicios.",
      cookies: [/^_hj.*$/],
      purposes: ["analytics"],
    },
    {
      name: "OAuth2",
      title: "Oauth 2.0",
      description:
        "Esta cookie se establece cuando el cliente inicia sesión en la intranet de 42. Se utiliza para mantener la sesión activa con el servidor en el que está alojada la presentación.",
      cookies: ["connect.sid", /^auth.*$/],
      required: true,
      purposes: ["functional"],
    },
    {
      name: "42intra",
      title: "42 Intranet",
      description:
        "Esta cookie se establece cuando el cliente inicia sesión en la intranet de 42. Se utiliza para mantener la Id. del usuario autentificado, y esta se borra cuando el usuario cierra el navegador.",
      cookies: ["_intra_42_session_production"],
      required: true,
      purposes: ["functional"],
    },
    {
      purposes: ["analytics"],
      name: "netlify-e-commerce-demo",
      contextualConsentOnly: true,
    },
    {
      purposes: ["marketing"],
      name: "demo-youtube",
    },
    {
      purposes: ["marketing"],
      name: "demo-twitter",
      contextualConsentOnly: true,
    },
  ],
};

// we assign the Klaro module to the window, so that we can access it in JS
window.klaro = Klaro;
window.klaroConfig = config;
// we set up Klaro with the config
Klaro.setup(config);
