import _pt from "prop-types";
import _ from 'lodash';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { EasingNode, Easing as _Easing } from 'react-native-reanimated';
import { Colors, BorderRadiuses, Spacings } from "../../style";
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import Segment from "./segment";
import { Constants } from "../../helpers";
const {
  interpolate: _interpolate,
  interpolateNode
} = Reanimated;
const interpolate = interpolateNode || _interpolate;
const Easing = EasingNode || _Easing;
const BORDER_WIDTH = 1;

/**
 * @description: SegmentedControl component for toggling two values or more
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SegmentedControlScreen.tsx
 */
const SegmentedControl = props => {
  const {
    onChangeIndex,
    initialIndex = 0,
    containerStyle,
    style,
    segments,
    activeColor = Colors.primary,
    borderRadius = BorderRadiuses.br100,
    backgroundColor = Colors.grey80,
    activeBackgroundColor = Colors.white,
    inactiveColor = Colors.grey20,
    outlineColor = activeColor,
    outlineWidth = BORDER_WIDTH,
    testID
  } = props;
  const [selectedSegment, setSelectedSegment] = useState(-1);
  const segmentsStyle = useRef([]);
  const segmentedControlHeight = useRef(0);
  const indexRef = useRef(0);
  const segmentsCounter = useRef(0);
  const animatedValue = useRef(new Reanimated.Value(initialIndex));
  const changeIndex = useCallback(_.throttle(() => {
    onChangeIndex?.(indexRef.current);
  }, 400, {
    trailing: true,
    leading: false
  }), []);
  const onSegmentPress = useCallback(index => {
    if (selectedSegment !== index) {
      setSelectedSegment(index);
      indexRef.current = index;
      Reanimated.timing(animatedValue.current, {
        toValue: index,
        duration: 300,
        easing: Easing.bezier(0.33, 1, 0.68, 1)
      }).start(changeIndex);
    }
  }, [onChangeIndex, selectedSegment]);
  const onLayout = useCallback((index, event) => {
    const {
      x,
      width,
      height
    } = event.nativeEvent.layout;
    segmentsStyle.current[index] = {
      x,
      width
    };
    segmentedControlHeight.current = height - 2 * BORDER_WIDTH;
    segmentsCounter.current++;
    return segmentsCounter.current === segments?.length && setSelectedSegment(initialIndex);
  }, [initialIndex, segments?.length]);
  const animatedStyle = useMemo(() => {
    if (segmentsCounter.current === segments?.length) {
      const inset = interpolate(animatedValue.current, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segmentsStyle.current, segment => segment.x)
      });
      const width = interpolate(animatedValue.current, {
        inputRange: _.times(segmentsCounter.current),
        outputRange: _.map(segmentsStyle.current, segment => segment.width - 2 * BORDER_WIDTH)
      });
      return [{
        width
      }, Constants.isRTL ? {
        right: inset
      } : {
        left: inset
      }];
    }

    return undefined;
  }, [segmentsCounter.current, segments?.length]);

  const renderSegments = () => _.map(segments, (_value, index) => {
    return <Segment key={index} onLayout={onLayout} index={index} onPress={onSegmentPress} isSelected={selectedSegment === index} activeColor={activeColor} inactiveColor={inactiveColor} {...segments?.[index]} testID={testID} />;
  });

  return <View style={containerStyle} testID={testID}>
      <View row center style={[styles.container, style, {
      borderRadius,
      backgroundColor
    }]}>
        {animatedStyle && <Reanimated.View style={[styles.selectedSegment, animatedStyle, {
        borderColor: outlineColor,
        borderRadius,
        backgroundColor: activeBackgroundColor,
        borderWidth: outlineWidth,
        height: segmentedControlHeight.current
      }]} />}
        {renderSegments()}
      </View>
    </View>;
};

SegmentedControl.propTypes = {
  /**
     * Array on segments.
     */
  segments: _pt.array,

  /**
     * The color of the active segment label.
     */
  activeColor: _pt.string,

  /**
     * The color of the inactive segments (label).
     */
  inactiveColor: _pt.string,

  /**
     * Callback for when index has change.
     */
  onChangeIndex: _pt.func,

  /**
     * Initial index to be active.
     */
  initialIndex: _pt.number,

  /**
     * The segmentedControl borderRadius
     */
  borderRadius: _pt.number,

  /**
     * The background color of the inactive segments
     */
  backgroundColor: _pt.string,

  /**
     * The background color of the active segment
     */
  activeBackgroundColor: _pt.string,

  /**
     * The color of the active segment outline
     */
  outlineColor: _pt.string,

  /**
     * The width of the active segment outline
     */
  outlineWidth: _pt.number,

  /**
     * Should the icon be on right of the label
     */
  iconOnRight: _pt.bool,
  testID: _pt.string
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey80,
    borderColor: Colors.grey60,
    borderWidth: BORDER_WIDTH
  },
  selectedSegment: {
    position: 'absolute'
  },
  segment: {
    paddingHorizontal: Spacings.s3
  }
});
SegmentedControl.displayName = 'SegmentedControl';
export default asBaseComponent(SegmentedControl);