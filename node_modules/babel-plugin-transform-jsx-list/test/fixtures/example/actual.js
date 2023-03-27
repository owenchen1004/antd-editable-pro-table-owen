import { createElement } from 'react';

function Foo() {
  return (
    <View>
      <View x-for={array}>hello</View>
      <View x-for={item in array}>item: {item}</View>
      <View x-for={(item, key) in foo}>key: {key}, item: {item}</View>
      <View x-for={(item, key) in exp()}>key: {key}, item: {item}</View>
    </View>
  )
}
