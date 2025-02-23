import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Mail, Lock, AlertCircle } from 'lucide-react-native'

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Basic validation
    if (!emailAddress.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailAddress)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError('Unable to sign in. Please check your credentials.')
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ 
        flex: 1,
        padding: 24,
        justifyContent: 'center'
      }}>
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ 
            fontSize: 32,
            fontWeight: '700',
            marginBottom: 8,
            color: '#1a1a1a'
          }}>
            Welcome back
          </Text>
          <Text style={{ 
            fontSize: 16,
            color: '#666'
          }}>
            Sign in to continue to your account
          </Text>
        </View>

        {/* Error Message */}
        {error ? (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fee2e2',
            padding: 12,
            borderRadius: 8,
            marginBottom: 16
          }}>
            <AlertCircle size={20} color="#ef4444" style={{ marginRight: 8 }} />
            <Text style={{ color: '#ef4444', flex: 1 }}>{error}</Text>
          </View>
        ) : null}

        {/* Email Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ 
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 8,
            color: '#374151'
          }}>
            Email address
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 8,
            padding: 12
          }}>
            <Mail size={20} color="#9ca3af" style={{ marginRight: 8 }} />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              onChangeText={setEmailAddress}
              placeholder="Enter your email"
              style={{
                flex: 1,
                fontSize: 16,
                color: '#1f2937'
              }}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 14,
            fontWeight: '500',
            marginBottom: 8,
            color: '#374151'
          }}>
            Password
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 8,
            padding: 12
          }}>
            <Lock size={20} color="#9ca3af" style={{ marginRight: 8 }} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              style={{
                flex: 1,
                fontSize: 16,
                color: '#1f2937'
              }}
            />
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isLoading}
          style={{
            backgroundColor: '#000',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 16
          }}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Sign in
            </Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={{ 
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: '#6b7280', fontSize: 14 }}>
            Don't have an account?{' '}
          </Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={{ 
                color: '#000',
                fontSize: 14,
                fontWeight: '600'
              }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}