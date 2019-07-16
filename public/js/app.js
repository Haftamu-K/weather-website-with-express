const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageP = document.querySelector('#message-1');
const messageLocation= document.querySelector('#message-2');

const fetchWeather = (address) => {
    const url = "http://localhost:3000/weather?address=" + encodeURIComponent(address);
    messageP.textContent = "Loading ..... ";
    messageLocation.textContent = '';
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error)
                messageP.textContent = data.error;
            else{
                messageP.textContent = data.forcast;
                messageLocation.textContent = data.location;
            }
                
        })
    })
};

weatherForm.addEventListener('submit',  (event) => {
    event.preventDefault();
    const address = search.value;
    fetchWeather(address);
})