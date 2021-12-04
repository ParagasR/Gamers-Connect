//TODO
//replace temp variables: tempHTMLID

//send request to api to login user
const loginButton = async (event) => {
  event.preventDefault();
  //grab the values in the two fields
  const username = document.querySelector('#tempHTMLID').value.trim();
  const password = document.querySelector('#tempHTMLID').value.trim();
  //check to see if the exist
  console.log(email + ' ' + password)
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(username + ' ' + password)
    if (response.ok) {
      document.location.replace('/');
    } else {
      //change to pop up
      alert('Failed to login')
    }
  }
}

//send request to api to create user
const signupButton = async (event) => {
  event.preventDefault();
  //grab all the data in the respective fields
  const username = document.querySelector('#tempHTMLID').value.trim();
  const password = document.querySelector('#tempHTMLID').value.trim();
  //check to see if the data exists
  if (user && password) {
    //send request to api to submit data to create user
    const response = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //go back to homepage
      document.location.replace('/')
    } else {
      //change to pop up
      alert('Failed to sign up')
    };
  };
}

//attach eventhandlers to buttons

document
  .querySelector('.tempHTMLID')
  .addEventListener('submit', loginButton);

document
  .querySelector('.tempHTMLID')
  .addEventListener('submit', signupButton);