import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const LoginScreen = ({ loginUser }) => {
  return (
    <View className="py-12 pt-16 flex flex-col flex-1 bg-black px-1">
      <Text className="text-5xl font-bold tracking-tight text-white">
        Ping!
      </Text>
      <Text className="text-gray-300">Security App for IITM</Text>
      <View className="flex-1 flex flex-row items-center">
        <Image
          source={require("../assets/illustration.png")}
          className="w-screen h-auto"
        />
      </View>
      <TouchableOpacity
        className="bg-cyan-900 px-4 rounded-md py-2 space-x-3"
        onPress={loginUser}
      >
        <Text className="text-white text-xl font-medium text-center">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;
