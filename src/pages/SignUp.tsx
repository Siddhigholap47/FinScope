
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await auth.signup(name, email, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (error: any) {
      setErr(error?.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div>
      <h2>Sign up</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required /></div>
        <div><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
