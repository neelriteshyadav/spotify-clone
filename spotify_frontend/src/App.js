import './output.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedInHome';
import UploadSong from './routes/UploadSong';
import { useCookies } from 'react-cookie';

function App() {
  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(["token"]);
  return (
    <div className='w-screen h-screen font-poppins'>
      <BrowserRouter>
        
        {
          
          cookie.token? (
            <Routes>
              <Route path = "/" element = {<h1> Hello World! </h1>} />
              <Route path = "/home" element = {<LoggedInHomeComponent />} />
              <Route path = "/uploadSong" element = {<UploadSong />} />
              <Route path = "*" element = {<Navigate to = "/home"/>} />
            </Routes>) :
            (<Routes>
              <Route path = "/login" element = {<LoginComponent />} />
              <Route path = "/signup" element = {<SignupComponent />} />
              <Route path = "/home" element = {<HomeComponent />} />
              <Route path = "*" element = {<Navigate to = "/login"/>} />
            </Routes>)
        }
      </BrowserRouter>
    </div>

  );
}

export default App;
