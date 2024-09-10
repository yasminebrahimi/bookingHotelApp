function LocationList() {
    const { data, isloading } = useFetcher("http://localhost:5000/hotels", "");
  
    if (isloading) {
      return <p>Loading...</p>; // Corrected the return of the loading state
    }
  
    return (
      <div className="nearbyLocation"> {/* Wrapper for the nearby locations */}
        <div className="locationList"> {/* Container for the list of locations */}
          <h2>Nearby Locations</h2> {/* Heading for the section */}
          
          {/* Loop through the data array and render each location */}
          {data.map((item) => {
            return (
              <div className="locationItem" key={item.id}> {/* Each location item */}
                <img src={item.picture_url.url} alt={item.name} /> {/* Location image */}
                
                <div className="locationItemDesc"> {/* Description section for the location */}
                  <p className="location">{item.smart_location}</p> {/* Location's smart location */}
                  <p className="name">{item.name}</p> {/* Location's name */}
                  <p className="price">
                    €&nbsp;{item.price}&nbsp; {/* Location's price */}
                    <span>night</span> {/* Price per night */}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } 
    
    export default LocationList; {/* Export the LocationList component */}    
