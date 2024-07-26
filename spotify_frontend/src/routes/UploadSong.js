/** @format */

import IconText from '../components/shared/IconText';
import TextWidthHover from '../components/shared/TextWidthHover';
import spotify_logo from '../assests/imgs/spotify_logo_white.svg';
import { Icon } from '@iconify/react';
import Textinput from '../components/shared/Textinput';
import AudioUpload from '../components/shared/AudioUpload';
import { useState } from 'react';
import { authPOSTReq } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';

const UploadSong = () => {
	const [name, setName] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [podcastUrl, setPodcastUrl] = useState('');
	const [podcastFileName, setPodcastFileName] = useState();
	const navigate = useNavigate();

	const submitPodcast = async () => {
		const data = { name, thumbnail, track: podcastUrl };
		const response = await authPOSTReq('/podcast/create', data);
		if (response.err) {
			alert("Couldn't upload podcast");
			return;
		} else {
			alert('Success');
			navigate('/home');
		}
	};

	return (
		<LoggedInContainer>
			<div className='content p-8 overflow-auto pt-0'>
				<div className='text-2xl font-semibold mb-5 mt-8 text-white'>
					Upload Your Podcast
				</div>
				<div className='w-2/3 space-x-3 flex'>
					<div className='w-1/2'>
						<Textinput
							label='Name'
							labelClassName={'text-white'}
							placeholder={'Name'}
							value={name}
							setValue={setName}
						/>
					</div>
					<div className='w-1/2'>
						<Textinput
							label='Thumbnail'
							labelClassName={'text-white'}
							placeholder={'Thumbnail'}
							value={thumbnail}
							setValue={setThumbnail}
						/>
					</div>
				</div>
				<div className='py-5'>
					{podcastFileName ? (
						<div className='bg-white rounded-full p-3 w-1/3'>
							{podcastFileName.substring(0, 35)}...
						</div>
					) : (
						<AudioUpload
							setUrl={setPodcastUrl}
							setFileName={setPodcastFileName}
						/>
					)}
				</div>
				<div
					onClick={submitPodcast}
					className='bg-white w-1/4 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold'>
					Submit Podcast
				</div>
			</div>
		</LoggedInContainer>
	);
};

export default UploadSong;
