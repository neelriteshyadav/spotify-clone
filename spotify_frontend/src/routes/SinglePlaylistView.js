/** @format */

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';
import {
	authGETReq,
	makeAuthenticatedGETRequest,
} from '../utils/serverHelpers';
import SingleSongCard from '../components/shared/SingleSongCard';
import ReactGA from 'react-ga4';

const SinglePlaylistView = () => {
	ReactGA.send({
		hitType: 'pageview',
		page: '/playlist/:playlistId',
		title: 'Single Playlist',
	});
	const [playlistDetails, setPlaylistDetails] = useState({});
	const { playlistId } = useParams();

	useEffect(() => {
		const getData = async () => {
			const response = await authGETReq('/playlist/get/playlist/' + playlistId);
			setPlaylistDetails(response);
			console.log(response);
		};
		getData();
	}, []);

	return (
		<LoggedInContainer curActiveScreen={'library'}>
			{playlistDetails._id && (
				<div>
					<div className='text-white text-xl pt-8 font-semibold'>
						{playlistDetails.name}
					</div>
					<div className='pt-10 space-y-3'>
						{playlistDetails.podcasts.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => {}}
								/>
							);
						})}
					</div>
				</div>
			)}
		</LoggedInContainer>
	);
};

export default SinglePlaylistView;
