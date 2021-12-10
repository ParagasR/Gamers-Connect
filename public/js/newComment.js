//TODO
//replace temp variables: tempHTMLID
//double check format of HTML to match js text fields

const newFormHandler = async (event) => {
  event.preventDefault();
  let comment = document.querySelector('#comment-field').value;
  if (comment) {
    const response = await fetch('/api/post/comment', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.querySelector('#comment-field').value = "";
      document.location.reload();
    } else {
      alert(response.statusText)
    }
  };
};

document
  .querySelector('#add-comment')
  .addEventListener('submit', newFormHandler)

document
  .querySelector('#create-new')
  .addEventListener('click', (event) => {
    document
      .querySelector('#new')
      .classList.add('is-active')
  })

document
  .querySelector('#add-background')
  .addEventListener('click', (event) => {
    document
      .querySelector('#new')
      .classList.remove('is-active')
  })