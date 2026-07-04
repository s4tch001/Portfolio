/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static, pre-rendered HTML export — every section's content ships in
  // the initial HTML (great for SEO) and deploys to Netlify as static files.
  output: 'export',
  // <img> tags are used directly, so skip the Image Optimization pipeline
  // (which isn't available in a static export anyway).
  images: { unoptimized: true },
};

export default nextConfig;
