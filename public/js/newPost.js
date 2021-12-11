//TODO
//replace temp variables: tempHTMLID
//double check format of HTML to match js text fields
const newFormHandler = async (event) => {
  event.preventDefault();
  const comment = document.querySelector('#post-field').value;
  const title = document.querySelector('#title-field').value;
  const game = document.querySelector('#game').value;

  console.log(game)
  if (comment && title && games) {

    const response = await fetch('api/post/', {
      method: 'POST',
      body: JSON.stringify({ comment, title, game }),
      headers: { 'Content-type': 'application/json' }
    });
    if (response.ok) {
      document.querySelector('#post-field').value = "";
      document.querySelector('#title-field').value = "";
      document.querySelector('#game').value = "";
      document.location.reload();
    } else {
      alert(response.statusText)
    };
  };
};

document
  .querySelector('#add-post')
  .addEventListener('submit', newFormHandler)

document
  .querySelector('#new-post')
  .addEventListener('click', (event) => {
    event.preventDefault();
    document
      .querySelector('#new')
      .classList.add('is-active');
  });

document
  .querySelector('#add-background')
  .addEventListener('click', (event) => {
    document
      .querySelector('#new')
      .classList.remove('is-active');
  })