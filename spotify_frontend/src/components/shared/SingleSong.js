/** @format */
import { useContext } from 'react';
import songContext from '../../contexts/songContext';
const SingleSong = ({ thumbnail, name, track, playSound }) => {
	const { currentSong, setCurrentSong } = useContext(songContext);
	return (
		<div
			className='flex hover:bg-gray-400 hover:bg-opacity-20 p-3 rounded-md'
			onClick={() => {
				setCurrentSong(track);
			}}>
			<div
				className='bg-white w-12 h-12 bg-cover bg-center'
				style={{
					backgroundImage: `url("${thumbnail}")`,
				}}></div>
			<div className='flex w-full'>
				<div className='text-white flex flex-col justify-center pl-4 w-5/6'>
					<div className='cursor-pointer hover:underline'>{name}</div>
					<div className='text-xs text-gray-400 cursor-pointer hover:underline'>
						Neel Yadav
					</div>
				</div>
				<div className='w-1/6 flex justify-center items-center text-gray-400 text-sm'>
					<div> 3:44 </div>
				</div>
			</div>
		</div>
	);
};

export default SingleSong;
