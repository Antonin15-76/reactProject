import { useMutation } from '@apollo/client'
import { CircularProgress, Dialog } from '@material-ui/core'
import { getGraphQLError } from '../../utils/getGraphQLError'
import DeleteButton from '../button/DeleteButton'
import { Stack } from '@mui/material'
import SnackbarComponent from '../snackBar/Snackbar'

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
      <SnackbarComponent message={"success"} />
      if (refetch) refetch()
      onClose()
    },
    onError (error) {
      const texts = [errorText]
      texts.push(getGraphQLError(error))
      return <SnackbarComponent message={texts} />
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
        {mutateRes.loading && <CircularProgress size={5} />}
      </Stack>
    </Dialog>
  )
}

export default DeleteGraphQLDialog
