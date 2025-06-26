import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/v1/users/login', {
      email: formData.email,
      password: formData.password,
    });

    const { user, accessToken } = res.data.data;

    localStorage.setItem('bookifyUser', JSON.stringify({ user, accessToken }));
    

    // Redirect to homepage
    navigate('/');
  } catch (err) {
    setMessage(err.response?.data?.message || 'Login failed.');
    console.log(err);
  }
};
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login to Bookify</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
        <p className="switch-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
