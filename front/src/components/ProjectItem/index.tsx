import React from 'react'
import { View, Text, Pressable } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

interface ProjectItemProps {
  project: {
    id: string,
    title: string,
    createdAt: string,
  }
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ToDoScreen', { id: project.id })
  }

  const dateFormatter = (date: any) => {
    let d: any = new Date(date);
    console.log(d.toString().substring(4, 15));
    d = d.toString().substring(4, 15)
    return d;
  }

  return (
    <Pressable onPress={onPress} style={[{ flexDirection: 'row', marginBottom: 10, paddingLeft: 10, marginHorizontal: 12, borderRadius: 10, borderWidth: 1, backgroundColor: 'green' }]}>
      <View style={{}}>
        <Icon name="list-ul" color={'#000000'} size={25} />
      </View>
      <View style={{ alignItems: 'center', marginLeft: 10, flex: 1 }}>
        <View style={{ justifyContent: 'flex-start', width: '100%', flexDirection: 'row' }}>
          <Text style={[styles.title, { color: 'white' }]}>{project.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingRight: 10, justifyContent: 'flex-end', width: '100%' }}>
          <Text style={[{ color: 'white', alignContent: 'flex-end', }]}>{dateFormatter(project.createdAt)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ProjectItem
