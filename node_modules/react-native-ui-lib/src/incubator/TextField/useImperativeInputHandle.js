import { useContext, useImperativeHandle, useRef } from 'react';
import FieldContext from "./FieldContext";

const useImperativeInputHandle = ref => {
  const inputRef = useRef();
  const context = useContext(FieldContext);
  useImperativeHandle(ref, () => {
    return {
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
      validate: () => {
        context.validateField();
      }
    };
  });
  return inputRef;
};

export default useImperativeInputHandle;