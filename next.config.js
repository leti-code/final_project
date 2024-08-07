const withPWA = require("next-pwa");

//Configuration of pwa and allowed domains to display images (apart from local)
module.exports = withPWA({
    pwa: {
        dest: "public"
    },
    images: {
        domains: [
            "res.cloudinary.com"
        ],
    }
});
