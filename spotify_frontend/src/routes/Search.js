/** @format */

import { Icon } from '@iconify/react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useState } from 'react';

const Search = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	return (
		<LoggedInContainer curActiveScreen='search'>
			<div className='w-full py-6'>
				<div
					className={`w-1/3 p-3 text-sm rounded-full bg-black px-5 flex text-white space-x-3 items-center ${
						isInputFocused ? 'border border-white' : ''
					}`}>
					<Icon
						icon='ic:outline-search'
						className='text-lg'
					/>
					<input
						type='text'
						placeholder='What do you want to listen to?'
						className='w-full bg-black focus:outline-none'
						onFocus={() => {
							setIsInputFocused(true);
						}}
						onBlur={() => {
							setIsInputFocused(false);
						}}></input>
				</div>
			</div>
		</LoggedInContainer>
	);
};

export default Search;
