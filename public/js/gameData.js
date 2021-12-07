const getGameData = async (event) => {
  event.preventDefault();
  try {
    const gameData = await fetch(`/api/post/getGameData`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    });

    console.log(gameData)
  } catch (err) {
    console.log(err)
  }
}

document.querySelector('#test').addEventListener('click', getGameData)