import { CircularProgress, Dialog, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useState } from "react"
import useFetch from 'use-http'
import useInput from "../../../Components/hooks/useInput"
import useSnackbar from "../../../Components/hooks/useSnackbar"

const useStyles = makeStyles((theme) => ({
    forgotpasswordLink: {
      fontSize: '14px',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    background: {
    //   backgroundImage: `url(${BasGauche}), url(${Haut}), url(${HautGaucheMilieu}), url(${HautGauche}), url(${Droite})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left bottom, 200px top, left top, left top, right 40px'
    }
  }))

const LogIn = () => {
    return <FormLogin />
}

const FormLogin = () => {
    console.log('fhshgd')
    const { post, response, loading, error } = useFetch(`http://localhost:3001//login`, { cachePolicy: 'cache-and-network' })
    const username = useInput('')
    const password = useInput('')
    const classes = useStyles()
    const snackbar = useSnackbar()
    // const needToChangePasswordDialog = useState(false)
  
    // const navigate = useNavigate()
    const handleOnSubmit = async () => {
      await post({
        username: username.value,
        password: password.value
      })
      if (response.ok) {
        snackbar.showSuccess('Connexion réussie')
      } else {
        switch (response.data.code) {
          case 'PASSWORD_NEED_TO_CHANGE': {
            snackbar.showError('Le mot de passe doit être créé')
            // dialog.onClose()
            // needToChangePasswordDialog.onClick()
            break
          }
          default: {
            break
          }
        }
      }
    }
  
    const forgotPasswordDialog = useState(false)
  
    const openForgotPasswordDialog = () => {
      dialog.onClose()
      forgotPasswordDialog.onClick()
    }
  
    const dialog = useState(true)
    return (
      <>
        <Dialog
          open={true}
          titleProps={{ disableTypography: true }}
          haveButton={false}
          maxWidth='xs'
          title={(
            <>
              <Typography align='center' textTransform='uppercase' variant='h6' style={{ fontWeight: 600 }}>Bienvenue sur Escient Phénix</Typography>
            </>
        )}
        >
          <form onSubmit={handleOnSubmit} gridProps={{ alignItems: 'center', justifyContent: 'center' }} boxProps={{ height: 'auto' }}>
            <Grid item xs={12}>
              {/* <LoginField onChange={handleOnChangeUsername} fullWidth disabled={loading} required /> */}
            </Grid>
            <Grid item xs={12}>
              {/* <PasswordField onChange={handleOnChangePassword} fullWidth disabled={loading} required /> */}
              <Typography color='primary' align='center' className={classes.forgotpasswordLink} onClick={openForgotPasswordDialog}>Mot de passe oublié</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              {/* {!loading && <ValidateButton title='Connexion' />} */}
              {loading && <CircularProgress sizePreset='md' />}
            </Grid>
            {error && (
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Error response={response} />
              </Grid>
            )}
          </form>
        </Dialog>
        {/* <ForgotPasswordDialog forgotPasswordDialog={forgotPasswordDialog} usernameValue={username} />
        <NeedToChangePasswordDialog needToChangePasswordDialog={needToChangePasswordDialog} username={username} /> */}
  
      </>
    )
  }

  const Error = (props) => {
    const { response } = props
    let text = ''
    switch (response.data.code) {
      case 'UNAUTHENTICATED': { text = 'Utilisateur / mot de passe incorrects.'; break }
      case 'BAD_USER_INPUT': { text = 'Utilisateur / mot de passe incorrects.'; break }
      default: { text = 'Une erreur est survenue.'; break }
    }
    return 'error'
    // return <ErrorText text={text} />
  }

  export default LogIn
