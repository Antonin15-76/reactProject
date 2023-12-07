import { Button, IconButton, Snackbar } from "@material-ui/core";
import { Close } from "mdi-material-ui";
import { Fragment } from "react";
import { useState } from "react";
import { useMemo } from "react"

const SnackbarComponent = ({message}) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  )

  return useMemo(() => {
    
    return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </div>
    )
  }, [open, message])
}

export default SnackbarComponent
