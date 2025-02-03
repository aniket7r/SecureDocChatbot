import Chatbot from "./components/Chatbot";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <h2>Welcome Back!</h2> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
    // <div>
    //   <h1>Welcome to SecureDocChatbot</h1>
    //   <Chatbot />
    // </div>
  );
}

export default App;
