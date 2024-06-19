/** @format */
const TextWidthHover = ({displayText, active }) => {
	return (
		<div className='flex items-center justify-start cursor-pointer'>
			<div
				className={`${
					active ? 'text-white' : 'text-gray-500'
				} text-semibold text-lg hover:text-white`}>
				{displayText}
			</div>
		</div>
	);
};

export default TextWidthHover;
