import { Grid, MenuItem, TextField } from "@material-ui/core"
import { useMemo, useState } from "react"
import countryList from 'react-select-country-list'
import Select from 'react-select'
import SelectNumber from "./SelectNumber"
import SelectLeague from "./SelectLeague"

const Form = () => {

  const [value, setValue] = useState('')
  const [number, setNumber] = useState('')
  const [league, setLeague] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  const handleChange = (event) => {
    setNumber(event.target.value)
  }

  const leagueHandleOnChange = (event) => {
    setLeague(event.target.value)
  }

    return (
        <form >
            <Grid container item spacing={2}>
                <Grid item xs={4}>
                    <TextField 
                      fullWidth
                      label='pseudo'
                      id='pseudo'
                      name='pseudo'
                    />
                </Grid>
                <Grid item xs={4}>
                  <Select options={options} value={value} onChange={changeHandler} />
                </Grid>
                <Grid item xs={4}>
                  <SelectLeague
                    id='league'
                    value={league}
                    onChange={leagueHandleOnChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <SelectNumber 
                    fullWidth
                    id='number'
                    value={number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                      fullWidth
                      label='t'
                      id='pseudo'
                      name='pseudo'
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                      fullWidth
                      label='pseudo'
                      id='pseudo'
                      name='pseudo'
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                      fullWidth
                      label='pseudo'
                      id='pseudo'
                      name='pseudo'
                    />
                </Grid>
            </Grid>
        </form>
    )
}

export default Form
