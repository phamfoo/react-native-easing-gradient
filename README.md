# React Native Easing Gradient

[![Stable Release](https://img.shields.io/npm/v/react-native-easing-gradient.svg)](https://npm.im/react-native-easing-gradient) [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

Create smooth gradients in React Native

![](demo.png)

## The problem

From https://larsenwork.com/easing-gradients/

> Linear gradients often have hard edges where they start and/or end. We can avoid those by controlling the color mix with easing functions.

## Usage

```js
import { LinearGradient } from 'expo-linear-gradient'
import { easeGradient } from 'react-native-easing-gradient'

const { colors, locations } = easeGradient({
  colorStops: {
    0: {
      color: 'transparent',
    },
    1: {
      color: '#18181B',
    },
  },
})

function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors}
        locations={locations}
        style={styles.overlay}
      />
    </View>
  )
}
```

You can also change the [easing functions](https://reactnative.dev/docs/easing) between the color stops

```js
const { colors, locations } = easeGradient({
  colorStops: {
    0: {
      color: 'transparent',
      // This color stop will now use `Easing.linear` instead of `Easing.ease`
      easing: Easing.linear,
    },
    1: {
      color: '#18181B',
    },
  },
  // The easing function used on all color stops, defaults to `ease-in-out` (Easing.bezier(0.42, 0, 0.58, 1))
  easing: Easing.ease,
})
```

Or the amount of extra color stops added between each transition

```js
const { colors, locations } = easeGradient({
  colorStops: {
    0: {
      color: 'transparent',
    },
    1: {
      color: '#18181B',
    },
  },
  // The more color stops added, the smoother the transition is
  // Defaults to 12
  extraColorStopsPerTransition: 16
})
```
## Credits

- [Easing Linear Gradients](https://css-tricks.com/easing-linear-gradients/)
- [figma-easing-gradient](https://github.com/matchai/figma-easing-gradient)

## Example

To run the example project, follow these steps:

- Clone the repo
- Run these commands

```sh
yarn
cd example
yarn && yarn start
```
