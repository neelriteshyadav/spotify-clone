/** @format */

import { openUploadWidget } from '../../utils/CloudinaryService';
import { upload_preset } from './config';

const AudioUpload = ({setUrl, setFileName}) => {
	const uploadImageWidget = () => {
		let myUploadWidget = openUploadWidget(
			{
				cloudName: 'drz1os38q',
				uploadPreset: upload_preset,
				sources: ['local'],
			},
			function (error, result) {
				if (!error && result.event === 'success') {
					setUrl(result.info.secure_url);
          setFileName(result.info.original_filename);
				} else {
					if (error) {
						alert('Could not upload!');
						console.log(error);
					}
				}
			},
		);
		myUploadWidget.open();
	};

	return (
		<button
			className='bg-white text-black rounded-full font-semibold p-4'
			onClick={uploadImageWidget}>
			Select Track
		</button>
	);
};

export default AudioUpload;
