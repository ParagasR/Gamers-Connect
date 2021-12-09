const formSubmit = async (event) => {
    event.preventDefault();
    let photo = document.getElementById("picture-url").files[0];
    let formData = new FormData();
    let userBio = document.querySelector("#user-bio");
    let favGames = document.querySelector("#game-content");

    
    console.log(photo)
    formData.append("image_url", photo);
    fetch('http://localhost:3001/api/profile', {mode:'no-cors', method: "POST", body: formData})
    .then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}



const button = document.getElementById('btn')
button.addEventListener('click', formSubmit);