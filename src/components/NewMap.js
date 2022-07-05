import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function NewMap() {
  const position = [51.1657, 10.4515];
  const [map, setMap] = useState(null);

  const geoJsonRef = useRef();
  const [geoJSON, setGeoJSON] = useState(null);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/master/2_bundeslaender/2_hoch.geo.json"
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setGeoJSON(response);
        if (geoJsonRef.current && map)
          map.fitBounds(geoJsonRef.current.getBounds());
      });
  }, [map]);

  const handleEachFeature = (feature, layer) => {
    const districtName = feature.properties.name;
    layer.bindPopup(districtName);
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectValue(newDistrict);

    if (!newDistrict) return;

    const layer = geoJsonRef.current
      .getLayers()
      .find((layer) => layer._popup._content === newDistrict);
    layer.openPopup();
    map.fitBounds(layer.getBounds());
  };

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: '100%', height: '95vh' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJSON && (
          <GeoJSON
            data={geoJSON}
            onEachFeature={handleEachFeature}
            ref={geoJsonRef}
          />
        )}
      </MapContainer>
      <div>
      <select value={selectValue} onChange={handleDistrictChange}>
        <option value="">Select a district</option>
        {geoJsonRef.current
          ?.getLayers()
          .map((layer) => layer._popup._content)
          .map((equipmentId, id) => (
            <option key={`equipmentId-${id}`} value={equipmentId}>
              {equipmentId}
            </option>
          ))}
      </select>
      </div>
    </>
  );
}