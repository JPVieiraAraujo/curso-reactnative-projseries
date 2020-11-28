import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import SeriesScreen from './src/screens/SeriesScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator 
        screenOptions={{
          title: "Series",
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6ca2f7',
            borderBottomWidth: 1,
            borderBottomColor: '#C5C5C5'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
          }
        
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={SeriesScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;