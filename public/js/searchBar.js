const searchHandler = async (event) => {
    event.preventDefault();
    let searchValue = document.querySelector('#searchBar').value;
    searchValue = searchValue.split(' ').join('-');

    if (searchValue) {
        document.location.href = `/search/${searchValue}`
    } else {
        alert('unable to redirect')
    }
}

document
    .querySelector('#sb-container')
    .addEventListener('submit', searchHandler)