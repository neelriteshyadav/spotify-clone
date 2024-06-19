/** @format */

import IconText from '../components/shared/IconText';
import TextWidthHover from '../components/shared/TextWidthHover';
import spotify_logo from '../assests/imgs/spotify_logo_white.svg';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleSongCard from '../components/shared/SingleSongCard';

const MyMusic = () => {

	const navigate = useNavigate();

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
                            active
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
                <div className='content p-8 overflow-auto'>
                    <div className='text-white text-xl font-semibold pb-4 pl-3'> My Podcasts</div>
                    <div className='space-y-3 overflow-auto'>
                    <SingleSongCard/>
                    <SingleSongCard/>
                    <SingleSongCard/>
                    <SingleSongCard/>
                    <SingleSongCard/>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default MyMusic;
