import React from 'react';

export const Signup = ({ auth }) => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  const signUp = e => {
    e.preventDefault();
    console.log('signup callled...', { password, email, name });
    auth
      .signup({ password, email, name })
      .then(res => {
        console.log('res....', res);
      })
      .catch(err => {
        console.log('err....', err);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={signUp}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
