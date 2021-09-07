import _pt from "prop-types";
import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { asBaseComponent } from "../../commons/new";
import { Constants } from "../../helpers";
import View from "../../components/view";
import { PanViewDirections, PanViewDismissThreshold, getTranslation, getDismissVelocity, DEFAULT_THRESHOLD } from "./panningUtil";
export { PanViewDirections, PanViewDismissThreshold };
const SPRING_BACK_ANIMATION_CONFIG = {
  velocity: 300,
  damping: 20,
  stiffness: 300,
  mass: 0.8
};

const PanView = props => {
  const {
    directions = [PanViewDirections.UP, PanViewDirections.DOWN, PanViewDirections.LEFT, PanViewDirections.RIGHT],
    dismissible,
    springBack,
    onDismiss,
    directionLock,
    threshold,
    containerStyle,
    children,
    ...others
  } = props;
  const waitingForDismiss = useSharedValue(false);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: translationX.value
      }, {
        translateY: translationY.value
      }]
    };
  }, []);

  const getTranslationOptions = () => {
    'worklet';

    return {
      directionLock,
      currentTranslation: {
        x: translationX.value,
        y: translationY.value
      }
    };
  };

  const setTranslation = (event, initialTranslation) => {
    'worklet';

    const result = getTranslation(event, initialTranslation, directions, getTranslationOptions());
    translationX.value = result.x;
    translationY.value = result.y;
  };

  const dismiss = useCallback(isFinished => {
    'worklet';

    if (isFinished && waitingForDismiss.value && onDismiss) {
      waitingForDismiss.value = false;
      runOnJS(onDismiss)();
    }
  }, [onDismiss]);
  const shouldDismissX = useCallback(isFinished => {
    'worklet';

    dismiss(isFinished);
  }, [dismiss]);
  const shouldDismissY = useCallback(isFinished => {
    'worklet';

    dismiss(isFinished);
  }, [dismiss]);
  const springBackIfNeeded = useCallback(() => {
    'worklet';

    if (springBack) {
      translationX.value = withSpring(0, SPRING_BACK_ANIMATION_CONFIG);
      translationY.value = withSpring(0, SPRING_BACK_ANIMATION_CONFIG);
    }
  }, [springBack]);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.initialTranslation = {
        x: translationX.value,
        y: translationY.value
      };
    },
    onActive: (event, context) => {
      setTranslation(event, context.initialTranslation);
    },
    onEnd: event => {
      if (dismissible) {
        const velocity = getDismissVelocity(event, directions, getTranslationOptions(), threshold);

        if (velocity) {
          waitingForDismiss.value = true;

          if (velocity.x !== 0) {
            const toX = Math.sign(translationX.value) * (Math.abs(translationX.value) + Constants.screenWidth);
            translationX.value = withSpring(toX, {
              velocity: velocity.x,
              damping: 50
            }, shouldDismissX);
          }

          if (velocity.y !== 0) {
            const toY = Math.sign(translationY.value) * (Math.abs(translationY.value) + Constants.screenHeight);
            translationY.value = withSpring(toY, {
              velocity: velocity.y,
              damping: 50
            }, shouldDismissY);
          }
        } else {
          springBackIfNeeded();
        }
      } else {
        springBackIfNeeded();
      }
    }
  }, [directions, dismissible, setTranslation, springBackIfNeeded]);
  return (// TODO: delete comments once completed
    // <View ref={containerRef} style={containerStyle} onLayout={onLayout}>
    <View style={containerStyle}>
      <PanGestureHandler onGestureEvent={isEmpty(directions) ? undefined : onGestureEvent}>
        <Animated.View // !visible.current && styles.hidden is done to fix a bug is iOS
        //   style={[style, animatedStyle, !visible.current && styles.hidden]}
        style={animatedStyle} //   style={[style]}
        >
          <View {...others}>{children}</View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

PanView.propTypes = {
  /**
     * The directions of the allowed pan (default is all)
     * Types: UP, DOWN, LEFT and RIGHT (using PanView.directions.###)
     */
  directions: _pt.array,

  /**
     * Dismiss the view if over the threshold (translation or velocity).
     */
  dismissible: _pt.bool,

  /**
     * Animate to start if not dismissed.
     */
  springBack: _pt.bool,

  /**
     * Callback to the dismiss animation end
     */
  onDismiss: _pt.func,

  /**
     * Should the direction of dragging be locked once a drag has started.
     */
  directionLock: _pt.bool,
  children: _pt.oneOfType([_pt.node, _pt.arrayOf(_pt.node)])
};
PanView.displayName = 'PanView';
PanView.directions = PanViewDirections;
PanView.defaultProps = {
  threshold: DEFAULT_THRESHOLD
};
export default asBaseComponent(PanView);