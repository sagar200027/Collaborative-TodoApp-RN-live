import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ToDoItem from '../components/ToDoItem';

import {Text, View} from '../components/Themed';

const GET_PROJECT = gql`
  query getTasklist($id: ID!) {
    getTaskList(id: $id) {
      id
      title
      createdAt
      todos {
        id
        content
        isCompleted
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createToDo($content: String!, $taskListId: ID!) {
    createToDo(content: $content, taskListId: $taskListId) {
      id
      content
      isCompleted

      taskList {
        id
        progress
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteToDo($id: ID!) {
    deleteToDo(id: $id)
  }
`;

let id = '4';

export default function ToDoScreen() {
  const navigation = useNavigation();
  const [project, setProject] = useState({todos: []});
  const [title, setTitle] = useState('');
  const [dropDown, setDropDown] = useState(false);

  const route = useRoute();
  const id = route.params.id;
  const deleteList = route.params.deleteList;

  const {data, error, refetch, loading} = useQuery(GET_PROJECT, {
    variables: {id},
  });
  const [deleteItem] = useMutation(DELETE_TODO);
  const [createTodo, {data: createTodoData, error: createTodoError}] =
    useMutation(CREATE_TODO, {refetchQueries: GET_PROJECT});

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (error) {
      // console.log(error);
      Alert.alert('Error fetching project', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
    }
  }, [data]);

  const createNewItem = (atIndex: number) => {
    createTodo({
      variables: {
        content: '',
        taskListId: id,
      },
    }).then(() => {
      refetch();
    });
    // const newTodos = [...todos];
    // newTodos.splice(atIndex, 0, {
    //   id: id,
    //   content: '',
    //   isCompleted: false
    // })
    // setTodos(newTodos);
  };

  const addTodo = () => {
    createTodo({
      variables: {
        content: '',
        taskListId: id,
      },
    });
  };

  const callDeleteItem = (id: any) => {
    deleteItem({
      variables: {
        id: id,
      },
    }).then(() => {
      refetch();
    });
  };

  if (!project) {
    return null;
  }
  console.log('todos array', project.todos);

  const deleteTaskList = async () => {
    navigation.goBack();
    await deleteTaskList();
  };

  const renderItem = ({item, index}: any) => {
    switch (index) {
      // Header
      case 0: {
        return (
          <Modal
            animationType="fade"
            transparent={true}
            visible={dropDown}
            onRequestClose={() => {
              setDropDown(false);
            }}>
            <View style={styles.centeredView}>
              <Pressable
                onPress={() => deleteTaskList()}
                style={{padding: 10, paddingHorizontal: 20}}>
                <Text
                  onPress={deleteList}
                  style={{fontSize: 17, fontWeight: '600', color: 'red'}}>
                  Delete this todo list
                </Text>
              </Pressable>
            </View>
          </Modal>
        );
      }
      case 1: {
        return (
          <View style={styles.container}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={'Title'}
              style={styles.title}
            />

            <View style={{width: '100%', flex: 1}}>
              <FlatList
                data={project?.todos ?? []}
                renderItem={({item, index}) => {
                  console.log('todo item', item);

                  return (
                    <ToDoItem
                      todo={item}
                      callDeleteItem={() => callDeleteItem(item?.id)}
                      onSubmit={() => createNewItem(index + 1)}
                    />
                  );
                }}
                style={{width: '90%'}}
              />
            </View>
          </View>
        );
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            // backgroundColor: 'green',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Icon sty name="arrow-back" size={25} color={'black'} />
        </Pressable>
        <Text style={{fontSize: 20, fontWeight: '600'}}>ToDo</Text>

        <Pressable
          onPress={() => setDropDown(prev => !prev)}
          style={{
            // backgroundColor: 'green',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Icon name="options" size={25} color={'black'} />
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <FlatList data={[0, 1, 2, 3, 4]} renderItem={renderItem} />
      </View>
      <Pressable
        onPress={addTodo}
        style={{
          backgroundColor: 'green',
          position: 'absolute',
          padding: 10,
          right: 30,
          bottom: 30,
          borderRadius: 25,
        }}>
        <Icon name="add" size={20} color={'#fff'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // padding: 12,
  },
  title: {
    width: '100%',
    fontSize: 20,
    // color: 'white',
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
