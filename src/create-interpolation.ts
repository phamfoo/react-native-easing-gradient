import { Animated } from 'react-native'
// @ts-expect-error
const AnimatedInterpolation = Animated.Interpolation

type ColorInterpolateFunction = (input: number) => string

function createInterpolation(
  config: Animated.InterpolationConfigType
): ColorInterpolateFunction {
  return AnimatedInterpolation.__createInterpolation(config)
}

export { createInterpolation }
