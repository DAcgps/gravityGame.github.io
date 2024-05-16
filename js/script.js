async function fetchAndUseIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('Your Public IP Address:', data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return null;
    }
}
console.log(fetchAndUseIP());

var ip = fetchAndUseIP().then();
$(document).click(function() {
    fetchAndUseIP().then(ip => alert("bum your ip is"+ip));
})