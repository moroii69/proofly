/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: { unoptimized: true },
    // Enable the use of subdomains, making sure the paths are handled correctly.
    // Optionally, you can handle redirects or other configurations if necessary.
    async redirects() {
        return [
            {
                source: "/docs/:slug*",
                destination: "/docs/:slug*", // Ensure the /docs path works for subdomains.
                permanent: true,
            },
        ];
    },
    // Optional: Add custom headers or handling for different environments.
    headers() {
        return [
            {
                source: "/docs/:slug*",
                headers: [
                    {
                        key: "X-Custom-Header",
                        value: "some-value",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
