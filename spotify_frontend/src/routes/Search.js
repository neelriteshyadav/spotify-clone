/** @format */

import { Icon } from '@iconify/react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useState } from 'react';
import { authGETReq } from '../utils/serverHelpers';
import SingleSongCard from '../components/shared/SingleSongCard';

const Search = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [songData, setSongData] = useState([]);

	const searchSong = async () => {
		const response = await authGETReq('/podcast/get/podcastname/' + searchText);
		setSongData(response.data);
	};

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
						}}
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								searchSong();
							}
						}}></input>
				</div>

				{songData.length > 0 ? (
					<div className='pt-10 space-y-3'>
						<div className='text-white'>Search results for {searchText}</div>
						{songData.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => {}}
								/>
							);
						})}
					</div>
				) : (
					<div className='text-white pt-10'> Nothing to show here </div>
				)}
			</div>
		</LoggedInContainer>
	);
};

export default Search;
