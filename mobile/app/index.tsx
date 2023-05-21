import { Text, View, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

import { api } from '../src/lib/api'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/452ccf6f4cef0ec32f09',
}

export default function App() {
  const router = useRouter()
  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '452ccf6f4cef0ec32f09',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )
  async function handleGithubOAuthCode(code: string) {
    const response = await api
      .post('/register', {
        code,
      })
      .catch((err) => {
        console.error(err)
      })
    const { token } = response.data
    await SecureStore.setItemAsync('token', token).catch((error) => {
      console.error(error)
    })
    router.push('/memories')
    // console.log(code)
  }
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10 ">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-alt text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leadding-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
          className="rounded-full bg-green-500 px-5 py-3"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
        <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da Rocketseat
        </Text>
      </View>
    </View>
  )
}
