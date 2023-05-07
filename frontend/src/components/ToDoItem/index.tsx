import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, Pressable} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Checkbox from '../Checkbox';

const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean) {
    updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
      id
      content
      isCompleted

      taskList {
        title
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

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  callDeleteItem:Function,
  onSubmit: () => void;
}

const ToDoItem = ({todo, onSubmit,callDeleteItem}: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState('');

  const [updateItem] = useMutation(UPDATE_TODO);
  const input = useRef(null);

  const callUpdateItem = () => {
    updateItem({
      variables: {
        id: todo.id,
        content,
        isCompleted: isChecked,
      },
    });
  };

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if (input.current) {
      input?.current?.focus();
    }
  }, [input]);

  const onKeyPress = async ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      // Delete item
      callDeleteItem();
      console.warn('Delete item');
    }
  };

  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 3}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          isChecked={isChecked}
          onPress={() => {
            setIsChecked(!isChecked);
            callUpdateItem();
          }}
        />

        {/* Text Input */}
        <TextInput
          ref={input}
          value={content}
          onChangeText={setContent}
          style={{
            flex: 1,
            fontSize: 18,
            marginLeft: 12,
          }}
          multiline
          onEndEditing={callUpdateItem}
          onSubmitEditing={onSubmit}
          blurOnSubmit
          onKeyPress={onKeyPress}
        />
      </View>
      <View style={{}}>
        <Pressable onPress={() => callDeleteItem()}>
          <Icon name="delete" size={20} color="red" />
        </Pressable>
      </View>
    </View>
  );
};

export default ToDoItem;
