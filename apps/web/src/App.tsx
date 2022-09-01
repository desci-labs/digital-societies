import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import Profile from './pages/Profile';
import AppProviders from './AppProviders';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signature from './pages/Signature';
import './App.css';
import Header from 'Header';

function App() {
  return (
    <AppProviders>
      <Router>
        <Header />
        <Routes>
          <Route path="/*" element={<Signature />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
