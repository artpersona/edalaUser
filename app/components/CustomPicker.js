import React from 'react';
import {View} from 'react-native';
import {useController} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

const CustomInput = props => {
  const {control, name, rules, defaultValue} = props;
  const {field} = useController({
    control,
    defaultValue: defaultValue ?? '',
    name,
    rules: rules,
  });

  console.log('rules are: ', rules);

  console.log('error is: ', props.error);
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: props?.error ? 'red' : 'whitesmoke',
        overflow: 'hidden',
        marginBottom: '5%',
      }}>
      <Picker
        selectedValue={field.value}
        onValueChange={field.onChange}
        {...props}>
        {props?.items?.map((item, index) => {
          return (
            <Picker.Item key={index} label={item.label} value={item.value} />
          );
        })}
      </Picker>
    </View>
  );
};

export default CustomInput;
