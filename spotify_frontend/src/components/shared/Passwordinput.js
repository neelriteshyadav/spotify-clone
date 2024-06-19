const Passwordinput = ({ label, placeholder, value, setValue }) => {
	return (
		<div className='PasswordinputDiv flex flex-col space-y-2 w-full'>
			<label
				for={label}
				className='font-semibold'>
				{label}
			</label>
			<input
				id={label}
				type='password'
				placeholder={placeholder}
				className='p-2 border border-gray-400 border-solid rounded placeholder-gray-500'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}></input>
		</div>
	);
};

export default Passwordinput;
