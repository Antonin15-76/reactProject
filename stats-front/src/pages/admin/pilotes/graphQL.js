import { gql } from "graphql-tag"

export const leagueDrivers = gql`query leagueDrivers($input: LeagueDriverArgumentInput){
    leagueDrivers(input: $input) {
        id
        pseudo
        nationality
        number
        teamActual{ id name }
        actualLeague
        birthDate
    }
}`

export const createLeagueDriver = gql`mutation createLeagueDriver($input: CreateLeagueDriverInput){
    createLeagueDriver(input: $input) {
        id
    }
}`

export const allLeagueNumber = gql`query leagueNumbers {
    leagueNumbers{
        id
        number
    }
}`

export const allLeague = gql`query leagues {
    leagues{
        id
        name
    }
}`