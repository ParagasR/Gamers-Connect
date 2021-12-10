const formSubmit = async (event) => {
    event.preventDefault();
    let photo = document.getElementById("image-url").files[0];
    let formData = new FormData();
    let userBio = JSON.stringify(document.querySelector("#user-bio").value);
    let favGames = JSON.stringify(document.querySelector("#game-content").value);

    console.log(photo)
    console.log(userBio, favGames)
    formData.append("image_url", photo);
    formData.append("user_bio", userBio);
    formData.append("favorite_games", favGames);

    if (formData && userBio && favGames) {
        console.log(formData);
        const response = await fetch('http://localhost:3001/api/profile', {
            mode: 'no-cors',
            method: "POST",
            body: formData,
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response, "this is response");
        if (response.ok) {
            console.log(response);
        } else {
            console.log("ok");
        };
        // fetch('http://localhost:3001/api/profile', {mode:'no-cors', method: "POST", body: formData)
        // .then((data) => {
        //     console.log(data);
        // }).catch((err) => {
        //     console.log(err);
        // })
    };
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