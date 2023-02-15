import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Alert, Pressable } from "react-native";
import ProjectItem from "../components/ProjectItem";
import { Text, View } from "../components/Themed";
import { useQuery, gql } from "@apollo/client";

const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
    }
  }
`;

export default function ProjectsScreen() {
  const [project, setProjects] = useState([]);

  const { data, error, loading } = useQuery(MY_PROJECTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      console.log(data, error, loading);

      Alert.alert("Error fetching projects", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProjects(data.myTaskLists);
      console.log(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18 }}>Home</Text>
      </View>
      <FlatList
        data={project}
        renderItem={({ item }) => <ProjectItem project={item} />}
        // ItemSeparatorComponent={() => {
        //   return <View style={{ height: 1, backgroundColor: 'black', margin: 20, marginTop: 10, marginBottom: 10 }}></View>
        // }}
        style={{ width: "100%", marginTop: 10 }}
      />
      <Pressable style={{ height: 45, width: 45,borderRadius:45 , backgroundColor: 'green', position: 'absolute', right: 25, bottom: 25 }}>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#bdbcbb',
    width: '100%'
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  root: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#404040",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },
  time: {
    color: "darkgrey",
  },
});
