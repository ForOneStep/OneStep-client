import React, { useEffect, useState, FC, useRef } from "react";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import MainPage from "./src/page/navbar/MainPage";
import RecodePage from "./src/page/navbar/RecodePage";
import UserPage from "./src/page/navbar/UserPage";
import AlbumPage from "./src/page/navbar/AlbumPage";
import QuestionPage from "./src/page/navbar/QuestionPage";
import LetterPage from "./src/page/LetterPage";
import LoadingPage from "./src/page/LoadingPage";
import AlbumDetailPage from "./src/page/AlbumDedetailPage";


import AlbumIcon from "./src/assets/images/svg/AlbumIcon.svg";
import RecodeIcon from "/src/assets/images/svg/RecodeIcon.svg";
import QuestionIcon from "./src/assets/images/svg/QuestionIcon.svg";
import MainIcon from "./src/assets/images/svg/MainIcon.svg";
import UserIcon from "./src/assets/images/svg/UserIcon.svg";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './src/contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack: FC<{
  onTabVisibilityChange: () => void;
  offTabVisibilityChange: () => void;
}> = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
  const prevRouteNameRef = useRef<string>();
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    const currentRouteState:any = navigationState.routes[navigationState.index].state;
    if(currentRouteState){
      if(currentRouteState.index === 1){
        onTabVisibilityChange()
      }else{
        offTabVisibilityChange()
      }
    }
  }, [navigationState]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Letter" component={LetterPage} />
    </Stack.Navigator>
  )
}

const RecodeStack: FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Recode" component={RecodePage} />
      {/*<Stack.Screen name="RecodeDetail" component={RecodeDetailPage} />*/}
    </Stack.Navigator>
  )
}

  const AlbumStack: FC<{
    onTabVisibilityChange: () => void;
    offTabVisibilityChange: () => void;
  }> = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
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
        <Stack.Screen name="AlbumDetail" component={AlbumDetailPage}
        />
      </Stack.Navigator>
    );
  };

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const [familyId, setFamilyId] = useState<string>('');
  const [focusedDetailPage,setFocusedDetailPage] = useState(false)

  useEffect(() => {
    const loadInitialData = async () => {
      //스테이스에서 가져옴
      const storedUserId = 'user1'
      const storedFamilyId = 'family1'
      if (!storedUserId || !storedFamilyId) {
        //로그인 페이지 실행
      } else {
        setUserId(storedUserId);
        setFamilyId(storedFamilyId);

      }
      setIsLoading(false);  // 로딩 완료
    };
    loadInitialData();
  }, []);


  const handleTabVisibilityChangeOn = () => {
    setFocusedDetailPage(true)
  }

  const handleTabVisibilityChangeOff = () => {

    setFocusedDetailPage(false)
  }
  // if (isLoading) {
  //   return <LoadingPage />;  // 로딩 중일 때는 로딩 페이지를 표시
  // }

  return (
    <UserContext.Provider value={{ userId, familyId }} >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconComponent;
              if (route.name === 'Main') {
                iconComponent = <MainIcon width={size} height={size} fill={focused ? '#F7B599' : color} />;
              } else if (route.name === 'Question') {
                iconComponent = <QuestionIcon width={size} height={size} fill={focused ? '#F7B599' : color} />;
              } else if (route.name === 'Recode') {
                iconComponent = <RecodeIcon width={size} height={size} fill={focused ? '#F7B599' : color} />;
              } else if (route.name === 'Album') {
                iconComponent = <AlbumIcon width={size} height={size} fill={focused ? '#F7B599' : color} />;
              } else if (route.name === 'User') {
                iconComponent = <UserIcon width={size} height={size} fill={focused ? '#F7B599' : color} />;
              }
              return iconComponent;
            },
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
            {(props: any) => (
              <MainStack
                {...props}
                onTabVisibilityChange={handleTabVisibilityChangeOn}
                offTabVisibilityChange={handleTabVisibilityChangeOff}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Question" component={QuestionPage} />
          <Tab.Screen name="Recode" component={RecodeStack} />
          <Tab.Screen
            name="Album"
            options={{
              tabBarStyle: { display: focusedDetailPage ? "none" : "flex" },
            }}
          >
            {(props: any) => (
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
}
export default App;
