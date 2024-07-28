/** @format */

import { Icon } from '@iconify/react';
import Textinput from '../components/shared/Textinput';
import Passwordinput from '../components/shared/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { unauthPOSTReq } from '../utils/serverHelpers';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const LoginComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// eslint-disable-next-line
	const [cookie, setCookie] = useCookies(['token']);
	const navigate = useNavigate();

	const login = async () => {
		const data = { email, password };
		const response = await unauthPOSTReq('/auth/login', data);
		if (response && !response.err) {
			//console.log(response);
			const token = response.token;
			//console.log(token);
			const date = new Date();
			date.setDate(date.getDate() + 30);
			setCookie('token', token, {
				path: '/',
				expires: date,
			});
			alert('Success');
			navigate('/home');
		} else {
			alert('Failure');
		}
	};

	return (
		<div className='w-full h-full flex flex-col items-center'>
			<div className='logo p-5 border-b border-solid border-gray-200 w-full flex justify-center'>
				<Icon
					icon='logos:spotify'
					width='150'
				/>
			</div>
			<div className='inputRegion w-1/3 py-10 flex flex-col justify-center items-center'>
				<div className='font-bold mb-4'>To continue, login to Spotify.</div>
				<Textinput
					label='Email address or username'
					placeholder='Email address or username'
					className='my-6'
					value={email}
					setValue={setEmail}
				/>
				<Passwordinput
					label='Password'
					placeholder='Password'
					value={password}
					setValue={setPassword}
				/>
				<div className='w-full flex justify-end items-center my-8'>
					<button
						className='bg-green-400 font-semibold p-3 px-10 rounded-full'
						onClick={(e) => {
							e.preventDefault();
							login();
						}}>
						LOG IN
					</button>
				</div>
				<div className='border border-solid border-gray-300 w-full'></div>
				<div className='my-6 font-semibold text-lg'>Don't have an account?</div>
				<div className='w-full py-4 text-gray-500 font-bold rounded-full border border-gray-500 flex justify-center items-center'>
					<Link to='/signup'>SIGN UP FOR SPOTIFY</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;
