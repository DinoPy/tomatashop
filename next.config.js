/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'fakestoreapi.com',
			'res.cloudinary.com',
			'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
			'lh3.googleusercontent.com',
			'tomatastore.s3.eu-central-1.amazonaws.com',
		],
	},
};

module.exports = nextConfig;
