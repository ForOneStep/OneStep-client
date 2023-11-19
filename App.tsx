import React, { useEffect, useState, FC } from "react";
import NavigationComponent from "./src/components/NavigationComponent";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './src/contexts/UserContext';
import LoadingPage from "./src/page/LoadingPage";
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

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

      // 앨범 접근 권한 및 카메라 사용 권한 요청
      const permissions = [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA];
      for (let permission of permissions) {
        let result = await check(permission);
        if (result !== RESULTS.GRANTED) {
          result = await request(permission);
          if (result !== RESULTS.GRANTED) {
            console.log('Permission not granted: ', permission);
          }
        }
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
