import { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/users/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        role: formData.role,
      });
      setMessage('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
        {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
        <p className="switch-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
