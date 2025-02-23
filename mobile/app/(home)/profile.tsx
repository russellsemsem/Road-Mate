// app/(home)/profile.tsx
import { View, Text, Button, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Mail, Phone, Plus, X } from 'lucide-react-native'

export default function ProfileScreen() {
  const { signOut } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/(auth)/sign-in')
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingTop:40 }}>
      {/* Header */}
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: '600' }}>Your Profile</Text>
          <TouchableOpacity>
            {/* <X size={24} color="#000" /> */}
          </TouchableOpacity>
        </View>
        {/* <Text style={{ color: '#666', fontSize: 16 }}>Manage your account info.</Text> */}
      </View>

      {/* Navigation Menu */}
      {/* <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#f0f0f0',
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
          }}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 12,
            borderRadius: 8,
          }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Security</Text>
        </TouchableOpacity>
      </View> */}

      {/* Profile Section */}
      <View style={{ padding: 20 }}>
        {/* <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 20 }}>Profile details</Text> */}
        
        <View style={{ marginBottom: 30 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 15 }}>Profile</Text> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {user?.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }}
                />
              ) : (
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#f0f0f0', marginRight: 15 }} />
              )}
              <Text style={{ fontSize: 16 }}>{user?.fullName}</Text>
            </View>
            <TouchableOpacity>
              <Text style={{ color: '#000', fontSize: 16 }}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email Section */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 15 }}>Email addresses</Text>
          {user?.emailAddresses.map((email, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Mail size={20} color="#666" style={{ marginRight: 10 }} />
              <View>
                <Text style={{ fontSize: 16 }}>{email.emailAddress}</Text>
                {email.id === user.primaryEmailAddressId && (
                  <Text style={{ color: '#666', fontSize: 14 }}>Primary</Text>
                )}
              </View>
            </View>
          ))}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Plus size={20} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 16 }}>Add email address</Text>
          </TouchableOpacity>
        </View>

        {/* Phone Section */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 15 }}>Phone number</Text>
          {user?.phoneNumbers.map((phone, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Phone size={20} color="#666" style={{ marginRight: 10 }} />
              <View>
                <Text style={{ fontSize: 16 }}>{phone.phoneNumber}</Text>
                {phone.id === user.primaryPhoneNumberId && (
                  <Text style={{ color: '#666', fontSize: 14 }}>Primary</Text>
                )}
              </View>
            </View>
          ))}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Plus size={20} color="#000" style={{ marginRight: 10 }} />
            <Text style={{ color: '#000', fontSize: 16 }}>Add phone number</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: '#f0f0f0',
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{ color: '#ff4444', fontSize: 16, fontWeight: '500' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}