// --------------------edit profile handlers and events--------------------
const formSubmit = async (event) => {
    event.preventDefault();
    let photo = document.getElementById("picture-url").files[0];
    let formData = new FormData();
    let userBio = document.querySelector("#edit-bio").value;
    let favGames = document.querySelector("#game-content").value;

    console.log(photo)
    formData.append("image_url", photo);

    const response1 = await fetch('/api/profile/picture', {
        method: "POST",
        body: formData,
    });

    const response2 = await fetch('/api/profile/bio', {
        method: "POST",
        body: JSON.stringify({ userBio, favGames }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (response1 && response2) {
        console.log('every thing sent over successfully');
    } else if (response1) {
        console.log('Picture successfully sent over');
    } else if (response2) {
        console.log('successfully sent bio and favorite games');
    } else {
        console.log('we messed up');
    }
}

document
    .querySelector('#profile')
    .addEventListener('submit', formSubmit)

document
    .querySelector('#edit-profile-button')
    .addEventListener('click', (event) => {
        document.querySelector('#edit-profile')
            .classList.add('is-active')
    })

document
    .querySelector('#profile-background')
    .addEventListener('click', (event) => {
        document.querySelector('#edit-profile')
            .classList.remove('is-active')
    })

// --------------------edit and delete posts handlers and events--------------------
let currentPostId;
const deleteHandler = async (event) => {
    if (event.target.getAttribute('data-delete')) {
        const id = event.target.getAttribute('data-delete');

        const response = await fetch(`api/post/delete/${id}`, {
            method: 'DELETE',
        });


        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete project');
        }
    }
};

const editShowModal = async (event) => {
    if (event.target.getAttribute('data-edit')) {
        const id = event.target.getAttribute('data-edit')
        currentPostId = id;

        const post = await fetch(`/edit/${id}`)
        const parsedPost = await post.json();
        console.log(parsedPost)
        if (post.ok) {
            document.querySelector('#edit-title-field').value = parsedPost.title;
            document.querySelector('#edit-post-field').value = parsedPost.content;
            document.querySelector('#edit').classList.add('is-active');
        } else {
            alert('Failed to open edit window')
        }

    }
}

const editHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#edit-post-field').value;
    const title = document.querySelector('#edit-title-field').value;
    try {
        if (content && title && currentPostId) {
            const response = await fetch(`api/post/edit/${currentPostId}`, {
                method: 'PUT',
                body: JSON.stringify({ content, title }),
                headers: { 'Content-type': 'application/json' }
            });
            console.log(response)
            if (response.ok) {
                document.location.reload()
            } else {
                alert('Unable to edit post')
            }
        }
    } catch (err) {
        console.log(err)
    }
}

document
    .querySelector('#edit-button')
    .addEventListener('click', editShowModal);

document
    .querySelector('#delete-button')
    .addEventListener('click', deleteHandler);

document
    .querySelector('#edit-post')
    .addEventListener('submit', editHandler);

document
    .querySelector('#edit-background')
    .addEventListener('click', (event) => {
        event.preventDefault;
        document
            .querySelector('#edit')
            .classList.remove('is-active');
    });