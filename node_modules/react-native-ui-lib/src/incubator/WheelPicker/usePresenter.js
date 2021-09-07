import React, { useRef } from 'react';
import _ from 'lodash';
import useMiddleIndex from "./helpers/useListMiddleIndex";

const usePresenter = ({
  initialValue,
  selectedValue,
  children,
  items: propItems,
  itemHeight,
  preferredNumVisibleRows
}) => {
  const value = !_.isUndefined(selectedValue) ? selectedValue : initialValue;

  const extractItemsFromChildren = () => {
    const items = React.Children.map(children, child => {
      const childAsType = {
        value: child?.props.value,
        label: child?.props.label
      };
      return childAsType;
    });
    return items || [];
  };

  const items = useRef(children ? extractItemsFromChildren() : propItems).current;
  const middleIndex = useMiddleIndex({
    itemHeight,
    listSize: items.length
  });

  const getSelectedValueIndex = () => {
    if (_.isString(value) || _.isNumber(value)) {
      return _.findIndex(items, {
        value
      });
    }

    return _.findIndex(items, {
      value: value?.value
    });
  };

  const shouldControlComponent = offset => {
    if (!_.isUndefined(selectedValue)) {
      return offset >= 0 && selectedValue !== getRowItemAtOffset(offset).value;
    }

    return false;
  };

  const getRowItemAtOffset = offset => {
    const index = middleIndex(offset);
    const value = items[index].value;
    return {
      index,
      value
    };
  };

  return {
    shouldControlComponent,
    index: getSelectedValueIndex(),
    items,
    height: itemHeight * preferredNumVisibleRows,
    getRowItemAtOffset
  };
};

export default usePresenter;