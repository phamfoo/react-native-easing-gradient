import { Easing, EasingFunction } from 'react-native'
import { createInterpolation } from './create-interpolation'

interface ColorStops {
  [location: number]: {
    color: string
    easing?: EasingFunction
  }
}

interface GradientParams {
  colorStops: ColorStops
  extraColorStopsPerTransition?: number
  easing?: EasingFunction
}

const easeInOut = Easing.bezier(0.42, 0, 0.58, 1)

function easeGradient({ colorStops, easing = easeInOut, extraColorStopsPerTransition = 12 }: GradientParams) {
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

    const colorScale = createInterpolation({
      inputRange: [0, 1],
      outputRange: [startColor, endColor],
      easing: currentEasing,
    })

    const currentTransitionLength = endLocation - startLocation
    const stepSize = 1 / (extraColorStopsPerTransition + 1)

    for (
      let stepIndex = 0;
      stepIndex <= extraColorStopsPerTransition + 1;
      stepIndex++
    ) {
      const progress = stepIndex * stepSize
      const color = colorScale(progress)
      colors.push(color)
      locations.push(startLocation + currentTransitionLength * progress)
    }
  }

  return { colors, locations }
}

export { easeGradient }
