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

const UploadSong = () => {
	const [name, setName] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [podcastUrl, setPodcastUrl] = useState('');
	const [podcastFileName, setPodcastFileName] = useState();
	const navigate = useNavigate();

	const submitPodcast = async () => {
		const data = {name, thumbnail, track: podcastUrl};
		const response = await authPOSTReq("/podcast/create", data);
		if(response.err){
			alert("Couldn't upload podcast");
			return;
		}
		else{
			alert("Success");
			navigate("/home");
		}
	};

	return (
		<div className='h-full w-full flex'>
			<div className='h-full w-1/5 bg-black flex flex-col justify-between pb-10'>
				<div>
					<div className='p-5'>
						<img
							src={spotify_logo}
							alt='spotify_logo'
							width={125}></img>
					</div>
					<div className='py-5'>
						<IconText
							iconName={'material-symbols:home'}
							displayText={'Home'}
							active
						/>
						<IconText
							iconName={'material-symbols:search'}
							displayText={'Search'}
						/>
						<IconText
							iconName={'icomoon-free:books'}
							displayText={'Library'}
						/>
						<IconText
							iconName={'mingcute:music-fill'}
							displayText={'My Podcasts'}
						/>
					</div>
					<div className='pt-5'>
						<IconText
							iconName={'material-symbols:add-box'}
							displayText={'Create Playlist'}
						/>
						<IconText
							iconName={'mdi:heart'}
							displayText={'Liked Songs'}
						/>
					</div>
				</div>
				<div className='px-5'>
					<div className='border border-gray-100 text-white flex w-2/3 px-2 py-1 rounded-full items-center justify-center cursor-pointer hover:border-white'>
						<Icon icon='carbon:earth' />
						<div className='ml- text-sm text-semibold pl-1'>English</div>
					</div>
				</div>
			</div>

			<div className='h-full w-4/5 bg-app-black overflow-auto'>
				<div className='navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end'>
					<div className='w-1/2 flex h-full'>
						<div className='w-2/3 flex justify-around items-center'>
							<TextWidthHover displayText={'Premium'} />
							<TextWidthHover displayText={'Support'} />
							<TextWidthHover displayText={'Download'} />
							<div className='h-1/2 border-r border-white'></div>
						</div>
						<div className='w-1/3 flex justify-around h-full items-center'>
							<TextWidthHover displayText={'Upload Podcast'} />
							<div className='bg-white h-10 w-10 flex items-center justify-center rounded-full font-semibold cursor-pointer'>
								NY
							</div>
						</div>
					</div>
				</div>
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
			</div>
		</div>
	);
};

export default UploadSong;
