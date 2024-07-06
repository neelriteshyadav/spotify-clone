/** @format */
import { useState } from 'react';
import Textinput from '../components/shared/Textinput';
import { authPOSTReq } from '../utils/serverHelpers';
const CreatePlaylistModel = ({ closeModel }) => {
	const [name, setName] = useState('');
	const [thumbnail, setThumbnail] = useState('');

	const createPlaylist = async () => {
		const response = await authPOSTReq('/playlist/create', {
			name: name,
			thumbnail: thumbnail,
			songs: [],
		});
		if (response._id) {
			closeModel();
		}
	};
	return (
		<div
			className='absolute w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center'
			onClick={closeModel}>
			<div
				className='bg-black w-1/3 rounded-md p-8'
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<div className='text-white mb-5 font-semibold text-lg'>
					Create Playlist
				</div>
				<div className='space-y-4 flex flex-col justify-center items-center'>
					<Textinput
						label='Name'
						labelClassName={'text-white'}
						placeholder={'Playlist Name'}
						value={name}
						setValue={setName}
					/>
					<Textinput
						label='Thumbnail'
						labelClassName={'text-white'}
						placeholder={'Playlist Thumbnail'}
						value={thumbnail}
						setValue={setThumbnail}
					/>
					<div
						className='bg-white w-1/3 rounded flex justify-center items-center font-semibold py-3 mt-4 cursor-pointer'
						onClick={createPlaylist}>
						Create
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePlaylistModel;
