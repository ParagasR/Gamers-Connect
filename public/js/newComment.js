//TODO
//replace temp variables: tempHTMLID
//double check format of HTML to match js text fields

const newFormHandler = async (event) => {
  event.preventDefault();
  let comment = document.querySelector('#tempHTMLID').value;
  if (comment) {
    const response = await fetch('/api/post/comment', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.querySelector('#tempHTMLID').value = "";
      document.location.reload();
    } else {
      alert(response.statusText)
    }
  };
};

document
  .querySelector('#tempHTMLID')
  .addEventListener('submit', newFormHandler)