import React, { useCallback, useMemo, memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import Text from "../../components/text";
import TouchableOpacity from "../../components/touchableOpacity";
import { Colors, Spacings } from "../../../src/style";
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);
export default memo(({
  index,
  label,
  fakeLabel,
  fakeLabelStyle,
  fakeLabelProps,
  itemHeight,
  onSelect,
  offset,
  activeColor = Colors.primary,
  inactiveColor = Colors.grey20,
  style,
  testID,
  centerH = true
}) => {
  const selectItem = useCallback(() => onSelect(index), [index]);
  const itemOffset = index * itemHeight;
  const animatedColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(offset.value, [itemOffset - itemHeight, itemOffset, itemOffset + itemHeight], [inactiveColor, activeColor, inactiveColor]);
    return {
      color
    };
  }, [itemHeight]);
  const containerStyle = useMemo(() => {
    return [{
      height: itemHeight
    }, styles.container];
  }, [itemHeight]);
  return <AnimatedTouchableOpacity activeOpacity={1} style={containerStyle} key={index} centerV centerH={centerH} right={!centerH} onPress={selectItem} // @ts-ignore reanimated2
  index={index} testID={testID} row>
      <AnimatedText text60R style={[animatedColorStyle, style, fakeLabel ? styles.textWithLabelPadding : styles.textPadding]}>
        {label}
      </AnimatedText>
      {fakeLabel && <Text marginL-s2 marginR-s5 text80M color={'white'} {...fakeLabelProps} style={fakeLabelStyle}>
          {fakeLabel}
        </Text>}
    </AnimatedTouchableOpacity>;
});
const styles = StyleSheet.create({
  container: {
    minWidth: Spacings.s10
  },
  textPadding: {
    paddingHorizontal: Spacings.s5
  },
  textWithLabelPadding: {
    paddingLeft: Spacings.s5
  }
});