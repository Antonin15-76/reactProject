import { useState } from 'react'
/**
 * Hook utilitaire pour les boites de dialog
 * @param initialValue {boolean} ""
 */

type Options = {
  callbackOnClick?: (param?: any) => void;
  callbackOnClose?: (param?: any) => void;
  controlFocusOpen?: true | false | undefined;
};

export const useDialog = (initialValue: boolean = false, options?: Options) => {
  const [isOpen, setIsOpen] = useState(initialValue)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)
  const { callbackOnClick = {}, callbackOnClose = {}, controlFocusOpen = false } = options || {}
  const handleOnOpen = (param?: any): void => {
    if (controlFocusOpen) {
      if (hasBeenClosed) setHasBeenClosed(false)
      else setIsOpen(true)
    } else {
      setIsOpen(true)
    }
    // if (callbackOnClick) callbackOnClick(param)
  }
  const handleOnClose = (param?: any): void => {
    setIsOpen(false)
    if (controlFocusOpen) {
      setHasBeenClosed(true)
    }
    // if (callbackOnClose) callbackOnClose(param)
  }
  return { open: isOpen, handleOnClick: handleOnOpen, handleOnClose, onClick: handleOnOpen, onClose: handleOnClose }
}

export default useDialog
