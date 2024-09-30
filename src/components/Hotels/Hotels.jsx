import { useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"; 
import Loader from "../Loader/Loader"; 

function Hotels() {

  // Using the useSearchParams hook to get and set URL search parameters
    const [searchParams, setSearchParams] = useSearchParams(); 
    const destination = searchParams.get("destination"); 

     // Getting the "options" parameter from the URL and extracting the "room" property from it
    // JSON.parse is used since the options parameter is stored as a JSON string in the URL
    const room = JSON.parse(searchParams.get("options"))?.room; 
    const { isLoading, data } = useFetcher(
        "http:/localhost:5000/hotels", 
        `q=${destination || "" }&accommodates_gte=${room || 1}`
    ); 


    // If the data is still loading, show the Loader component
  if (isLoading) <Loader />;   
  return  <div>{data.length}</div>; 
}

export default Hotels; 
