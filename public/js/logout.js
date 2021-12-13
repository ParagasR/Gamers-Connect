const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/')
  } else {
    //see about replacing with a pop up box like we did in the insomnia dashboard
    alert('Failed to log out.')
  }
};

document
  .querySelector('#logout-buttons')
  .addEventListener('click', logout);