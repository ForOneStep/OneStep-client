

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from "./src/page/mainPage";
import RecodePage from "./src/page/recodePage";
import UserPage from "./src/page/userPage";
import AlbumPage from "./src/page/albumPage";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();


  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Main" component={MainPage} />
          <Tab.Screen name="Recode" component={RecodePage} />
          <Tab.Screen name="AlbumPage" component={AlbumPage} />
          <Tab.Screen name="User" component={UserPage} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;
