module.exports = {
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === 'production',
        content: [
          'index.html'
        ]
    },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: []
}