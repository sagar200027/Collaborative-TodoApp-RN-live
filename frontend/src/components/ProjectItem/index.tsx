import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import styles from './styles';

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
  };
}

const ProjectItem = ({project}: ProjectItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ToDoScreen', {id: project.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Icon name="list-ul" size={20} color="#000" style={{marginRight: 10}} />
        <Text style={styles.title}>{project.title}</Text>
      </View>
      <Text style={styles.time}>{project.createdAt}</Text>
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
    justifyContent:'space-between',
    alignItems: 'center',
    // width: '100%',
    borderColor:'green',
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
