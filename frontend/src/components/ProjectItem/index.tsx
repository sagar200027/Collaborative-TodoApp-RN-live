import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {gql, useMutation} from '@apollo/client';
// import styles from './styles';


interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
  };
  deleteList:Function
}

const ProjectItem = ({project,deleteList}: ProjectItemProps) => {
  const navigation = useNavigation();
  console.log(project);

  const onPress = () => {
    navigation.navigate('ToDoScreen', {id: project.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon1
          name="list-ul"
          size={20}
          color="#000"
          style={{marginRight: 10}}
        />
        <Text style={styles.title}>{project.title}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.time}>{project.createdAt}</Text>
        <Pressable onPress={() => deleteList()}>
          <Icon2
            name="delete"
            size={20}
            color="red"
            style={{marginRight: 10}}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    borderColor: 'green',
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
    color: 'green',
  },
  time: {
    color: 'darkgrey',
    textAlign: 'right',
  },
});
