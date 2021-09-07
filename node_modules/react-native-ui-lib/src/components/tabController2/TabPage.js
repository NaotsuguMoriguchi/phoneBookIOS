import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { useAnimatedStyle, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import TabBarContext from "./TabBarContext";
import { Constants } from "../../helpers";

/**
 * @description: TabController's TabPage
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
export default function TabPage({
  testID,
  index,
  lazy,
  renderLoading,
  ...props
}) {
  const {
    currentPage,
    targetPage,
    asCarousel,
    containerWidth
  } = useContext(TabBarContext);
  const [shouldLoad, setLoaded] = useState(!lazy);
  const lazyLoad = useCallback(() => {
    if (lazy && !shouldLoad) {
      setLoaded(true);
    }
  }, [lazy, shouldLoad]);
  useAnimatedReaction(() => {
    return targetPage.value === index;
  }, isActive => {
    if (isActive) {
      runOnJS(lazyLoad)();
    }
  });
  const animatedPageStyle = useAnimatedStyle(() => {
    const isActive = Math.round(currentPage.value) === index;
    return {
      opacity: isActive || asCarousel ? 1 : 0,
      zIndex: isActive || asCarousel ? 1 : 0,
      width: asCarousel ? containerWidth.value || Constants.screenWidth : undefined
    };
  });
  return <Reanimated.View style={[!asCarousel && styles.page, animatedPageStyle]} testID={testID}>
      {!shouldLoad && renderLoading?.()}
      {shouldLoad && props.children}
    </Reanimated.View>;
}
const styles = StyleSheet.create({
  page: { ...StyleSheet.absoluteFillObject
  }
});