const nextConfig = {
  output: 'export',
  distDir: './dist',
  images: {
    deviceSizes: [375, 768, 1024, 1440, 1920, 2560, 3840],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

export default nextConfig;
