import { useMutation } from '@apollo/client'
import { CircularProgress, Dialog, Stack } from '@material-ui/core'
import { getGraphQLError } from '../../utils/getGraphQLError'
import DeleteButton from '../button/DeleteButton'
import useSnackbar from '../hooks/useSnackbar'

const DeleteGraphQLDialog = (props) => {
  const {
    open,
    onClose,
    mutation,
    mutationCacheKey,
    id = '',
    errorText = 'Suppression échouée.',
    successText = 'Suppression réussie.',
    title = 'Supprimer',
    children,
    elementId,
    refetch,
    externalVariables = {},
    update
  } = props
  const snackbar = useSnackbar()
  const updateFunction = update || ((cache) => {
    cache.modify({
      fields: {
        [mutationCacheKey]: (existingRefs = [], { DELETE }) => {
          return DELETE
        }
      }
    })
  })

  const [mutate, mutateRes] = useMutation(mutation, {
    variables: { id: elementId, ...externalVariables },
    onCompleted () {
      snackbar.showSuccess(successText)
      if (refetch) refetch()
      onClose()
    },
    onError (error) {
      const texts = [errorText]
      texts.push(getGraphQLError(error))
      snackbar.showError(texts.join('\n'))
    },
    update: updateFunction
  })

  const handleOnClick = () => {
    mutate()
  }

  return (
    <Dialog
      id={id}
      type='Delete'
      title={title}
      open={open}
      onClose={onClose}
      haveButton={false}
    >
      <Stack spacing={2} align='center'>
        <div>
          {children}
        </div>
        {!mutateRes.loading && <DeleteButton onClick={handleOnClick} />}
        {mutateRes.loading && <CircularProgress sizePreset='md' />}
      </Stack>
    </Dialog>
  )
}

export default DeleteGraphQLDialog
