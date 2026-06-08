
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HistoryDashboard from './pages/Dashboard';


function App() {
  return (
      <Router>
        <Routes>
          <Route path ="/dashboard" element={<HistoryDashboard/>}/>
            

        </Routes>
      </Router>
  
  );
}

export default App
