/** @format */

import './output.css';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import MyMusic from './routes/MyMusic';
import Search from './routes/Search';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import Library from './routes/Library';
import SinglePlaylistView from './routes/SinglePlaylistView';

function App() {
	// eslint-disable-next-line
	const [cookie, setCookie] = useCookies(['token']);
	const [currentSong, setCurrentSong] = useState(null);
	const [soundPlayed, setSoundPlayed] = useState(null);
	const [isPaused, setIsPaused] = useState(true);
	return (
		<div className='w-screen h-screen font-poppins'>
			<BrowserRouter>
				{cookie.token ? (
					<songContext.Provider
						value={{
							currentSong,
							setCurrentSong,
							soundPlayed,
							setSoundPlayed,
							isPaused,
							setIsPaused,
						}}>
						<Routes>
							<Route
								path='/'
								element={<h1> Hello World! </h1>}
							/>
							<Route
								path='/home'
								element={<LoggedInHomeComponent />}
							/>
							<Route
								path='/uploadSong'
								element={<UploadSong />}
							/>
							<Route
								path='/myMusic'
								element={<MyMusic />}
							/>
							<Route
								path='/search'
								element={<Search />}
							/>
							<Route
								path='/library'
								element={<Library />}
							/>
							<Route
								path='/playlist/:playlistId'
								element={<SinglePlaylistView />}
							/>
							<Route
								path='*'
								element={<Navigate to='/home' />}
							/>
						</Routes>
					</songContext.Provider>
				) : (
					<Routes>
						<Route
							path='/login'
							element={<LoginComponent />}
						/>
						<Route
							path='/signup'
							element={<SignupComponent />}
						/>
						<Route
							path='/home'
							element={<HomeComponent />}
						/>
						<Route
							path='*'
							element={<Navigate to='/login' />}
						/>
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
