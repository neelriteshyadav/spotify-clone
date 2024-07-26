/** @format */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';
import { authGETReq } from '../utils/serverHelpers';

const Library = () => {
	const [myPlaylists, setMyPlaylists] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await authGETReq('/playlist/get/me');
				if (response && response.data) {
					setMyPlaylists(response.data);
				} else {
					setMyPlaylists([]); // Ensure myPlaylists is always an array
				}
			} catch (error) {
				console.error('Error fetching playlists:', error);
				setMyPlaylists([]); // Handle the error case
			}
		};
		getData();
	}, []);

	return (
		<LoggedInContainer curActiveScreen={'library'}>
			<div className='text-white text-xl pt-8 font-semibold'>My Playlists</div>
			<div className='py-5 grid gap-5 grid-cols-5'>
				{myPlaylists.length > 0 ? (
					myPlaylists.map((item) => {
						return (
							<Card
								key={item.id}
								title={item.name}
								description=''
								imgUrl={item.thumbnail}
								playlistId={item._id}
							/>
						);
					})
				) : (
					<div>No playlists available.</div>
				)}
			</div>
		</LoggedInContainer>
	);
};

const Card = ({ title, description, imgUrl, playlistId }) => {
	const navigate = useNavigate();
	return (
		<div
			className='bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer'
			onClick={() => {
				navigate('/playlist/' + playlistId);
			}}>
			<div className='pb-4 pt-2'>
				<img
					className='w-full rounded-md'
					src={imgUrl}
					alt='label'
				/>
			</div>
			<div className='text-white font-semibold py-3'>{title}</div>
			<div className='text-gray-500 text-sm'>{description}</div>
		</div>
	);
};

export default Library;
