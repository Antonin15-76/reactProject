import React from 'react'
import { Button, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { Pencil, Delete } from 'mdi-material-ui'
import { deleteLeague, league, updateLeague } from './graphQL'
import Form from './Form'
import { constructVariables } from './constants'
import DeleteGraphQLDialog from '../../../../Components/dialog/DeleteGraphQLDialog'
import EditGraphQLDialog from '../../../../Components/dialog/EditGraphQLDialog'
import useDialog from '../../../../Components/hooks/useDialog'

const ActionsCell = (props) => {
  const { row } = props
  const editDialog = useDialog(false)
  const deleteDialog = useDialog(false)

  return (
    <>
      <Button>
        <MenuItem onClick={editDialog.handleOnClick}>
          <ListItemIcon><Pencil color='primary' /></ListItemIcon>
          <ListItemText
            primary='Modifier'
          />
        </MenuItem>
        <MenuItem color='error' onClick={deleteDialog.handleOnClick}>
          <ListItemIcon><Delete color='error' /></ListItemIcon>
          <ListItemText primary='Supprimer' />
        </MenuItem>
      </Button>
      <DeleteGraphQLDialog
        open={deleteDialog.open}
        onClose={deleteDialog.handleOnClose}
        mutation={deleteLeague}
        mutationCacheKey='accountingCodesVATs'
        errorText='Suppression code comptable avec taux de TVA échouée.'
        successText='Suppression code comptable avec taux de TVA réussie.'
        title='Supprimer un code comptable avec taux de TVA'
        elementId={row.id}
      >
        {/* <DeleteText secondaryText={{ text: 'le code comptable avec taux de TVA' }} valueText={[{ text: `${row?.vat?.rate}%` }]} /> */}
      </DeleteGraphQLDialog>
      <EditGraphQLDialog
        open={editDialog.open}
        onClose={editDialog.handleOnClose}
        mutation={updateLeague}
        errorText='Mise à jour code comptable avec taux de TVA échouée.'
        successText='Mise à jour code comptable avec taux de TVA réussie.'
        title='Mettre à jour un code comptable avec taux de TVA'
        elementId={row.id}
        query={league}
        queryKey='accountingCodeVAT'
        Form={Form}
        constructVariables={constructVariables}
      />
    </>
  )
}

export default ActionsCell
