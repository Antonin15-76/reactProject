import { Stack, TextField } from "@material-ui/core"
import bcrypt from 'bcryptjs'
import { useMemo } from "react"

const salt = bcrypt.genSaltSync(10)

const LoginField = (props) => {
  const { username, disabled, password, setPasswordHash } = props
  console.log(bcrypt)
  const hashedPassword = bcrypt.hashSync(password?.value, salt)
  console.log(hashedPassword)
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id='pseudo'
        name='pseudo'
        label='pseudo'
        onChange={username.onChange}
        defaultValue={username.value}
        disabled={disabled}
        fullWidth
      />
      <TextField
        id='password'
        name='password'
        type='password'
        label='password'
        defaultValue={password.value}
        onChange={() => {
          setPasswordHash(hashedPassword)
        }}
        disabled={disabled}
        fullWidth
      />
    </Stack>
  )
}

export default LoginField
