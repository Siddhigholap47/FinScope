
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const res = await auth.login(email, password);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      setErr(error?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div>
        No account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
