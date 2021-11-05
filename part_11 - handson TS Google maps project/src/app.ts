import axios from 'axios';

type TGoogleGeocode = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
};
/* this definition of our custom type ensure that we're telling TS what to expect in the response of the request to Gmaps-API */

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // exclamation mark (!) tells TS that this won't be null.

const gMapsApiKey = 'AIzaSyDEaoBTSphBIfvGf1jvr2s4asU8X85KmyI';

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
      const coordinates = response.data.results[0].geometry.location;
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener('submit', searchAddressHandler);
