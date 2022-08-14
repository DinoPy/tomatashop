import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const products = await fetch('https://fakestoreapi.com/products').then(
		(res) => res.json()
	);
	res.status(200).json(products);
}
