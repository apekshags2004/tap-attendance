import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(login({ email, password })).unwrap();
      // redirect based on role
      if (res.user.role === 'manager') navigate('/manager');
      else navigate('/');
    } catch(err){
      alert('Login failed: ' + (err?.message || err));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" required />
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
