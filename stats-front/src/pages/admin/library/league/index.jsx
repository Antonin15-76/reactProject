import React from 'react'
import { useQuery } from "@apollo/client"
import List from "./List"
import Menu from "./Menu"
import { leagues } from './graphQL'

const League = () => {
    const { data, loading, error } = useQuery(leagues)

    return (
        <>
            <Menu />
            <List data={data} error={error} loading={loading} />
        </>
        
    )
}

export default League
