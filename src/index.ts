import { Easing, EasingFunction, Animated } from 'react-native'
// @ts-expect-error
import AnimatedInterpolation from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation'

interface ColorStops {
  [location: number]: {
    color: string
    easing?: EasingFunction
  }
}

interface GradientParams {
  colorStops: ColorStops
  easing?: EasingFunction
}

type ColorInterpolateFunction = (input: number) => string

const easeInOut = Easing.bezier(0.42, 0, 0.58, 1)
const TOTAL_STOPS_PER_STEP = 16

function easeGradient({ colorStops, easing = easeInOut }: GradientParams) {
  const colors: string[] = []
  const locations: number[] = []

  const initialLocations = Object.keys(colorStops)
    .map((key) => Number(key))
    .sort()

  const totalColorStops = initialLocations.length

  for (
    let currentStopIndex = 0;
    currentStopIndex < totalColorStops - 1;
    currentStopIndex++
  ) {
    const startLocation = initialLocations[currentStopIndex]
    const endLocation = initialLocations[currentStopIndex + 1]

    const startColor = colorStops[startLocation].color
    const endColor = colorStops[endLocation].color
    const currentEasing = colorStops[startLocation].easing ?? easing

    const interpolationConfig: Animated.InterpolationConfigType = {
      inputRange: [0, 1],
      outputRange: [startColor, endColor],
      easing: currentEasing,
    }

    const colorScale: ColorInterpolateFunction = AnimatedInterpolation.__createInterpolation(
      interpolationConfig
    )

    const stepSize = endLocation - startLocation
    const frameSize = 1 / (TOTAL_STOPS_PER_STEP - 1)

    for (
      let frameIndex = 0;
      frameIndex <= TOTAL_STOPS_PER_STEP - 1;
      frameIndex++
    ) {
      const progress = frameIndex * frameSize
      const color = colorScale(progress)
      colors.push(color)
      locations.push(startLocation + stepSize * progress)
    }
  }

  return { colors, locations }
}

export default easeGradient
