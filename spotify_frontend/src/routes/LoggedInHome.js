/** @format */

import IconText from '../components/shared/IconText';
import TextWidthHover from '../components/shared/TextWidthHover';
import spotify_logo from '../assests/imgs/spotify_logo_white.svg';
import { Icon } from '@iconify/react';

const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const HomeComponent = () => {
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
							<TextWidthHover displayText={"Premium"}/>
							<TextWidthHover displayText={"Support"}/>
							<TextWidthHover displayText={"Download"}/>
							<div className='h-1/2 border-r border-white'></div>
						</div>
						<div className='w-1/3 flex justify-around h-full items-center'>
							<TextWidthHover displayText={"Upload Podcast"}/>
							<div className="bg-white h-10 w-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                NY
                            </div>
						</div>
						
					</div>
				</div>
				<div className='content p-8 overflow-auto pt-0'>
					<PlaylistView
                        titleText="Focus"
                        cardsData={focusCardsData}
                    />
                    <PlaylistView
                        titleText="Spotify Playlists"
                        cardsData={spotifyPlaylistsCardData}
                    />
                    <PlaylistView
                        titleText="Sound of India"
                        cardsData={focusCardsData}
                    />
				</div>
			</div>
		</div>
	);
};

const PlaylistView = ({titleText, cardsData}) => {
	return (
		<div className='text-white mt-8'>
			<div className='text-2xl font-semibold mb-5'>{titleText}</div>
			<div className='w-full flex justify-between space-x-4'>
				{
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }
			</div>
		</div>
	);
};

const Card = ({title, description, imgUrl}) => {
	return (
		<div className='bg-black bg-opacity-40 w-1/5 p-4 rounded-lg'>
			<div className='pb-4 pt-2'>
				<img className='w-full rounded-md' alt='label' src= {imgUrl}></img>
			</div>
			<div className='text-white font-semibold py-3'>{title}</div>
			<div className='text-gray-500 text-sm'>{description}</div>
		</div>
	);
};

export default HomeComponent;
