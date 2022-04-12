// import logo from './logo.svg';
import './App.css';
import Header from './components/sections/Header';
import Home from './components/pages/Home'
import Login from './components/pages/Login';
import Nosotros from './components/pages/Nosotros';
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

const App = () => (
  <Router>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={ 
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } />
        <Route path='/Nosotros' element={<Nosotros />} />
      </Routes>
    </AuthProvider>
  </Router>
)

export default App;
