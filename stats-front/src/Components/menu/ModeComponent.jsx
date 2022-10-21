import { Button } from '@material-ui/core'
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ModeComponent = (props) => {
    const { value, setMode } = props
    const navigate = useNavigate()
    // console.log(window.location.href)
    const handleOnClick = () => {
        setMode(!value || value === 'league' ? 'career' : 'league')
        navigate('home')
    }

    return (
        <Button onClick={handleOnClick}>{!value || value === 'league' ? 'CARRIERE' : 'LIGUE'}</Button>      
    )
}

export default ModeComponent