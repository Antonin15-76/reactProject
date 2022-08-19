import * as React from 'react'
import Pencil from 'mdi-material-ui/Pencil'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

const EditMenuItem: React.FC<any> = props => {
  const { onClick, text = 'Modifier', icon = Pencil, iconProps = {}, closeMenu, ...rest } = props
  const handleOnClick = () => {
    closeMenu()
    onClick()
  }
  const Icon = icon
  return (
    <MenuItem onClick={handleOnClick} {...rest}>
      {Icon && <ListItemIcon><Icon {...iconProps} /></ListItemIcon>}
      <ListItemText primary={text} />
    </MenuItem>
  )
}

export default EditMenuItem
