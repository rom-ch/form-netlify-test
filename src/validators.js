export function checkName(name) {
  const errors = [];

  if (name.length === 0) {
    errors.push('Name required');
  }

  return errors;
}

export function checkEmail(email) {
  const errors = [];

  if (email.length === 0) {
    errors.push('Email required');
  }

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errors.push('Please provide a valid email');
  }

  return errors;
}

export function checkMessage(message) {
  const errors = [];

  if (message.length === 0) {
    errors.push('Message required');
  }

  return errors;
}
