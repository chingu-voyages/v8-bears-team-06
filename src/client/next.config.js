module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }

    return config;
  },

  env: {
    UPLOAD_PRESET: "aqzs3lv0",
    CLOUD_NAME: "dcagt6ogi"
  }
};
