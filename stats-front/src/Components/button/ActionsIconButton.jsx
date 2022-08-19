// Generated with util/create-component.js
import React from 'react'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { IconButton, Tooltip } from '@material-ui/core'

const ActionsButton: React.FC<IconButtonProps> = (props) => {
  return (
    <Tooltip title='Actions'>
      <IconButton
        size='small'
        color='primary'
      >
        <DotsVertical />
      </IconButton>
    </Tooltip>
  )
}
export default ActionsButton
