import axios from 'axios';

type TGoogleGeocode = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST';
};
/* this definition of our custom type ensure that we're telling TS what to expect in the response of the request to Gmaps-API */

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // exclamation mark (!) tells TS that this won't be null.

const gMapsApiKey = 'INSERT KEY HERE';

declare var google: any;
// by adding this line, we tell TS: "hey, no worries. There will be a variable called 'google'"

const searchAddressHandler = (event: Event) => {
  event.preventDefault(); //this prevents that a HTTP-request is sent and so that the page it self don't reload.
  const enteredAddress = addressInput.value;

  // here code for calling GMaps-API go
  axios
    .get<TGoogleGeocode>(
      /* by typing here, we'll also enable autocompletion/suggestions on the response =D  */
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${gMapsApiKey}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error("Couldn't fetch entered location");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map'), {
        // this instantiate a map and render it to the Div-element that exists in the index.html-file.
        center: { lat: coordinates.lat, lng: coordinates.lng },
        zoom: 12,
      });

      new google.maps.Marker({
        // as the code gives away, this adds a marker to the map, with the location of the coordinates.
        position: coordinates,
        map: map,
      });
    })
    .catch((err) => {
      console.log(err.message);
      console.log(err);
    });
};

form.addEventListener('submit', searchAddressHandler);
