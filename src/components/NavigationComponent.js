// NavigationComponent.js
import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigationState } from "@react-navigation/native";
import MainPage from "../page/navbar/MainPage";
import RecodePage from "../page/navbar/RecodePage";
import UserPage from "../page/navbar/UserPage";
import AlbumPage from "../page/navbar/AlbumPage";

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
      if (currentRouteState.index === 1) {
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
  useEffect(() => {
    // AlbumStack이 마운트되면 탭을 숨깁니다.
    offTabVisibilityChange();

    // 컴포넌트가 언마운트될 때 탭을 다시 표시합니다.
    return () => {
      onTabVisibilityChange();
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Album" component={AlbumPage} options={{ headerShown: false }} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailPage} />
    </Stack.Navigator>
  );
};

const NavigationComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [focusedDetailPage, setFocusedDetailPage] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      // 스테이트에서 가져옴
      const storedUserId = 'user1';
      const storedFamilyId = 'family1';
      if (!storedUserId || !storedFamilyId) {
        // 로그인 페이지 실행
      } else {
        setUserId(storedUserId);
        setFamilyId(storedFamilyId);
      }
      setIsLoading(false);  // 로딩 완료
    };
    loadInitialData();
  }, []);

  const handleTabVisibilityChangeOn = () => {
    setFocusedDetailPage(true);
  };

  const handleTabVisibilityChangeOff = () => {
    setFocusedDetailPage(false);
  };

  if (isLoading) {
    return <LoadingPage />;  // 로딩 중일 때는 로딩 페이지를 표시
  }

  return (
    <UserContext.Provider value={{ userId, familyId }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconComponent;
              let iconColor = focused ? '#F7B599' : 'gray';
              if (route.name === 'Main') {
                iconComponent = <MainIcon  />;
              } else if (route.name === 'Question') {
                iconComponent = <QuestionIcon  />;
              } else if (route.name === 'Recode') {
                iconComponent = <RecodeIcon  />;
              } else if (route.name === 'Album') {
                iconComponent = <AlbumIcon  />;
              } else if (route.name === 'User') {
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
            name="Main"
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
          <Tab.Screen name="Question" component={QuestionPage} />
          <Tab.Screen name="Recode" component={RecodePage} />
          <Tab.Screen
            name="Album"
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
          <Tab.Screen name="User" component={UserPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default NavigationComponent;
