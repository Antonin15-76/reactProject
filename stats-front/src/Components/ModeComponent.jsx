import { Button } from '@material-ui/core'
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ModeComponent = (props) => {
    const { value, setMode } = props
    const navigate = useNavigate()

    const handleOnClick = () => {
        setMode(!value || value === 'league' ? 'career' : 'league')
        navigate('/')
    }

    return (
        <Button onClick={handleOnClick}>{value ? 'Carrière' : 'Ligue'}</Button>      
    )
}

export default ModeComponent