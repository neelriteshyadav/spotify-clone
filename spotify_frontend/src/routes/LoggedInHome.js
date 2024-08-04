/** @format */

import { Howl, Howler } from 'howler';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useEffect, useState } from 'react';
import {
	authGETReq,
	makeAuthenticatedGETRequest,
} from '../utils/serverHelpers';
import SingleSongCard from '../components/shared/SingleSongCard';
import ReactGA from 'react-ga4';

const HomeComponent = () => {
	ReactGA.send({
		hitType: 'pageview',
		page: '/home',
		title: 'Home',
	});
	const [projectDetails, setprojectDetails] = useState({});
	useEffect(() => {
		const getData = async () => {
			const response = await authGETReq(
				'/playlist/get/playlist/669f391282d2f7e4a592b96e',
			);
			setprojectDetails(response);
			console.log(response);
		};
		getData();
	}, []);
	const [workDetails, setworkDetails] = useState({});
	useEffect(() => {
		const getData = async () => {
			const response = await authGETReq(
				'/playlist/get/playlist/66a32b56de1f0d4ab92a204a',
			);
			setworkDetails(response);
			console.log(response);
		};
		getData();
	}, []);
	const [educationDetails, seteducationDetails] = useState({});
	useEffect(() => {
		const getData = async () => {
			const response = await authGETReq(
				'/playlist/get/playlist/669f394082d2f7e4a592b971',
			);
			seteducationDetails(response);
			console.log(response);
		};
		getData();
	}, []);
	const [myDetails, setmyDetails] = useState({});
	useEffect(() => {
		const getData = async () => {
			const response = await authGETReq(
				'/playlist/get/playlist/66a32b8fde1f0d4ab92a223c',
			);
			setmyDetails(response);
			console.log(response);
		};
		getData();
	}, []);
	return (
		<LoggedInContainer curActiveScreen='home'>
			{myDetails._id && (
				<>
					<div className='text-white text-2xl pt-10'>About Me</div>
					<div className='pt-10 space-y-3 grid grid-cols-2'>
						{myDetails.podcasts.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => {}}
								/>
							);
						})}
					</div>
				</>
			)}
			{educationDetails._id && (
				<>
					<div className='text-white text-2xl pt-8'>My Education</div>
					<div className='pt-10 space-y-3 grid grid-cols-2'>
						{educationDetails.podcasts.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => {}}
								/>
							);
						})}
					</div>
				</>
			)}
			{workDetails._id && (
				<>
					<div className='text-white text-2xl pt-8'>My Work Experiences</div>
					<div className='pt-10 space-y-3 grid grid-cols-2'>
						{workDetails.podcasts.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => {}}
								/>
							);
						})}
					</div>
				</>
			)}
			{projectDetails._id && (
				<>
					<div className='text-white text-2xl pt-8'>My Projects</div>
					<div className='pt-10 space-y-3 grid grid-cols-2'>
						{projectDetails.podcasts.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => {}}
								/>
							);
						})}
					</div>
				</>
			)}
		</LoggedInContainer>
	);
};

export default HomeComponent;
