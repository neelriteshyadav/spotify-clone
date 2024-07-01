/** @format */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleSongCard from '../components/shared/SingleSongCard';
import { authGETReq } from '../utils/serverHelpers';
import { Howl, Howler } from 'howler';
import LoggedInContainer from '../containers/LoggedInContainer';

const MyMusic = () => {
	const [songData, setSongData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await authGETReq('/podcast/get/mypodcasts');
			setSongData(response.data);
		};
		getData();
	});
	return (
		<LoggedInContainer curActiveScreen='mymusic'>
			<div className='text-white text-xl font-semibold pb-4 pl-3 pt-8'>
				My Podcasts
			</div>
			<div className='space-y-3 overflow-auto'>
				{songData.map((item) => {
					return (
						<SingleSongCard
							info={item}
							playSound={() => {}}
						/>
					);
				})}
			</div>
		</LoggedInContainer>
	);
};

export default MyMusic;
