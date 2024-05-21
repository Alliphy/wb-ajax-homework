import axios from 'axios';


// PART 1: Show Dog Photo
async function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
  const dogImageUrl = 'https://dog.ceo/api/breeds/image/random';
  
  try {
    const response = await axios.get(dogImageUrl);
    const dogImage = response.data.message //extract the image URL from the response
    
    const img = document.createElement("img");
    img.src = dogImage; 
    
    // clear existing image in the #dog-image div
    const dogImgContainer = document.getElementById("dog-image");
    dogImgContainer.innerHTML = ""; //this will remove previous content
    
    // append the child new image to the #dog-image container div
    dogImgContainer.appendChild(img);
  } catch (error) {
    // will display error if image doesn't run properly
    console.error("Error getting dog image:", error);
  }
}
  
// this was not working for me until I added my function() and returned showDogPhoto within the event listener. otherwise it kept telling me that showDogPhoto wasn't a function
document.querySelector('#get-dog-image').addEventListener('click', function() {
  console.log("clicked");
  showDogPhoto();
});


// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
const url = `/weather.txt?zipcode=${zipcode}`

const response = await axios.get (url);

document.querySelector("#weather-info").innerText = response.data;
  
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!

  evt.preventDefault();
  // TODO: show the result message after your form
  const orderForm = document.getElementById("order-form");
  
  const cookieType = document.getElementById("cookie-type-field").value;
  
  const qty = document.getElementById("qty-field").value;
  
  const response = await axios.post(
    "/order-cookies.json",
    { cookieType: cookieType, qty: qty }
  );
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  const orderStatusDiv = document.getElementById("order-status");
  orderStatusDiv.innerText = response.data.message;

  if(response.data.resultCode === "ERROR") {
    orderStatusDiv.classList.add("order-error");
  } else {
    orderStatusDiv.classList.remove("order-error");
  }
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  // TODO: In the #itunes-results list, show all results in the following format:
  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  // `Artist: ${artistName} Song: ${trackName}`

  const response = await axios.get(url);
  let displayString = "";
  for (const result of response.data.results) {
    displayString += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`
  }
  document.querySelector("#itunes-results").innerHTML = displayString;
}

document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
