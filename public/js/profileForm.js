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
        console.log('we fucked up');
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