/** @format */

const SingleSongCard = ({ info, playSound }) => {
	return (
		<div
			className='flex hover:bg-gray-400 hover:bg-opacity-20 p-3 rounded-md'
			onClick={() => {
				playSound(info.track);
			}}>
			<div
				className='bg-white w-12 h-12 bg-cover bg-center'
				style={{
					backgroundImage: `url("${info.thumbnail}")`,
				}}></div>
			<div className='flex w-full'>
				<div className='text-white flex flex-col justify-center pl-4 w-5/6'>
					<div className='cursor-pointer hover:underline'>{info.name}</div>
					<div className='text-xs text-gray-400 cursor-pointer hover:underline'>
						{info.artist.firstName + ' ' + info.artist.lastName}
					</div>
				</div>
				<div className='w-1/6 flex justify-center items-center text-gray-400 text-sm'>
					<div> 3:44 </div>
				</div>
			</div>
		</div>
	);
};

export default SingleSongCard;
