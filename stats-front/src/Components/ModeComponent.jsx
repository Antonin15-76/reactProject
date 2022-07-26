import { Button } from '@material-ui/core'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ModeComponent = (props) => {
    const { value, setMode } = props
    const navigate = useNavigate()

    const handleOnClick = () => {
        setMode(!value)
        navigate('/')
    }

    return (
        <Button onClick={handleOnClick}>{value ? 'Carrière' : 'Ligue'}</Button>
    )
}

export default ModeComponent