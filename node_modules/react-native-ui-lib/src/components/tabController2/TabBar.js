import _pt from "prop-types";
import React, { useMemo, useContext } from 'react';
import { StyleSheet, Platform } from 'react-native';
import Reanimated, { runOnJS, useAnimatedReaction, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import _ from 'lodash';
import TabBarContext from "./TabBarContext";
import TabBarItem from "./TabBarItem";
import { asBaseComponent, forwardRef } from "../../commons/new";
import View from "../view";
import { Colors, Spacings, Typography } from "../../style";
import { Constants } from "../../helpers";
import FadedScrollView from "./FadedScrollView";
import useScrollToItem from "./useScrollToItem";
const DEFAULT_HEIGHT = 48;
const DEFAULT_BACKGROUND_COLOR = Colors.white;
const DEFAULT_LABEL_STYLE = { ...Typography.text80M,
  letterSpacing: 0
};
const DEFAULT_SELECTED_LABEL_STYLE = { ...Typography.text80M,
  letterSpacing: 0
};

/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
const TabBar = props => {
  const {
    items: propsItems,
    height,
    enableShadow,
    shadowStyle: propsShadowStyle,
    indicatorStyle,
    labelStyle,
    selectedLabelStyle,
    labelColor,
    selectedLabelColor,
    uppercase,
    iconColor,
    selectedIconColor,
    activeBackgroundColor,
    backgroundColor,
    containerWidth: propsContainerWidth,
    centerSelected,
    spreadItems,
    indicatorInsets = Spacings.s4,
    containerStyle,
    testID
  } = props;
  const context = useContext(TabBarContext);
  const {
    items: contextItems,
    currentPage,
    targetPage,
    selectedIndex
  } = context;
  const containerWidth = useMemo(() => {
    return propsContainerWidth || Constants.screenWidth;
  }, [propsContainerWidth]);
  const items = useMemo(() => {
    return contextItems || propsItems;
  }, [contextItems, propsItems]);
  const {
    scrollViewRef: tabBar,
    onItemLayout,
    itemsWidthsAnimated,
    itemsOffsetsAnimated,
    // itemsWidths,
    // itemsOffsets,
    focusIndex,
    onContentSizeChange,
    onLayout
  } = useScrollToItem({
    itemsCount: items?.length || 0,
    selectedIndex,
    offsetType: centerSelected ? useScrollToItem.offsetType.CENTER : useScrollToItem.offsetType.DYNAMIC
  });
  useAnimatedReaction(() => {
    return Math.round(currentPage.value);
  }, (currIndex, prevIndex) => {
    if (currIndex !== prevIndex) {
      runOnJS(focusIndex)(currIndex);
    }
  });
  const tabBarItems = useMemo(() => {
    return _.map(items, (item, index) => {
      return <TabBarItem labelColor={labelColor} selectedLabelColor={selectedLabelColor} labelStyle={labelStyle} selectedLabelStyle={selectedLabelStyle} uppercase={uppercase} iconColor={iconColor} selectedIconColor={selectedIconColor} activeBackgroundColor={activeBackgroundColor} key={item.label} {...item} {...context} index={index} onLayout={onItemLayout} />;
    });
  }, [items, labelColor, selectedLabelColor, labelStyle, selectedLabelStyle, uppercase, iconColor, selectedIconColor, activeBackgroundColor, centerSelected, onItemLayout]);

  const _indicatorTransitionStyle = useAnimatedStyle(() => {
    const value = targetPage.value;
    const width = interpolate(value, itemsWidthsAnimated.value.map((_v, i) => i), itemsWidthsAnimated.value.map(v => v - 2 * indicatorInsets));
    const left = interpolate(value, itemsOffsetsAnimated.value.map((_v, i) => i), itemsOffsetsAnimated.value);
    return {
      marginHorizontal: indicatorInsets,
      width,
      left
    };
  });

  const shadowStyle = useMemo(() => {
    return enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
  }, [enableShadow, propsShadowStyle]);

  const _containerStyle = useMemo(() => {
    return [styles.container, shadowStyle, {
      width: containerWidth
    }, containerStyle];
  }, [shadowStyle, containerWidth, containerStyle]);

  const tabBarContainerStyle = useMemo(() => {
    return [styles.tabBar, spreadItems && styles.spreadItems, !_.isUndefined(height) && {
      height
    }, {
      backgroundColor
    }];
  }, [height, backgroundColor]);
  const scrollViewContainerStyle = useMemo(() => {
    return {
      minWidth: containerWidth
    };
  }, [containerWidth]);
  return <View style={_containerStyle}>
      <FadedScrollView // @ts-expect-error
    ref={tabBar} horizontal contentContainerStyle={scrollViewContainerStyle} scrollEnabled // TODO:
    testID={testID} onContentSizeChange={onContentSizeChange} onLayout={onLayout}>
        <View style={tabBarContainerStyle}>{tabBarItems}</View>
        <Reanimated.View style={[styles.selectedIndicator, indicatorStyle, _indicatorTransitionStyle]} />
      </FadedScrollView>
    </View>;
};

TabBar.propTypes = {
  /**
     * The list of tab bar items
     */
  items: _pt.array,

  /**
     * Tab Bar height
     */
  height: _pt.number,

  /**
     * Show Tab Bar bottom shadow
     */
  enableShadow: _pt.bool,

  /**
     * the default label color
     */
  labelColor: _pt.string,

  /**
     * the selected label color
     */
  selectedLabelColor: _pt.string,

  /**
     * whether to change the text to uppercase
     */
  uppercase: _pt.bool,

  /**
     * icon tint color
     */
  iconColor: _pt.string,

  /**
     * icon selected tint color
     */
  selectedIconColor: _pt.string,

  /**
     * TODO: rename to feedbackColor
     * Apply background color on press for TouchableOpacity
     */
  activeBackgroundColor: _pt.string,

  /**
     * The TabBar background Color
     */
  backgroundColor: _pt.string,

  /**
     * The TabBar container width
     */
  containerWidth: _pt.number,

  /**
     * Pass to center selected item
     */
  centerSelected: _pt.bool,

  /**
     * Whether the tabBar should be spread (default: true)
     */
  spreadItems: _pt.bool,

  /**
     * The indicator insets (default: Spacings.s4, set to 0 to make it wide as the item)
     */
  indicatorInsets: _pt.number,

  /**
     * Used as a testing identifier
     */
  testID: _pt.string,
  children: _pt.oneOfType([_pt.arrayOf(_pt.element), _pt.element])
};
TabBar.displayName = 'TabController.TabBar';
TabBar.defaultProps = {
  labelStyle: DEFAULT_LABEL_STYLE,
  selectedLabelStyle: DEFAULT_SELECTED_LABEL_STYLE,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  spreadItems: true
};
const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
  tabBar: {
    height: DEFAULT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabBarScrollContent: {
    minWidth: Constants.screenWidth
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 70,
    height: 2,
    backgroundColor: Colors.primary
  },
  containerShadow: { ...Platform.select({
      ios: {
        shadowColor: Colors.dark10,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
          height: 6,
          width: 0
        }
      },
      android: {
        elevation: 5,
        backgroundColor: Colors.white
      }
    })
  },
  spreadItems: {
    flex: 1
  }
});
export default asBaseComponent(forwardRef(TabBar));