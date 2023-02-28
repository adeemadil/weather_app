import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css"; // import the CSS file
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "./styles/WeatherMap.css";

const WeatherMap = ({ location, setLocations }) => {
  const mapContainer = useRef(null);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.lon, location.lat],
      zoom: zoom,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    geocoder.on("result", (event) => {
      console.log(event.result.center[0], event.result.center[1]);
      setZoom(12);
      console.log("lat", location.lat, "lng", location.lng);
      setLocations({
        lon: event.result.center[0],
        lat: event.result.center[1],
      });
    });
    map.addControl(geocoder);

    map.on("click", (e) => {
      console.log(e.lngLat.lng.toFixed(4), e.lngLat.lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
      console.log("lat", location.lat, "lng", location.lng);
      setLocations({ lat: e.lngLat.lat, lon: e.lngLat.lng });
    });

    return () => map.remove();
  }, [zoom, location]);

  return (
    <div>
      <div className="map-container" ref={mapContainer} />
      <div className="sidebar">
        Longitude: {location.lon} | Latitude: {location.lat} | Zoom: {zoom}
      </div>
    </div>
  );
};

export default WeatherMap;
