import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import easeGradient from 'react-native-easing-gradient'
import { Text } from 'react-native'

const BACKGROUND_COLOR = '#18181B'

const { colors, locations } = easeGradient({
  colorStops: {
    0: {
      color: 'transparent',
    },
    1: {
      color: BACKGROUND_COLOR,
    },
  },
})

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header} />
      <View style={styles.overlayContainer}>
        <View style={styles.fill}>
          <LinearGradient
            colors={['transparent', BACKGROUND_COLOR]}
            locations={[0, 1]}
            style={styles.fill}
          />
          <View style={styles.description}>
            <Text style={styles.descriptionText}>Before (linear)</Text>
          </View>
        </View>
        <View style={styles.fill}>
          <LinearGradient
            colors={colors}
            locations={locations}
            style={styles.fill}
          />
          <View style={styles.description}>
            <Text style={styles.descriptionText}>After (ease-in-out)</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const HEADER_HEIGHT = 300

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#6366F1',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: HEADER_HEIGHT / 2,
    marginTop: HEADER_HEIGHT / 2,
  },
  fill: {
    flex: 1,
  },
  description: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  descriptionText: {
    color: '#E0E7FF',
  },
})
