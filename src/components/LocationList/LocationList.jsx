function LocationList() {
    const { data, isloading } = useFetcher("http://localhost:5000/hotels", "");
  
    if (isloading) {
      return <p>Loading...</p>; // Corrected the return of the loading state
    }
  
    return (
      <div className="nearbyLocation">
        <div className="locationList">
          <h2>Nearby Locations</h2>
          {data.map((item) => {
            return (
              <div className="locationItem" key={item.id}>
                <img src={item.picture_url.url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    €&nbsp;{item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default LocationList;
  