import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const UserContext = React.createContext();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Main" component={MainPage} />
            <Tab.Screen name="Question" component={QuestionPage} />
            <Tab.Screen name="Recode" component={RecodePage} />
            <Tab.Screen name="AlbumPage" component={AlbumPage} />
            <Tab.Screen name="User" component={UserPage} />
        </Tab.Navigator>
    );
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [familyId, setFamilyId] = useState('');

    useEffect(() => {
        const loadInitialData = async () => {
            const storedUserId = 'user1'
            const storedFamilyId = 'family1'
            if (!storedUserId || !storedFamilyId) {
                //로그인 페이지
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
                <MainStack.Navigator screenOptions={{ presentation: 'modal' }}>
                    <MainStack.Screen options={{ headerShown: false }} name="Tab" component={TabNavigator} />
                    <MainStack.Screen options={{ headerShown: true }} name="Letter" component={LetterPage} />
                </MainStack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
}

export default App;
