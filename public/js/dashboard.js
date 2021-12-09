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

