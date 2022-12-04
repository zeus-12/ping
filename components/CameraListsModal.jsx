import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { SERVER_URL } from "../utils/constants";
const CameraListsModal = () => {
  const { user } = useAuthContext();
  const [cameras, setCameras] = useState([]);
  const [pageno, setPageno] = useState(1);
  const fetchAllCameras = async () => {
    // todo implement pagination
    // lets show 20 cameras per page
    const res = await fetch(`${SERVER_URL}/api/cameras?page=${pageno}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });

    const data = await res.json();
    setCameras(data.data);
  };
  useEffect(() => {
    fetchAllCameras;
  }, []);

  return (
    <div>
      {cameras.length != 0 &&
        cameras.map((camera) => <div key={camera.id}></div>)}
    </div>
  );
};
export default CameraListsModal;
