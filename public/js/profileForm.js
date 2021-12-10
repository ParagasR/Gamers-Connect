const formSubmit = async (event) => {
    event.preventDefault();
    let photo = document.getElementById("picture-url").files[0];
    let formData = new FormData();
    let userBio = JSON.stringify(document.querySelector("#edit-bio").value);
    let favGames = JSON.stringify(document.querySelector("#game-content").value);

    formData.append("image_url", photo);

    if (photo) {
        console.log(formData);
        const response1 = await fetch('/api/profile/picture', {
            method: "POST",
            body: formData,
            headers: { 'Content-Type': 'application/json' },
        });
    };

    if (userBio && favGames) {
        console.log(userBio + ' ' + favGames)
        const response2 = await fetch('/api/profile/bio', {
            method: "POST",
            body: { userBio, favGames },
            headers: { 'Content-Type': 'application/json' },
        })
    };

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