import React from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

const PostDetails = () => {
  const { id, title, body } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Pressable onPress={router.back}>
        <Text>Go Back</Text>
      </Pressable>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>{body}</Text>
    </View>
  );
};

export default PostDetails;
