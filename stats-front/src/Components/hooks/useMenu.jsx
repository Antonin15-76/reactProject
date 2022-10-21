import { useState } from 'react'

const getTrueTarget = (target: any): any => {
  if (target instanceof HTMLElement) return target; // eslint-disable-line
  return getTrueTarget(target.parentNode)
}

/**
 * Hook utilitaire pour les Menus
 *
 */
export const useMenu = (initialValue: any = null, controlFocusOpen?: any, onOpen?: any, onClose?: any) => {
  const [anchor, setAnchor] = useState(initialValue)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  const handleOnOpen = (e?: any): void => {
    if (controlFocusOpen) {
      if (hasBeenClosed) setHasBeenClosed(false)
      else {
        const target = getTrueTarget(e.target)
        setAnchor(target)
        if (onOpen) onOpen()
      }
    } else {
      const target = getTrueTarget(e.target)
      setAnchor(target)
      if (onOpen) onOpen()
    }
  }

  const handleOnClose = (param?: any): void => {
    setAnchor(null)
    if (controlFocusOpen) {
      setAnchor(null)
      if (onClose) onClose(param)
    }
  }

  return [anchor, handleOnOpen, handleOnClose]
}

export default useMenu
