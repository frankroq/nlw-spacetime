import { ImageBackground } from 'react-native'
import { styled } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import * as SecureStore from 'expo-secure-store'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'

const StyleStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(
    null,
  )
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticate(!!token)
    })
  }, [])
  if (!hasLoadedFonts) {
    return <SplashScreen />
  }
  return (
    <ImageBackground
      source={blurBg}
      className="flex-1 relative bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyleStripes className="absolute left-2" />
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
