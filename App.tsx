import React, { useEffect, useState, FC, createContext } from "react";
import NavigationComponent from "./src/components/NavigationComponent";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage from "./src/page/LoadingPage";
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
type UserDataType = {
  userId: string;
  familyId: string;
};
type UserContextType = {
  userId: string | null,
  familyId: string | null,
  setUserData: (userId: string, familyId: string) => void,
};

export const UserContext = createContext<UserContextType>({
  userId: null,
  familyId: null,
  setUserData: () => {},
});
const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>('user4');
  const [familyId, setFamilyId] = useState<string | null>('A1B5E6');

  useEffect(() => {
    const loadInitialData = async () => {
      // try {
        const storedUserId = 'user1';
        const storedFamilyId = 'A1B5E6';

        // AsyncStorage에서 값을 불러오기
        // const fetchedUserId = await AsyncStorage.getItem('userId');
        // const fetchedFamilyId = await AsyncStorage.getItem('familyId');

        // console.log("ads",fetchedUserId,fetchedFamilyId)
        // if (!fetchedUserId || !fetchedFamilyId) {
        //   // 로그인 페이지 실행
        // } else {
        //   setUserId(fetchedUserId);
        //   setFamilyId(fetchedFamilyId);
        // }
      // } catch (error) {
      //   console.error('Error with AsyncStorage:', error);
      // }

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


  const setUserData = ({ userId, familyId }: UserDataType) => {
    setUserId(userId);
    setFamilyId(familyId);
  };

  if (isLoading) {
    return <LoadingPage />;  // 로딩 중일 때는 로딩 페이지를 표시
  }

  return (
    <UserContext.Provider value={{ userId, familyId, setUserData }}>
      <NavigationComponent />
    </UserContext.Provider>
  );
}

export default App;
