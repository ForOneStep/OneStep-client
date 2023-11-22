// NavigationComponent.js
import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigationState } from "@react-navigation/native";
import MainPage from "../page/navbar/MainPage";
import RecodePage from "../page/navbar/RecodePage";
import UserPage from "../page/navbar/UserPage";
import AlbumPage from "../page/navbar/AlbumPage";
import NewPost from "./NewPost";

import QuestionPage from "../page/navbar/QuestionPage";
import LetterPage from "../page/LetterPage";
import LoadingPage from "../page/LoadingPage";
import AlbumDetailPage from "../page/AlbumDedetailPage";


import AlbumIcon from "../assets/images/svg/AlbumIcon.svg";
import RecodeIcon from "../assets/images/svg/RecodeIcon.svg";
import QuestionIcon from "../assets/images/svg/QuestionIcon.svg";
import MainIcon from "../assets/images/svg/MainIcon.svg";
import UserIcon from "../assets/images/svg/UserIcon.svg";




import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// MainStack 컴포넌트
const MainStack = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    const currentRouteState = navigationState.routes[navigationState.index].state;
    if (currentRouteState) {
      if (currentRouteState.index !== 0) {
        onTabVisibilityChange();
      } else {
        offTabVisibilityChange();
      }
    }
  }, [navigationState]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Letter" component={LetterPage} />
    </Stack.Navigator>
  );
};

// AlbumStack 컴포넌트
const AlbumStack = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    const currentRouteState = navigationState.routes[navigationState.index].state;
    if (currentRouteState) {
      if (currentRouteState.index !== 0) {
        onTabVisibilityChange();
      } else {
        offTabVisibilityChange();
      }
    }
  }, [navigationState]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Album" component={AlbumPage} options={{ headerShown: false }} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailPage} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
};

const NavigationComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [focusedDetailPage, setFocusedDetailPage] = useState(false);

  const handleTabVisibilityChangeOn = () => {
    setFocusedDetailPage(true);
  };

  const handleTabVisibilityChangeOff = () => {
    setFocusedDetailPage(false);
  };

  return (
    <UserContext.Provider value={{ userId, familyId }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconComponent;
              let iconColor = focused ? '#F7B599' : 'gray';
              if (route.name === 'MainTab') {
                iconComponent = <MainIcon  />;
              } else if (route.name === 'QuestionTab') {
                iconComponent = <QuestionIcon  />;
              } else if (route.name === 'RecodeTab') {
                iconComponent = <RecodeIcon  />;
              } else if (route.name === 'AlbumTab') {
                iconComponent = <AlbumIcon  />;
              } else if (route.name === 'UserTab') {
                iconComponent = <UserIcon  />;
              }
              return iconComponent;
            },
            tabBarInactiveBackgroundColor:'#f1f1f1',
            tabBarActiveTintColor: '#F7B599',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="MainTab"
            options={{
              tabBarStyle: { display: focusedDetailPage ? "none" : "flex" },
            }}
          >
            {(props) => (
              <MainStack
                {...props}
                onTabVisibilityChange={handleTabVisibilityChangeOn}
                offTabVisibilityChange={handleTabVisibilityChangeOff}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="QuestionTab" component={QuestionPage} />
          <Tab.Screen name="RecodeTab" component={RecodePage} />
          <Tab.Screen
            name="AlbumTab"
            options={{
              tabBarStyle: { display: focusedDetailPage ? "none" : "flex" },
            }}
          >
            {(props) => (
              <AlbumStack
                {...props}
                onTabVisibilityChange={handleTabVisibilityChangeOn}
                offTabVisibilityChange={handleTabVisibilityChangeOff}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="UserTab" component={UserPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default NavigationComponent;
