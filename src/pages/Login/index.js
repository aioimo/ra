import React from 'react';

export const Login = ({ auth }) => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const login = e => {
    e.preventDefault();
    console.log('login callled...', { password, email });
    auth
      .login({ password, email })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log('err....', err);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
