import { useState } from "react";
import { View, ScrollView, StatusBar, Text } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { screenHeight } from "./src/utils/helper";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = () => setIsLoggedIn(true);

  return (
    <View className="flex flex-col " style={{ minHeight: screenHeight }}>
      {!isLoggedIn ? <LoginScreen loginUser={loginUser} /> : <HomeScreen />}
    </View>
  );
};

export default App;
