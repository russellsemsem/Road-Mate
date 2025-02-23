import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'

const ConvAIComponent = () => {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            background-color: white;
          }
          .header {
            text-align: center;
            padding: 2rem;
            width: 100%;
          }
          .title {
            font-size: 2.25rem;
            font-weight: bold;
            margin-bottom: 2rem;
          }
          .widget-container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          elevenlabs-convai {
            position: fixed;
            bottom: 50%;
            right: 50%;
            transform: translate(50%, 50%);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">RoadMate Assistant</h1>
        </div>
        <div class="widget-container">
          <elevenlabs-convai agent-id="t8oRb5fMcATNT0Zv6i0Z"></elevenlabs-convai>
          <script src="https://elevenlabs.io/convai-widget/index.js" async></script>
        </div>
      </body>
    </html>
  `

  return (
    <View style={styles.webviewContainer}>
      <WebView
        style={[styles.webview, { width: windowWidth, height: windowHeight }]}
        source={{ html }}
        javaScriptEnabled={true}
      />
    </View>
  )
}

export default function Page() {
  const { user } = useUser()

  return (
    <View style={styles.container}>
      <SignedIn>
        <View style={styles.content}>
          <ConvAIComponent />
        </View>
      </SignedIn>
      
      <SignedOut>
        <View style={styles.authContainer}>
          <Link href="/(auth)/sign-in" style={styles.link}>
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up" style={styles.link}>
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    backgroundColor: '#fff',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  link: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
})