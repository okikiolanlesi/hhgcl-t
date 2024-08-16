import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const Posts = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const getPostsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (getPostsQuery.isError) {
      setRefreshing(false);
      Alert.alert("Unable to fetch posts at this time");
    }
  }, [getPostsQuery.isError]);

  useEffect(() => {
    if (!getPostsQuery.isLoading && !getPostsQuery.isError) {
      setRefreshing(false);
    }
  }, [getPostsQuery.isLoading]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPostsQuery.refetch();
  }, []);

  if (getPostsQuery.isLoading && !refreshing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {getPostsQuery.isError && (
        <Text>Error occured, please pull down to refresh</Text>
      )}
      {getPostsQuery.data?.map((post: any) => (
        <Pressable
          key={post.id}
          onPress={() =>
            router.push({
              pathname: "/postDetails",
              params: { id: post.id, title: post.title, body: post.body },
            })
          }
          style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {post.title}
            </Text>
            <Text>{post.body}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Posts;
