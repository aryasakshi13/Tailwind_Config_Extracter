
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HistoryDashboard from './pages/Dashboard';
import Signup from './pages/Signup';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path ="/dashboard" element={<HistoryDashboard/>}/>
        </Routes>
      </Router>
  
  );
}

export default App
