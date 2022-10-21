import { Grid, MenuItem, TextField } from "@material-ui/core"
import { useMemo, useState } from "react"
import countryList from 'react-select-country-list'
import Select from 'react-select'
import useInput from '../../../../Components/hooks/useInput'
import useValidation from '../../../../Components/hooks/useValidation'
import Joi from '../../../../utils/customJoi'

const schema = Joi.object({
  name: Joi.string().required().label('nom')
})

const Form = (props) => {
  console.log(props)
  const { formId, onSubmit } = props
  const [ value, changeHandler ] = useInput('')
  console.log(value)
  const validation = useValidation(schema)

  const handleOnSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('erer')
    const values = {
      name: value
    }
    console.log(values)
    const errors = validation.validate(values)

    if (!errors) {
      onSubmit(values)
    }
  }

    return (
        <form id={formId} onSubmit={handleOnSubmit}>
            <Grid container item spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                      fullWidth
                      label='name'
                      id='name'
                      name='name'
                      // value={value}
                      defaultValue={value}
                      onChange={changeHandler}
                    />
                </Grid>
            </Grid>
        </form>
    )
}

export default Form
