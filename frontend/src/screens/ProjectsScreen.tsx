import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Alert, Pressable} from 'react-native';
import ProjectItem from '../components/ProjectItem';
import {Text, View} from '../components/Themed';
import {useQuery, gql, useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';

const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
    }
  }
`;

const ADD_PROJECT = gql`
  mutation createTaskList($title: String!) {
    createTaskList(title: $title) {
      id
      title
      users {
        id
      }
    }
  }
`;

export default function ProjectsScreen() {
  const [project, setProjects] = useState([]);

  const {data, error, refetch, loading} = useQuery(MY_PROJECTS, {
    fetchPolicy: 'network-only',
  });

  const [createTaskList] = useMutation(ADD_PROJECT);

  useEffect(() => {
    if (error) {
      console.log('projects screen', data, error, loading);

      Alert.alert('Error fetching projects', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProjects(data.myTaskLists);
    }
  }, [data]);

  const addTaskList = async (title: String) => {
    createTaskList({
      variables: {
        title: title,
      },
    }).then(() => {
      refetch();
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={project}
        renderItem={({item}) => <ProjectItem project={item} />}
        style={{width: '100%'}}
      />
      <Pressable
        onPress={() => addTaskList('TASKLIST')}
        style={styles.addTaskButton}>
        <Icon name="add" size={20} color={'#fff'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#404040',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
  },
  time: {
    color: 'darkgrey',
  },
  addTaskButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'green',
    padding: 13,
    borderRadius: 25,
  },
});
