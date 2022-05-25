const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ],
  }
})
