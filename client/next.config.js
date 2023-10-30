/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Defaults to 50MB
        isrMemoryCacheSize: 0, // cache size in bytes
      },
    images : {
        domains : [
            "res.cloudinary.com",
            "t3.ftcdn.net",
            "https://raw.githubusercontent.com/"
        ]
    }
}

module.exports = nextConfig
