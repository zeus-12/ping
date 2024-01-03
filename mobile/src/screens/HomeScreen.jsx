import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";

const HomeScreen = () => {
  const SUCCESS = "SUCCESS";
  const ERROR = "ERROR";
  const DEFAULT_RADIUS = 256;
  const NEW_RADIUS = 360;

  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const generateLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude });
  };

  useEffect(() => {
    generateLocation();
  }, []);

  const SERVER_URL = "https://ping-backend-production.up.railway.app";
  // const SERVER_URL = "http://localhost:4000"

  const sendRequest = async () => {
    if (!location.latitude || !location.longitude) {
      setError("Location not found");
      await generateLocation();
      return;
    }
    try {
      await fetch(`${SERVER_URL}/api/ping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude,
        }),
      });

      setStatus(SUCCESS);
    } catch (err) {
      setError(err.message);
      setStatus(ERROR);
      setDefaultRadius();
      console.log(err);
    }
  };

  const increaseRadius = () => {
    setRadius(NEW_RADIUS);
  };

  const setDefaultRadius = () => {
    setRadius(DEFAULT_RADIUS);
  };

  const generateDescription = () => {
    switch (status) {
      case SUCCESS:
        return "Please stay safe!";
      case ERROR:
        return "Something went wrong. Please try again!";
      default:
        return "Press and hold for 1 seconds to send a request.";
    }
  };

  const generateTitle = () => {
    switch (status) {
      case SUCCESS:
        return "Request Sent!";
      case ERROR:
        return "Error!";
      default:
        return "Ping!";
    }
  };

  const cancelRequest = () => {
    setStatus(null);
  };

  const emergencyContacts = [
    {
      name: "Institute Ambulance",
      phone: "+91 44 2257 8333",
    },
    {
      name: "Insti Hospital",
      phone: "+91 44 2257 8331",
    },
  ];

  const requestSentSuccess = status === SUCCESS;

  return (
    <View
      className={`px-4 pb-8 flex flex-col flex-1 pt-8 ${
        requestSentSuccess && "bg-red-400"
      }`}
    >
      <View>
        <Text className="text-4xl mt-4 font-bold">{generateTitle()}</Text>
        <Text className="text-gray-800 text-xl">{generateDescription()}</Text>
        <Text className="text-gray-400">
          {error && `Error message: ${error}`}
        </Text>
      </View>
      {requestSentSuccess ? (
        <View className="flex flex-col flex-1">
          <Text className="text-2xl text-gray-100 font-bold">
            Emergency Contacts
          </Text>
          {emergencyContacts.map((contact) => (
            <View key={contact.name}>
              <Text className="text-xl block font-bold text-gray-800">
                {contact.name}:
              </Text>
              <Text className="text-xl font-semibold">{contact.phone}</Text>
            </View>
          ))}
        </View>
      ) : (
        <TouchableOpacity
          className="items-center justify-center flex flex-1"
          onPressIn={() => {
            increaseRadius();
          }}
          onPressOut={() => {
            setDefaultRadius();
          }}
          onLongPress={() => {
            sendRequest();
          }}
          delayLongPress={1000}
        >
          <View
            className={`bg-red-400 rounded-full `}
            style={{ width: radius, height: radius }}
          ></View>
        </TouchableOpacity>
      )}

      {requestSentSuccess && (
        <TouchableOpacity className="py-2" onPress={cancelRequest}>
          <Text className="text-white text-center tracking-tight text-semibold text-2xl">
            Cancel Request
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default HomeScreen;
