import { Button, Divider, Popover, Typography } from "@material-ui/core"
import { AccountCircle, AccountCircleOutline } from "mdi-material-ui"
import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "react-use"
import useFetch from 'use-http'
import ModeComponent from "./ModeComponent"
import { useGridColumnMenu } from "@material-ui/data-grid"
import { Stack } from "@mui/material"

const AccountComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <AccountCircleOutline
                sx={{
                    color: 'white',
                    width: '31px',
                    height: '31px',
                    cursor: 'pointer',
                    '&:hover': {
                        color: '#F2F4FE'
                    }
                }}
                title='Mon profil'
                onClick={handlePopoverOpen}
            />
            <Popover
                id='profil'
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
            >
                <PopoverContent />
            </Popover>
        </>
    )
}

const PopoverContent = (props) => {
    const { loading, error } = props
    const { get, response } = useFetch('http://localhost:3001/logout', { cachePolicy: 'cache-and-network' })
    const navigate = useNavigate()
    const [, setToken] = useLocalStorage('accessToken')
    const [mode, setMode] = useLocalStorage('mode')
    // const [ mode, setMode ] = useState(false)
    console.log(mode)
    const handleOnClickLogout = async () => {
        await get()
        if (response.ok) {
        //   snackbar.showError('Vous avez été déconnecté')
          setToken(null)
          navigate('/login')
        }
    }
    // if (loading) return <CircularProgress sizePreset='md' />
    // if (error) return <ErrorText />

    return (
        <>
            <Stack style={{ padding: '16px 24px' }} spacing={2} align='center'>
                <AccountCircle
                    sx={{
                        width: '55px',
                        height: '55px'
                    }}
                />
                <Stack align='center'>
                    <ModeComponent value={mode} setMode={setMode} />
                    {/* <StackHorizontal>
              <BoldTypography textTransform='uppercase'>&nbsp;</BoldTypography>
              <BoldTypography textTransform='firstletteruppercase'></BoldTypography>
            </StackHorizontal> */}
                    <Typography variant='subtitle2' color='textSecondary'></Typography>
                </Stack>
                <Button color='primary' title='Modifier mes informations' />
                <Divider flexItem sx={{ height: '1px', marginRight: '-24px', marginLeft: '-24px' }} />
                <Button color='error' onClick={handleOnClickLogout}>Déconnexion</Button>
            </Stack>
        </>
    )
}

export default AccountComponent
