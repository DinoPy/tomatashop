import React from 'react';
import Layout from '../../components/layout';
import RegisterPage from '../../components/RegisterPage/RegisterPage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Register = () => {
	const { data: session } = useSession();
	const router = useRouter();

	if (session) {
		router.push('/');
	}

	return (
		<Layout>
			<RegisterPage />
		</Layout>
	);
};

export default Register;
