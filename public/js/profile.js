const updatePicture = async (event) => {
    event.preventDefault();

    const pictureUrl = document.querySelector('#picture-url').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 
    ]

    if (pictureUrl) {
        const response = await fetch('/api/profile/picture', {
            method: 'PUT',
            body: JSON.stringify({ 
                image_url: pictureUrl, 
            }),
            headers: { 'Content-Type' : 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText)
        }
    }
};

document
.querySelector('.image')
.addEventListener('submit', updatePicture);