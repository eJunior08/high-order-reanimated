import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  withTiming,
  withRepeat,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

import { Button, StyleGuide } from "./src/components/core";

import ChatBubble from "./src/components/ChatBubble";

const easing = Easing.inOut(Easing.ease);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

const App = () => {
  const [play, setPlay] = useState(false);
  const progress = useSharedValue<null | number>(null);
  const paused = useSharedValue(!play);

  return (
    <View style={styles.container}>
      <ChatBubble progress={progress} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
          paused.value = !paused.value;
          if (progress.value === null) {
            progress.value = withPause(
              withRepeat(
                withTiming(1, {
                  duration: 1000,
                  easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
              ),
              paused
            );
          }
        }}
      />
    </View>
  );
};

export default App;
