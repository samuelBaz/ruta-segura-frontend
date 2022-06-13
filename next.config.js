/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: false, // se desactiva por que React 18 renderiza 2 veces y llama useEffect 2 veces 🤷‍♂️
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.child_process = false
      config.resolve.fallback = {
        ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
        fs: false, // the solution
      }
    }

    return config
  },
  fallback: {
    child_process: false,
  },
}
