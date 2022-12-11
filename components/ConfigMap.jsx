import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from "leaflet";

export function ChangeView({ coords }) {
    const map = useMap();
    map.setView(coords, 18);
    return null;
}

export const cctvIcon = new Icon({ iconUrl: "/images/cctv.svg", iconSize: [40, 40] });

const ConfigMap = ({ lat, lng, selected }) => {
    const defaultLocation = [12.989950754997258, 80.2319943225336];
    const [center, setCenter] = useState(defaultLocation);
  
    useEffect(() => {
      if (lat && lng) {
        setCenter([lat, lng]);
      } else {
        setCenter(defaultLocation);
      }
    }, [lat, lng]);
  
    return (
      <MapContainer center={center} zoom={18} style={{ height: '100%' }}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selected && <Marker position={center} icon={cctvIcon}/>}
        <ChangeView coords={center} />
      </MapContainer>
    );
};

export default ConfigMap;