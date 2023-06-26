import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Alert, Pressable} from 'react-native';
import ProjectItem from '../components/ProjectItem';
import {Text, View} from '../components/Themed';
import {useQuery, gql, useMutation} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {ADD_PROJECT, DELETE_PROJECT, MY_PROJECTS} from '../apis/ProjectsScreen';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProjectsScreen() {
  const navigation = useNavigation();
  const [project, setProjects] = useState([]);

  const {data, error, refetch, loading} = useQuery(MY_PROJECTS, {
    fetchPolicy: 'network-only',
  });

  const [createTaskList] = useMutation(ADD_PROJECT);
  const [deleteTaskList] = useMutation(DELETE_PROJECT);

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

  const deleteList = (id: any) => {
    deleteTaskList({
      variables: {
        id: id,
      },
    }).then(() => {
      refetch();
    });
  };

  const logout = () => {
    AsyncStorage.setItem('token', '').then(() => {
      // redirect home
      navigation.dispatch(
        CommonActions.reset({index: 1, routes: [{name: 'Splash'}]}),
      );
    });
    // navigation.reset([NavigationActions.navigate({routeName:'Splash'})]);
    // const resetAction = NavigationActions.reset({
    //   index: 1,
    //   actions: ,
    // });
    // navigation.dispatch(resetAction);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          // justifyContent: 'space-between',
          // borderBottomWidth: 1,
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
        }}>
        <Pressable style={{width: '10%'}}>
          <Icon sty name="menu" size={35} color={'black'} />
        </Pressable>

        <View style={{width: '80%', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>Home</Text>
        </View>

        <View />
      </View>
      <FlatList
        data={project}
        renderItem={({item}) => {
          return (
            <ProjectItem
              deleteList={() => deleteList(item?.id)}
              project={item}
            />
          );
        }}
        style={{width: '100%'}}
      />

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={logout}>
        <Text style={{color: 'red', fontSize: 17, marginRight: 5}}>Logout</Text>
        <Icon1 name="logout" size={20} color={'red'} />
      </Pressable>
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
