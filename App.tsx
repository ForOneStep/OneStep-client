import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from "./src/page/navbar/MainPage";
import RecodePage from "./src/page/navbar/RecodePage";
import UserPage from "./src/page/navbar/UserPage";
import AlbumPage from "./src/page/navbar/AlbumPage";
import QuestionPage from "./src/page/navbar/QuestionPage";
import LetterPage from "./src/page/LetterPage";

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

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
    return (
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{ presentation: 'modal' }}>
                <MainStack.Screen options={{ headerShown: false }} name="Tab" component={TabNavigator} />
                <MainStack.Screen options={{ headerShown: true }} name="Letter" component={LetterPage} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
