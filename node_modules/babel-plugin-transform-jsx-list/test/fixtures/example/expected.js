import { createList as __create_list__ } from "babel-runtime-jsx-plus";
import { createElement } from 'react';

function Foo() {
  return <View>
      {__create_list__.call(this, array, () => <View>hello</View>)}
      {__create_list__.call(this, array, item => <View>item: {item}</View>)}
      {__create_list__.call(this, foo, (item, key) => <View>key: {key}, item: {item}</View>)}
      {__create_list__.call(this, exp(), (item, key) => <View>key: {key}, item: {item}</View>)}
    </View>;
}
