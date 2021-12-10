const formSubmit = async (event) => {
    event.preventDefault();
    let photo = document.getElementById("picture-url").files[0];
    let formData = new FormData();
    let userBio = document.querySelector("#edit-bio").value;
    // let favGames = document.querySelector("#game-content");

    formData.append("image_url", photo);

    const response1 = await fetch('/api/profile/picture', {
        method: "POST",
        body: formData,
    })

    const respose2 = await fetch('/api/profile/bio', {
        method: "POST",
        body: JSON.stringify({ userBio }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response1.ok && respose2.ok) {
        console.log('we good')
    } else if (respose2.ok) {
        console.log('2 is good')
    } else {
        console.log('we no good')
    }

}



document
    .querySelector('#profile')
    .addEventListener('submit', formSubmit)

document
    .querySelector('#edit-button')
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