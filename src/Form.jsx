import { useState } from 'react';
import { checkEmail, checkMessage, checkName } from './validators';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  const nameErrors = isAfterFirstSubmit ? checkName(name) : [];
  const emailErrors = isAfterFirstSubmit ? checkEmail(email) : [];
  const messageErrors = isAfterFirstSubmit ? checkMessage(message) : [];

  function handleSubmit(e) {
    e.preventDefault();

    setIsAfterFirstSubmit(true);

    const nameCheckResult = checkName(name);
    const emailCheckResult = checkEmail(email);
    const messageCheckResult = checkMessage(message);

    if (
      nameCheckResult.length === 0 &&
      emailCheckResult.length === 0 &&
      messageCheckResult.length === 0
    ) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', name, email, message }),
      });
    }
  }

  return (
    <form
      className='form'
      onSubmit={handleSubmit}
      name='contact'
      method='POST'
      data-netlify='true'
    >
      <input type='hidden' name='form-name' value='contact' />

      <div className={`form-group ${nameErrors.length > 0 ? 'error' : ''}`}>
        <label className='label' htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='input'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {nameErrors.length > 0 && (
          <div className='msg'>{nameErrors.join(', ')}</div>
        )}
      </div>

      <div className={`form-group ${emailErrors.length > 0 ? 'error' : ''}`}>
        <label className='label' htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='input'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailErrors.length > 0 && (
          <div className='msg'>{emailErrors.join(', ')}</div>
        )}
      </div>

      <div className={`form-group ${messageErrors.length > 0 ? 'error' : ''}`}>
        <label className='label' htmlFor='message'>
          Message
        </label>
        <textarea
          className='textarea'
          name='message'
          id='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {messageErrors.length > 0 && (
          <div className='msg'>{messageErrors.join(', ')}</div>
        )}
      </div>

      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  );
}
