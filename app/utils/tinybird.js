const fastestGameUrl = (host, token, username) => {
    return `https://${host}/v0/pipes/fastest_game.json?username=${username}&token=${token}`
}

const fetchTinybirdApi = async (url, setData) => {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData.data);
    } catch (error) {
        console.error('Error fetching data: ', error)
    }
    
}

export {
    fetchTinybirdApi,
    fastestGameUrl
}