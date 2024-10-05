import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './ErrorBoundary';
import Movies from '../SubPages/Movies.jsx';
import Videos from '../SubPages/Videos'; 
import Music from '../SubPages/Music'; // Ensure this path is correct
import Kidszone from '../SubPages/Kidszone'; 
import Tourist from '../SubPages/Tourist'; 
import Service from '../SubPages/Service'; 
import Journey from '../SubPages/Journey';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ExistingRequestForm from './ExistingRequestForm';
import AttendentLogin from './AttendentLogin.jsx';
import AttendentLoginData from './AttendentLoginData.jsx';
import PlaceDetail from './PlaceDetail.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
     <ErrorBoundary>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/music" element={<Music />} />
      <Route path="/Kidszone" element={<Kidszone />} />
      <Route path="/tourist" element={<Tourist />} />
      <Route path="/service" element={<Service />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/existing-requests" element={<ExistingRequestForm />} />
      <Route path="/Attendent-Login" element={<AttendentLogin />} />
      <Route path="/Attendent-Login-Data" element={<AttendentLoginData />} />
      <Route path="/place/:placeName" element={<PlaceDetail />} />
    </Routes>
    </ErrorBoundary>
  </Router>
);
