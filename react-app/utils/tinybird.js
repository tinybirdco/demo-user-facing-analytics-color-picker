const liveClicksURL = (host, token) => {
    return `https://${host}/v0/pipes/live_clicks.json?token=${token}`;
}

const topColorsURL = (host, token, username) => {
    const pass_username = username ? `&username=${username}` : '';
    return `https://${host}/v0/pipes/top_colors.json?token=${token}${pass_username}`;
}

const leaderboardURL = (host, token, page_size, page) => {
    return `https://${host}/v0/pipes/get_leaderboard.json?token=${token}&page_size=${page_size}&page=${page}`;
}




const fetchAPI = async (url, setData) => {
    const data = await fetch(url);
    const jsonData = await data.json();
    setData(jsonData.data);
}

export {
    fetchAPI,
    liveClicksURL,
    topColorsURL,
    leaderboardURL
}