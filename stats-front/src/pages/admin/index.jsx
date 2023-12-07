import { Link, Route, Routes } from 'react-router-dom'
import { forwardRef } from 'react'
import PiloteLeagues from './pilotes'
import Calendar from './calendar'
import Results from './results'
import Library from './library'
import { Button, Grid, Paper } from '@material-ui/core'
import { Stack } from '@mui/material'

const navItems = [
  { path: 'pilotes-league/*', to: 'pilotes-league', title: 'Pilotes de ligue', Element: PiloteLeagues },
  { path: 'results-league/*', to: 'results-league', title: 'Résultats de leagues', Element: Results },
  { path: 'calendar-league/*', to: 'calendar-league', title: 'Calendrier', Element: Calendar },
  { path: 'circuit/*', to: 'circuit', title: 'Circuit', Element: Circuit },
  { path: 'library-league/*', to: 'library-league', title: 'Bibliothèque', Element: Library },
  // { path: 'attribution/*', to: 'attribution', title: 'Attributions', Element: AttributionPage }
]

const Admin = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      {navItems.map(navItem => {
        const { to, Element, path } = navItem
        return (
          <Route key={to} path={path} element={<Element />} />
        )
      })}
    </Routes>
  )
}

const buttons = navItems.map(x => {
  const LinkTo = forwardRef((props, ref) => <Link {...props} ref={ref} to={x.to} />)
  return { id: x.path, component: LinkTo, title: x.title }
})

const HomePage = () => {
  return (
    <Paper
      style={{ 
        marginLeft: '100px',
        marginRight: '100px',
        marginTop: '10px',
        marginBottom: '10px',
        height: '2000px'
      }} 
    > 
      <Stack spacing={4} direction='row'>
        {
          buttons.map(button => {
            console.log(button)
            return (
                 <Grid item key={button.id}>
                  <Button
                    {...button}
                    color='primary'
                    useIcon
                    iconPosition='left'
                    variant='text'
                    style={{ border: "solid 1px" }}
                  >{button.title}</Button>
                </Grid>
            ) 
          })
        }
      </Stack>
    </Paper>
  )
}

export default Admin
