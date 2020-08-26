import React from "react";
import './Map.css';
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import {showDataOnMap} from '../Utils/util';

function Map({countries, casesType, center, zoom}) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
    {/* 확진자 수에 따라 커지는 원을 표시 */}
    {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
