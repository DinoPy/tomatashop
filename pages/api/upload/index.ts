import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req.body);
	if (req.method === 'POST') {
		const key = `${'idtest'}/${uuidv4()}.png`;
		const s3Params = {
			Bucket: 'tomatastore',
			// the id of the user should be received from the front end.
			Key: key,
			ContentType: 'image/jpeg',
		};

		s3.getSignedUrl('putObject', s3Params, (err, url) => {
			console.log(url);
			console.log(err);
			return res.status(200).json({ url, key });
		});

		// s3.delete
		// const command = new PutObjectCommand(s3Params);
		// const signedUrl = await getSignedUrl(s3Client, command, {
		// 	expiresIn: 60 * 60 * 24,
		// });

		// console.log(signedUrl);
	}
}
// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/src/s3_put_presignedURL.js
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/js-sdk-dg.pdf#loading-node-credentials-environment
