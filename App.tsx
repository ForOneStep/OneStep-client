import React, { useEffect, useState, FC } from "react";
import NavigationComponent from "./src/components/NavigationComponent";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './src/contexts/UserContext';
import LoadingPage from "./src/page/LoadingPage";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');
  const [familyId, setFamilyId] = useState<string>('');
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedUserId = 'user1';
        const storedFamilyId = 'A1B5E6';

        // AsyncStorage에 값을 저장
        await AsyncStorage.setItem('userId', storedUserId);
        await AsyncStorage.setItem('familyId', storedFamilyId);

        // AsyncStorage에서 값을 불러오기
        const fetchedUserId = await AsyncStorage.getItem('userId');
        const fetchedFamilyId = await AsyncStorage.getItem('familyId');

        if (!fetchedUserId || !fetchedFamilyId) {
          // 로그인 페이지 실행
        } else {
          setUserId(fetchedUserId);
          setFamilyId(fetchedFamilyId);
        }
      } catch (error) {
        console.error('Error with AsyncStorage:', error);
      }
      setIsLoading(false);  // 로딩 완료
    };
    loadInitialData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;  // 로딩 중일 때는 로딩 페이지를 표시
  }

  return (
    <UserContext.Provider value={{ userId, familyId }} >
      <NavigationComponent />
    </UserContext.Provider>
  );
}

export default App;
