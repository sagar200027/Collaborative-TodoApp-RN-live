import React from 'react'
import { Pressable, Text } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface CheckBoxProps {
  isChecked: boolean,
  onPress: () => void
}

const Checkbox = (props: CheckBoxProps) => {
  const { onPress, isChecked } = props;
  const name = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'
  return (
    <Pressable onPress={onPress}>
      <Icon name={name} size={30} color="#000" />
    </Pressable>
  )
};

export default Checkbox;
