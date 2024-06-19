const Textinput = ({ label, placeholder, className, value, setValue, labelClassName }) => {
	return (
		<div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
			<label
				for={label}
				className={`font-semibold ${labelClassName}`}>
				{label}
			</label>
			<input
				id={label}
				type='text'
				placeholder={placeholder}
				className='p-3 border border-gray-400 border-solid rounded placeholder-gray-500'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}>

			</input>
		</div>
	);
};

export default Textinput;
