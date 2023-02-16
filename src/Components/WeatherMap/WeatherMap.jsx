import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css"; // import the CSS file
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "./styles/WeatherMap.css";

const WeatherMap = ({ lon, latt, onLocationChange }) => {
  const mapContainer = useRef(null);
  const coordsRef = useRef({ lat: latt, lng: lon });
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coordsRef.current.lng, coordsRef.current.lat],
      zoom: zoom,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    geocoder.on("result", (event) => {
      coordsRef.current.lng = event.result.center[0];
      coordsRef.current.lat = event.result.center[1];
      console.log(event.result.center[0], event.result.center[1]);
      setZoom(12);
      console.log("lat", coordsRef.current.lat, "lng", coordsRef.current.lng);
      onLocationChange(coordsRef.current.lat, coordsRef.current.lng);
    });
    map.addControl(geocoder);

    map.on("move", () => {
      console.log(
        map.getCenter().lng.toFixed(4),
        map.getCenter().lat.toFixed(4)
      );
      coordsRef.current.lng = map.getCenter().lng.toFixed(4);
      coordsRef.current.lat = map.getCenter().lat.toFixed(4);
      setZoom(map.getZoom().toFixed(2));
      console.log("lat", coordsRef.current.lat, "lng", coordsRef.current.lat);
      onLocationChange(coordsRef.current.lat, coordsRef.current.lng);
    });

    return () => map.remove();
  }, [coordsRef, zoom, onLocationChange]);

  return (
    <div>
      <div className="map-container" ref={mapContainer} />
      <div className="sidebar">
        Longitude: {coordsRef.current.lng} | Latitude: {coordsRef.current.lat} |
        Zoom: {zoom}
      </div>
    </div>
  );
};

export default WeatherMap;
