// import React, {useRef} from 'react';
// import {Pressable, StyleSheet, TextInput, View} from 'react-native';
// // import {Text} from '../screens/Estudante/styles';
// import {COLORS} from '../assets/colors';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Search = props => {
//   const inputRef = useRef(null);
//   const sendIsDisable = props.value.trim().length === 0;

//   function focusInput() {
//     inputRef.current?.focus();
//   }

//   return (
//     <View>
//       <Pressable onPress={focusInput}>
//         <View style={styles.container}>
//           <TextInput
//             onChangeText={props.onChangeFiltro}
//             style={styles.input}
//             value={props.value}
//             placeholder="Faça sua pesquisa..."
//           />
//           <View style={styles.container2}>
//             <Pressable
//               disabled={sendIsDisable}
//               onPress={() => props.searchImovel(props.value)}>
//               <Icon name="search" size={20} color="black" />
//             </Pressable>
//           </View>
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 10,
//     marginRight: 10,
//     padding: 16,
//     borderWidth: 1,
//     borderRadius: 12,
//     borderColor: COLORS.primaryDark,
//     justifyContent: 'space-between',
//   },
//   container2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     flexGrow: 1,
//     flexShrink: 1,
//     padding: 0,
//   },
// });

// export default Search;
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform} from 'react-native';
import {useTheme, SearchBar} from '@rneui/themed';

export default ({text, setSearch}) => {
  const {theme} = useTheme();
  return (
    <SearchBar
      placeholder={text}
      platform={Platform.OS === 'android' ? 'android' : 'ios'}
      searchIcon={{
        type: 'ionicon',
        name: 'search',
        size: 20,
        color: theme.colors.grey4,
      }}
      clearIcon={{
        type: 'ionicon',
        name: 'close',
        size: 20,
        color: theme.colors.grey4,
      }}
      cancelIcon={{
        type: 'ionicon',
        name: 'arrow-back',
        size: 20,
        color: theme.colors.grey4,
      }}
      containerStyle={{height: 50}}
      returnKeyType="next"
      onChangeText={t => setSearch(t)}
    />
  );
};
