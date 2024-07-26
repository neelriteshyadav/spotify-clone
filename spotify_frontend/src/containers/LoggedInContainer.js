/** @format */

import IconText from '../components/shared/IconText';
import TextWidthHover from '../components/shared/TextWidthHover';
import spotify_logo from '../assests/imgs/spotify_logo_white.svg';
import { Icon } from '@iconify/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import songContext from '../contexts/songContext';
import { useContext } from 'react';
import CreatePlaylistModel from '../models/createPlaylistModel';
import AddToPlaylistModel from '../models/addToPlaylistModel';
import { authPOSTReq } from '../utils/serverHelpers';
import { Link } from 'react-router-dom';

const LoggedInContainer = ({ children, curActiveScreen }) => {
	const [createPlaylistModelOpen, setCreatePlaylistModelOpen] = useState(false);
	const [addToPlaylistModelOpen, setAddToPlaylistModelOpen] = useState(false);
	const {
		currentSong,
		setCurrentSong,
		soundPlayed,
		setSoundPlayed,
		isPaused,
		setIsPaused,
	} = useContext(songContext);
	const firstUpdate = useRef(true);

	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}

		if (!currentSong) {
			return;
		}
		changeSong(currentSong.track);
	}, [currentSong && currentSong.track]);

	const changeSong = (songSrc) => {
		if (soundPlayed) {
			soundPlayed.stop();
		}
		let sound = new Howl({
			src: [songSrc],
			html5: true,
		});
		setSoundPlayed(sound);
		sound.play();
		setIsPaused(false);
	};

	const addSongToPlaylist = async (playlistId) => {
		const podcastId = currentSong._id;
		const payload = { playlistId, podcastId };
		console.log(payload);
		try {
			const response = await authPOSTReq('/playlist/add/song', payload);
			console.log(response);

			if (response && !response.error) {
				setAddToPlaylistModelOpen(false);
			} else {
				console.error('Failed to add song to playlist:', response.error);
			}
		} catch (error) {
			console.error('An error occurred while adding song to playlist:', error);
		}
	};

	const playSound = () => {
		if (!soundPlayed) {
			return;
		}
		soundPlayed.play();
	};

	const pauseSound = () => {
		soundPlayed.pause();
	};

	const togglePlayPause = () => {
		if (isPaused) {
			playSound();
			setIsPaused(false);
		} else {
			pauseSound();
			setIsPaused(true);
		}
	};

	return (
		<div className='h-full w-full bg-app-black'>
			{createPlaylistModelOpen && (
				<CreatePlaylistModel
					closeModel={() => {
						setCreatePlaylistModelOpen(false);
					}}
				/>
			)}
			{addToPlaylistModelOpen && (
				<AddToPlaylistModel
					closeModel={() => {
						setAddToPlaylistModelOpen(false);
					}}
					addSongToPlaylist={addSongToPlaylist}
				/>
			)}
			<div className={`${currentSong ? 'h-9/10' : 'h-full'} w-full flex`}>
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
								active={curActiveScreen === 'home'}
								targetLink={'/home'}
							/>
							<IconText
								iconName={'material-symbols:search'}
								displayText={'Search'}
								targetLink={'/search'}
								active={curActiveScreen === 'search'}
							/>
							<IconText
								iconName={'icomoon-free:books'}
								displayText={'Library'}
								targetLink={'/library'}
								active={curActiveScreen === 'library'}
							/>
							<IconText
								iconName={'mingcute:music-fill'}
								displayText={'All Experiences'}
								targetLink={'/mymusic'}
								active={curActiveScreen === 'mymusic'}
							/>
							<IconText
								iconName={'mdi:resume'}
								displayText={'Resume'}
								targetLink={
									'https://drive.google.com/file/d/1Y0I4h81LAEtSq7VPcWcB0PwlHzWoeSNB/view?usp=sharing'
								}
								target='_blank'
							/>
						</div>
						<div className='pt-5'>
							<IconText
								iconName={'material-symbols:add-box'}
								displayText={'Create Playlist'}
								onClick={() => setCreatePlaylistModelOpen(true)}
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
							<div className='w-1/2 flex justify-around items-center'>
								<TextWidthHover displayText={'Premium'} />
								<TextWidthHover displayText={'Support'} />
								<div className='h-1/2 border-r border-white'></div>
							</div>
							<div className='w-1/2 flex justify-around h-full items-center'>
								<Link to={'/uploadsong'}>
									<TextWidthHover displayText={'Upload Experience'} />
								</Link>
								<div className='bg-white h-10 w-10 flex items-center justify-center rounded-full font-semibold cursor-pointer'>
									NY
								</div>
							</div>
						</div>
					</div>
					<div className='content p-8 overflow-auto pt-0'>{children}</div>
				</div>
			</div>
			{currentSong && (
				<div className='px-4 h-1/10 w-full flex items-center bg-black bg-opacity-30 text-white'>
					<div className='w-1/4 h-full flex items-center'>
						<img
							src={currentSong.thumbnail}
							alt='currentSong'
							className='h-14 w-14 rounded'
						/>
						<div className='pl-4'>
							<div className='text-sm hover:underline cursor-pointer'>
								{currentSong.name}
							</div>
							<div className='text-xs text-gray-500 hover:underline cursor-pointer'>
								{currentSong.artist.firstName +
									' ' +
									currentSong.artist.lastName}
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
								icon={
									isPaused ? 'icon-park-solid:play' : 'zondicons:pause-solid'
								}
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
					</div>

					<div className='w-1/4 h-full flex justify-end items-center pr-4 space-x-3'>
						<Icon
							icon='tabler:playlist-x'
							fontSize={30}
							className='cursor-pointer text-gray-500 hover:text-white'
							onClick={() => {
								setAddToPlaylistModelOpen(true);
							}}
						/>
						<Icon
							icon='mdi:heart-outline'
							fontSize={25}
							className='cursor-pointer text-gray-500 hover:text-white'
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoggedInContainer;
