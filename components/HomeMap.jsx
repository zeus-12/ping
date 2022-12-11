import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import { Icon } from "leaflet";

export function ChangeView({ coords }) {
    const map = useMap();
    map.setView(coords, 17);
    return null;
}

export const helpIcon = new Icon({ iconUrl: "/images/help.svg", iconSize: [40, 40] });
export const cctvIcon = new Icon({ iconUrl: "/images/cctv.svg", iconSize: [40, 40] });

const HomeMap = ({ requests, selectedRequestIndex, handleRequestClick, cameras, selectedCameraIndex }) => {
    const [center, setCenter] = useState([12.989950754997258, 80.2319943225336]);
  
    useEffect(() => {
      if (requests[selectedRequestIndex]) {
        setCenter([requests[selectedRequestIndex].location.lat, requests[selectedRequestIndex].location.lng]);
      }
    }, [selectedRequestIndex, selectedCameraIndex, requests]);
  
    return (
      <MapContainer center={center} zoom={17} style={{ height: '100%' }}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {requests && requests.map((request, index) => (
          <Marker key={request.id} position={[request.location.lat, request.location.lng]} icon={helpIcon} eventHandlers={{ click: () => handleRequestClick(index) }} />
        ))}
        {cameras && cameras.map((camera, index) => (
          <Marker key={index} position={[camera.location.coordinates[1],camera.location.coordinates[0]]} icon={cctvIcon}/>
        ))}
        {requests[selectedRequestIndex] && (
          <Circle center={center} pathOptions={{ color: 'red' }} radius={100} />
        )}
        <ChangeView coords={center} />
      </MapContainer>
    );
};

export default HomeMap;