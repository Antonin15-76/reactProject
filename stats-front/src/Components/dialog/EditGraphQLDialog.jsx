import { useMutation, useQuery } from '@apollo/client'
import useSnackbar from '../hooks/useSnackbar'
import { useMemo } from 'react'
import { CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, Stack, Tooltip } from '@material-ui/core'
import ValidateButton from '../button/ValidateButton'
import CancelButton from '../button/CancelButton'
import { getGraphQLError } from '../../utils/getGraphQLError'
import ErrorText from '../ErrorText'
const EditGraphQLDialog = (props) => {
  const {
    open,
    onClose,
    mutation,
    id = '',
    errorText = 'Mise à jour échouée.',
    successText = 'Mise à jour réussie.',
    title = 'Mettre à jour',
    elementId,
    otherVariables,
    constructVariables,
    maxWidth,
    query,
    Form,
    queryKey,
    full,
    variables,
    callbackSuccess,
    ...rest
  } = props
  const snackbar = useSnackbar()
  const [mutate, { loading: loadingMutation }] = useMutation(mutation, {
    variables: { id: elementId },
    onCompleted (res) {
      snackbar.showSuccess(successText)
      if (callbackSuccess) {
        callbackSuccess(res)
      }
      onClose()
    },
    onError (error) {
      const texts = [errorText]
      texts.push(getGraphQLError(error))
      snackbar.showError(texts.join('\n'))
    }
  })

  const handleOnSubmit = (values) => {
    mutate({ variables: constructVariables(values, otherVariables) })
  }

  const skip = useMemo(() => !open || !elementId, [open, elementId])

  const { loading, error, data } = useQuery(query, { skip, variables: { id: elementId, ...variables } })

  return (
    <Dialog
      id={id}
      type='Edit'
      title={title}
      open={open}
      onClose={onClose}
      haveButton={false}
      maxWidth={maxWidth}
      full={full}
    >
      <FormQuery
        queryKey={queryKey}
        open={open}
        loading={loading}
        error={error}
        data={data}
        formId={`${id}-edit-form`}
        onSubmit={handleOnSubmit}
        Form={Form}
        loadingMutation={loadingMutation}
        {...rest}
      />
    </Dialog>
  )
}

const FormQuery = (props) => {
  const { formId, queryKey, Form, loadingMutation, open, loading, error, data, externalVariables, ...rest } = props
  if (!open) return null

  if (loading) return <div style={{ textAlign: 'center' }}><CircularProgress sizePreset='lg' /></div>
  if (error) return <div style={{ textAlign: 'center' }}><ErrorText /></div>

  return (
    <Stack spacing={2} align='center'>
      <Form formId={formId} {...externalVariables} defaultValues={data[queryKey]} {...rest} isEdit />
      {!loadingMutation && <ValidateButton form={formId} />}
      {loadingMutation && <CircularProgress sizePreset='md' />}
    </Stack>
  )
}

export default EditGraphQLDialog
