import * as React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Delete from 'mdi-material-ui/Delete'

const DeleteMenuItem: React.FC<any> = props => {
  const { onClick, text = 'Supprimer', icon = Delete, iconProps = {}, closeMenu, ...rest } = props
  const handleOnClick = () => {
    closeMenu()
    onClick()
  }
  const Icon = icon
  return (
    <MenuItem onClick={handleOnClick} {...rest}>
      {Icon && <ListItemIcon><Icon {...iconProps} color='error' /></ListItemIcon>}
      <ListItemText primary={text} primaryTypographyProps={{ color: 'error' }} />
    </MenuItem>
  )
}

export default DeleteMenuItem
