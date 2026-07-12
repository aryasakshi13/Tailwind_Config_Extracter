
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HistoryDashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/login';
import { ProtectedRoute } from './component/ProtectedRoute';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path ="/dashboard" element={<HistoryDashboard/>}/> */}

          <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <HistoryDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  
  );
}

export default App
