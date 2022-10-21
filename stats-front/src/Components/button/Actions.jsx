import * as React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import ActionsIconButton from './ActionsIconButton'
import EditMenuItem from './EditMenuItem'
import DeleteMenuItem from './DeleteMenuItem'
import useMenu from '../hooks/useMenu'

const Actions = (props: any) => {
  console.log(props)
  const { id, children, editProps, deleteProps, ActionsProps = {}, onOpen, onClose, itemsBefore = [], itemsAfter = [] } = props
  const [anchorEl, handleOnClick, handleOnClose] = useMenu(null, onOpen, onClose)
  const { className, ...rest } = ActionsProps
  console.log(anchorEl)
  return (
    <>
      <ActionsIconButton
        onClick={handleOnClick}
        {...rest}
        className={className}
      />
      <Menu
        id={`menu-${id}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
      >
        <div>
          {itemsBefore.map((itemProps: any) => {
            const { key, onClick, ...rest } = itemProps
            const handleOnClick = () => {
              handleOnClose()
              if (onClick) onClick()
            }
            return (
              <MenuItem key={key} onClick={handleOnClick} {...rest} />
            )
          })}
          {editProps && <EditMenuItem {...editProps} closeMenu={handleOnClose} />}
          {deleteProps && <DeleteMenuItem {...deleteProps} closeMenu={handleOnClose} />}
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              key: index,
              onClick: () => {
                handleOnClose()
                if (child.props.onClick) child.props.onClick()
              }
            })
          })}
        </div>
        {itemsAfter.map((itemProps: any) => {
          const { key, onClick, ...rest } = itemProps
          const handleOnClick = () => {
            handleOnClose()
            if (onClick) onClick()
          }
          return (
            <MenuItem key={key} onClick={handleOnClick} {...rest} />
          )
        })}
      </Menu>
    </>
  )
}

export const actionCellDefinition = (ActionsCellRenderer: any) => ({
  accessor: 'actions',
  Header: 'Actions',
  Cell: ActionsCellRenderer,
  spacing: 'none',
  align: 'center',
  width: 80
})

export default Actions
