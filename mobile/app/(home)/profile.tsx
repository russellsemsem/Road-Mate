// app/(home)/profile.tsx
import { View, Text, Button } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function ProfileScreen() {
  const { signOut } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/sign-in')
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Text>Email: {user?.emailAddresses[0].emailAddress}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  )
}