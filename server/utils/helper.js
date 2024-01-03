export const formatLocationFromCoordinates = (camera_data) => {
  const coordinates = { coordinates: [+camera_data.lng, +camera_data.lat] };
  delete camera_data.lng;
  delete camera_data.lat;
  camera_data.location = coordinates;
  return camera_data;
};
