import VuexPersistence from "vuex-persist";
import * as Cookies from "js-cookie";
import cookie from "cookie";
export default ({ store, req, isDev }) => {
  new VuexPersistence({
    key: "settings",
    reducer: (state) => {
      return {
        settings: state.settings,
      };
    },
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server && req.headers.cookie) {
          const parsedCookies = cookie.parse(req.headers.cookie);
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key),
    },
  }).plugin(store);
};
