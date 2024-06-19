const SingleSongCard = ({ info, playSound }) => {
	return (
		<div className='flex hover:bg-gray-400 hover:bg-opacity-20 p-3 rounded-md'>
			<div
				className='bg-white w-12 h-12 bg-cover bg-center'
				style={{
					backgroundImage: `url("https://images.unsplash.com/photo-1718792679559-5cfd607bb564?q=80&w=2856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
				}}></div>
            <div className="flex w-full">
			<div className='text-white flex flex-col justify-center pl-4 w-5/6'>
				<div className="cursor-pointer hover:underline">Curtains</div>
				<div className='text-xs text-gray-400 cursor-pointer hover:underline'>Ed Sheeren</div>
			</div>
            <div className="w-1/6 flex justify-center items-center text-gray-400 text-sm">
                <div> 3:44 </div>
            </div>
            </div>
		</div>
	);
};

export default SingleSongCard;
