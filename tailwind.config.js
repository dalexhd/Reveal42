module.exports = {
  future: {
    purgeLayersByDefault: true
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['index.html']
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
