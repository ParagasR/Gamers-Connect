const { response } = require("express");

const bioFormHandler = async (event) => {
    const bioValue = document.querySelector('#bioTextField').value;

    if (bioValue) {
        const reponse = await fetch('api/profile/bio', {
            method: 'PUT',
            body: JSON.stringify({ bioValue }),
            header: { 'Content-Type': "applicaion/json" },
        })

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Failed to change bio")
        }
    } else {
        alert('Text field must not be empty')
    }
}