import React from 'react'
import { useMutation } from '@apollo/client'
import { CircularProgress, Dialog, DialogActions, DialogTitle, IconButton } from '@material-ui/core'
import { getGraphQLError } from '../../utils/getGraphQLError'
import ValidateButton from '../button/ValidateButton'
import CancelButton from '../button/CancelButton'
import useDialog from '../hooks/useDialog'
import { Plus } from 'mdi-material-ui'
import { Stack } from '@mui/material'
import SnackbarComponent from '../snackBar/Snackbar'

const defaultColors = ['inherit', 'primary', 'secondary', 'default']

const AddComponentGraphQLDialog = (props) => {
  const {
    isLoading,
    error,
    dialog: parentDialog,
    mutation,
    mutationCacheKey,
    mutationName,
    mutationResFragment,
    externalVariables,
    // color = 'red',
    size = 'small',
    Form,
    id = '',
    errorText = 'Action échouée.',
    // successText = 'Action réussie.',
    title = '',
    constructVariables,
    otherConstructVariablesValues = {},
    externalValues = {},
    update,
    // haveButton = false,
    useAddButton = true,
    buttonTitle = 'Ajouter',
    ...rest
  } = props
  const uncontrolledDialog = useDialog(false)
  const dialog = parentDialog || uncontrolledDialog

  const updateFunction = update || ((cache, { data }) => {
    const mutationRes = data[mutationName]
    cache.modify({
      fields: {
        [mutationCacheKey]: (existing = []) => {
          const newRef = cache.writeFragment({
            data: mutationRes,
            fragment: mutationResFragment
          })
          return [...existing, newRef]
        }
      }
    })
  })
  const [mutate, mutateRes] = useMutation(mutation, {
    onCompleted () {
      <SnackbarComponent message={"success"} />
      dialog.handleOnClose()
    },
    onError (error) {
      const texts = [errorText]
      texts.push(getGraphQLError(error))
      return <SnackbarComponent message={texts} />
    },
    update: updateFunction
  })

  const handleOnSubmit = (values) => {
    mutate({ variables: constructVariables(values, otherConstructVariablesValues) })
  }
  return (
    <>
      <IconButton
        onClick={dialog.handleOnClick} 
        disabled={rest.disabled ?? false}
        size={size}
        color='primary' 
        title='Ajouter'
        {...rest}
      >
        <Plus fontSize='inherit' />
      </IconButton>
      <Dialog
        id={id}
        type='Add'
        title={title}
        open={dialog.open}
        onClose={dialog.handleOnClose}
        {...rest}
      >
        <DialogTitle id='draggable-dialog-title'>
          {title}
        </DialogTitle>
        <Stack spacing={2} align='center' style={{ padding: '15px' }}>
          <Form formId={`${id}-add-form`} onSubmit={handleOnSubmit} externalValues={{ isSubmitting: mutateRes.loading, ...externalValues }} {...externalVariables} />
          {!mutateRes.loading && <ValidateButton form={`${id}-add-form`} title='gk' />}
          {mutateRes.loading && <CircularProgress size={5} />}
        </Stack>
        <DialogActions>
            <Stack direction='rox' spacing={2}>
                {/* {hint} */}
            </Stack>
            <Stack direction='row' justify='flex-end' spacing={2}>
              <CancelButton onClick={dialog.onClose} title='Annuler'  />
              <ValidateButton form={`${id}-add-form`} title='Valider' />
            </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddComponentGraphQLDialog
