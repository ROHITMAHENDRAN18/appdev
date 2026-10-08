import { useState, useEffect } from 'react';
import { hashPassword, registerUser, authenticateUser } from './utils/auth';
import './index.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Check for active session on load
  useEffect(() => {
    const session = localStorage.getItem('experiment5_session');
    if (session) setCurrentUser(JSON.parse(session));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      return setError('Please fill in all fields.');
    }

    const hashedPassword = await hashPassword(formData.password);

    if (isLogin) {
      const result = authenticateUser(formData.email, hashedPassword);
      if (result.success) {
        setCurrentUser(result.user);
        localStorage.setItem('experiment5_session', JSON.stringify(result.user));
      } else {
        setError(result.error);
      }
    } else {
      const result = registerUser(formData.name, formData.email, hashedPassword);
      if (result.success) {
        setMessage('Account created successfully! Please sign in.');
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
      } else {
        setError(result.error);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('experiment5_session');
  };

  if (currentUser) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <h1>Welcome back, {currentUser.name}!</h1>
          <p>Email: {currentUser.email}</p>
          <div className="status-badge">Secure Session Active</div>
          <button onClick={handleLogout} className="btn-primary mt-4">Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="split-layout">
      <div className="form-section">
        <div className="form-container">
          <h1 className="title">Lumina</h1>
          <h2 className="subtitle">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p className="description">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start your journey with a free account today.'}
          </p>

          {error && <div className="alert error">{error}</div>}
          {message && <div className="alert success">{message}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Rohit Mahendran" />
              </div>
            )}
            
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="rohit@example.com" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" />
            </div>

            <button type="submit" className="btn-primary w-full">
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>

          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }} className="toggle-btn">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
      <div className="visual-section">
        <div className="glass-panel">
          <h2>Design that inspires.</h2>
          <p>A warm, responsive split-screen authentication flow built for modern web experiences.</p>
        </div>
      </div>
    </div>
  );
}
