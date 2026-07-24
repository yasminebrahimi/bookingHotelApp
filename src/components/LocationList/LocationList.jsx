import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <Loader />;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img
                src={
                  item.thumbnail_url || item.medium_url || "/placeholder.jpg"
                }
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <div className="locationItemDesc">
                <p className="locaiton">{item.smart_location}</p>
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
