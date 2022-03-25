/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.child_process = false
    }

    return config
  },
  fallback: {
    child_process: false,
  },
}
