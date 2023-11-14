import React, { useEffect, useState, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from "./src/page/navbar/MainPage";
import RecodePage from "./src/page/navbar/RecodePage";
import UserPage from "./src/page/navbar/UserPage";
import AlbumPage from "./src/page/navbar/AlbumPage";
import QuestionPage from "./src/page/navbar/QuestionPage";
import LetterPage from "./src/page/LetterPage";
import LoadingPage from "./src/page/LoadingPage";
import AlbumDetailPage from "./src/page/AlbumDedetailPage";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './src/contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, }}
        name="Main" component={MainPage} />
      <Stack.Screen name="Letter" component={LetterPage}/>
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

const AlbumStack: FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Album" component={AlbumPage} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailPage} />
    </Stack.Navigator>
  )
}

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const [familyId, setFamilyId] = useState<string>('');
  const [viewLetterPage,setVIewLetterPage] = useState('false')
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

  if (isLoading) {
    return <LoadingPage />;  // 로딩 중일 때는 로딩 페이지를 표시
  }

  return (
    <UserContext.Provider value={{ userId, familyId }}>
      <NavigationContainer>
        <Tab.Navigator  screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Main"
            component={MainStack}
            options={{
              tabBarVisible: false,
            }}
          />
          <Tab.Screen name="Question" component={QuestionPage} />
          <Tab.Screen name="Recode" component={RecodeStack} />
          <Tab.Screen name="Album" component={AlbumStack} />
          <Tab.Screen name="User" component={UserPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
export default App;
