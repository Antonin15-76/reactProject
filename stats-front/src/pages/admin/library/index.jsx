import { Link, Route, Routes } from 'react-router-dom'
import { forwardRef } from 'react'
import League from './league'
import Points from './points'
import Team from './team'
import { Button, Grid, Paper, Stack } from '@material-ui/core'

const navItems = [
  { path: 'leagues-league/*', to: 'leagues-league', title: 'Ligues', Element: League },
  { path: 'points-league/*', to: 'points-league', title: 'Système de Points', Element: Points },
  { path: 'calendar-league/*', to: 'calendar-league', title: 'Ecuries', Element: Team }
  // { path: 'attribution/*', to: 'attribution', title: 'Attributions', Element: AttributionPage }
]

const Libraries = () => {
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

export default Libraries
