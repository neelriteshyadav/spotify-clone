import { useState } from 'react';
import { Icon } from '@iconify/react';
import Textinput from '../components/shared/Textinput';
import Passwordinput from '../components/shared/Passwordinput';
import {Link, useNavigate} from 'react-router-dom';
import { unauthPOSTReq } from '../utils/serverHelpers';
import {useCookies} from 'react-cookie';

const SignupComponent = () => {
	const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
	// eslint-disable-next-line
	const [cookie, setCookie] = useCookies(["token"]);
	const navigate = useNavigate();

	const signup = async () => {
		if(email !== confirmEmail){
			alert("Please enter the same email");
			return;
		}
		const data = {email, password, username, firstName, lastName};
		const response = await unauthPOSTReq(
			"/auth/register",
			data
		);
		
		if(response && !response.err) {
			const token = response.token;
			const date = new Date();
			date.setDate(date.getDate() + 30);
			setCookie("token", token, {
			path: '/',
			expires: date
		});
			alert("Success");
			navigate("/home");
		}
		else{
			alert("Failure");
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
				<div className='font-bold mb-4 text-2xl'>Sign up for free to start listening.</div>
				<Textinput
					label='Email address'
					placeholder='Enter your email'
					className='my-6'
					value={email}
					setValue={setEmail}
				/>
				<Textinput
				label='Confirm email address'
				placeholder='Enter your email again'
				className='mb-6'
				value={confirmEmail}
                setValue={setConfirmEmail}
				/>
				<Textinput
				label='Enter your username'
				placeholder='Enter your username'
				className='mb-6'
				value={username}
                    setValue={setUsername}
				/>
				<Passwordinput
					label='Create Password'
					placeholder='Enter a strong password here'
					value={password}
                    setValue={setPassword}
				/>
				<div className='w-full flex justify-between items-center space-x-8'>
					<Textinput
					label='First Name'
					placeholder='Enter your first name'
					className='my-6'
					value={firstName}
                        setValue={setFirstName}
					/>
					<Textinput
					label='Last Name'
					placeholder='Enter your last name'
					className='my-6'
					value={lastName}
					setValue={setLastName}
					/>
				</div>
				<div className='w-full flex justify-center items-center my-8'>
					<button className='bg-green-400 font-semibold p-3 px-10 rounded-full'
					onClick={(e) => {
						e.preventDefault();
						signup();
					}}>
						SIGN UP
					</button>
				</div>
				<div className='border border-solid border-gray-300 w-full'></div>
				<div className='my-6 font-semibold text-lg'>Already have an account?</div>
				<div className='w-full py-4 text-gray-500 font-bold rounded-full border border-gray-500 flex justify-center items-center'>
					<Link to="/login">
					LOG IN INSTEAD
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignupComponent;
