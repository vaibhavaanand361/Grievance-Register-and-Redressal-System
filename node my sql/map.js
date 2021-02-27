import {Client} from "@googlemaps/google-maps-services-js";
const {Client} = require("@googlemaps/google-maps-services-js");


const client = new Client({});

client
  .elevation({
    params: {
      locations: [{ lat: 45, lng: -110 }],
      key: "AIzaSyBgiUa0r5JmNud6jhqB2FQUkgriGTck5Z0",
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log(r.data.results[0].elevation);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });