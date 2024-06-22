/** @format */

import IconText from '../components/shared/IconText';
import TextWidthHover from '../components/shared/TextWidthHover';
import spotify_logo from '../assests/imgs/spotify_logo_white.svg';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Howl, Howler } from 'howler';

const LoggedInContainer = ({ children }) => {
	const [soundPlayed, setSoundPlayed] = useState(null);
	const [isPaused, setIsPaused] = useState(true);
	const playSound = (songSrc) => {
		if (soundPlayed) {
			soundPlayed.stop();
		}
		let sound = new Howl({
			src: [songSrc],
			html5: true,
		});
		setSoundPlayed(sound);
		sound.play();
	};

	const pauseSound = () => {
		soundPlayed.pause();
	};

	const togglePlayPause = () => {
		if (isPaused) {
			playSound(
				'https://res.cloudinary.com/drz1os38q/video/upload/v1718916099/a1jfjfg1geactuybvigf.mp4',
			);
			setIsPaused(false);
		} else {
			pauseSound();
			setIsPaused(true);
		}
	};

	return (
		<div className='h-full w-full bg-app-black'>
			<div className='h-9/10 w-full flex'>
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
					<div className='content p-8 overflow-auto pt-0'>{children}</div>
				</div>
			</div>
			<div className='px-4 h-1/10 w-full flex items-center bg-black bg-opacity-30 text-white'>
				<div className='w-1/4 h-full flex items-center'>
					<img
						src='https://images.unsplash.com/photo-1718762538704-9698cd001106?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='currentSong'
						className='h-14 w-14 rounded'
					/>
					<div className='pl-4'>
						<div className='text-sm hover:underline cursor-pointer'>
							Curtains
						</div>
						<div className='text-xs text-gray-500 hover:underline cursor-pointer'>
							Ed Sheeren
						</div>
					</div>
				</div>
				<div className='w-1/2 h-full flex justify-center flex-col items-center'>
					<div className='flex items-center justify-between w-1/3'>
						<Icon
							icon='ph:shuffle-bold'
							fontSize={30}
							className='cursor-pointer text-gray-500 hover:text-white'
						/>
						<Icon
							icon='mdi:skip-previous-outline'
							fontSize={30}
							className='cursor-pointer text-gray-500 hover:text-white'
						/>
						<Icon
							icon={isPaused ? 'icon-park-solid:play' : 'zondicons:pause-solid'}
							fontSize={50}
							className='cursor-pointer text-gray-500 hover:text-white'
							onClick={togglePlayPause}
						/>
						<Icon
							icon='mdi:skip-next-outline'
							fontSize={30}
							className='cursor-pointer text-gray-500 hover:text-white'
						/>
						<Icon
							icon='material-symbols:repeat'
							fontSize={30}
							className='cursor-pointer text-gray-500 hover:text-white'
						/>
					</div>
					<div></div>
				</div>

				<div className='w-1/4 h-full flex justify-end'></div>
			</div>
		</div>
	);
};

export default LoggedInContainer;
