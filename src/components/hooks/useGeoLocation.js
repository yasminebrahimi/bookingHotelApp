import { useState } from "react";

export default function useGeoLocation() {


  // State to manage loading status while fetching geolocation
  const [isLoading, setIsLoading] = useState(false);

  // State to store the current geolocation (latitude and longitude)
  const [position, setPosition] = useState({});

  // State to handle any errors that occur during geolocation retrieval
  const [error, setError] = useState(null);


  // Function to get the user's current position using the browser's geolocation API
  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, error, position, getPosition };
}
