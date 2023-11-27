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
import RecodeDetailPage from "../page/RecodeDatailPage";

import AlbumIcon from "../assets/images/svg/AlbumIcon.svg";
import RecodeIcon from "../assets/images/svg/RecodeIcon.svg";
import QuestionIcon from "../assets/images/svg/QuestionIcon.svg";
import MainIcon from "../assets/images/svg/MainIcon.svg";
import UserIcon from "../assets/images/svg/UserIcon.svg";




import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../App'

import QuizRecodePage from "../page/QuizRecodePage";
import QuizModal from "./QuizModal";
import QuizPostPage from "../page/QuizPostPage";
import UserInfoChangePage from "../page/UserInfoChangePage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// MainStack 컴포넌트

const MainStack = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        const currentRouteState = navigationState.routes[navigationState.index].state;
        if (currentRouteState) {
            currentRouteState.index !== 0 ? onTabVisibilityChange() : offTabVisibilityChange();
        }
    }, [navigationState]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Letter" component={LetterPage} />
            <Stack.Screen name="QuizRecode" component={QuizRecodePage} />
            <Stack.Screen name="QuizPost" component={QuizPostPage} />
            <Stack.Screen name="Question" component={QuestionPage} />

        </Stack.Navigator>
    );
};

const AlbumStack = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        const currentRouteState = navigationState.routes[navigationState.index].state;
        if (currentRouteState) {
            currentRouteState.index !== 0 ? onTabVisibilityChange() : offTabVisibilityChange();
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

const RecodeStack = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        const currentRouteState = navigationState.routes[navigationState.index].state;
        if (currentRouteState) {
            currentRouteState.index !== 0 ? onTabVisibilityChange() : offTabVisibilityChange();
        }
    }, [navigationState]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Recode" component={RecodePage} options={{ headerShown: false }} />
            <Stack.Screen name="RecodeDetail" component={RecodeDetailPage} />
        </Stack.Navigator>
    );
};

const UserStack = ({ onTabVisibilityChange, offTabVisibilityChange }) => {
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        const currentRouteState = navigationState.routes[navigationState.index].state;
        if (currentRouteState) {
            currentRouteState.index !== 0 ? onTabVisibilityChange() : offTabVisibilityChange();
        }
    }, [navigationState]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="User" component={UserPage} options={{ headerShown: false }}/>
            <Stack.Screen name="UserInfoChange" component={UserInfoChangePage} />
        </Stack.Navigator>
    );
};



const NavigationComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedDetailPage, setFocusedDetailPage] = useState(false);

  const handleTabVisibilityChangeOn = () => {
    setFocusedDetailPage(true);
  };

  const handleTabVisibilityChangeOff = () => {
    setFocusedDetailPage(false);
  };
  return (
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
              // tabBarStyle: { display: 'none' },
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
          {/*<Tab.Screen name="QuestionTab" component={QuestionPage} />*/}
            <Tab.Screen
                name="RecodeTab"
                options={{
                    tabBarStyle: { display: focusedDetailPage ? "none" : "flex" },
                }}
            >
                {(props) => (
                    <RecodeStack
                        {...props}
                        onTabVisibilityChange={handleTabVisibilityChangeOn}
                        offTabVisibilityChange={handleTabVisibilityChangeOff}
                    />
                )}
            </Tab.Screen>
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
            <Tab.Screen
                name="UserTab"
                options={{
                    tabBarStyle: { display: focusedDetailPage ? "none" : "flex" },
                }}
            >
                {(props) => (
                    <UserStack
                        {...props}
                        onTabVisibilityChange={handleTabVisibilityChangeOn}
                        offTabVisibilityChange={handleTabVisibilityChangeOff}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default NavigationComponent;
