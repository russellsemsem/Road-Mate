// app/(home)/_layout.tsx
import { Tabs } from 'expo-router/tabs'
import { Book, Circle, User } from 'lucide-react-native'
import { View } from 'react-native'
import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'

export default function HomeLayout() {
  const { isSignedIn } = useAuth()

  // If not signed in, redirect to sign in page
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="knowledge"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Book size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          href: '/',
          headerShown: false,
          tabBarIcon: () => (
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#000',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Circle size={30} color="#fff" />
            </View>
          ),
          tabBarIconStyle: {
            marginBottom: -20,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}