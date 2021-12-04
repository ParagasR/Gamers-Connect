//TODO
//replace temp variables: tempHTMLID
//double check format of HTML to match js text fields

const newFormHandler = async (event) => {
  event.preventDefault();
  const comment = document.querySelector('#tempHTMLID').value;
  const title = document.querySelector('#tempHTMLID').value;
  if (comment && title) {

    const response = await fetch('api/post/', {
      method: 'POST',
      body: JSON.stringify({ comment, title }),
      headers: { 'Content-type': 'application/json' }
    });
    if (response.ok) {
      document.querySelector('#tempHTMLID').value = "";
      document.querySelector('#tempHTMLID').value = "";
      document.location.reload();
    } else {
      alert(response.statusText)
    };
  };
};

document
  .querySelector('#tempHTMLID')
  .addEventListener('submit', newFormHandler)