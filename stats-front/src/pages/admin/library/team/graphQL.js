import { gql } from "graphql-tag"

export const createLeague = gql`mutation createLeague($input: CreateLeagueInput){
    createLeague(input: $input) {
        id
    }
}`

export const leagues = gql`query leagues($input: LeagueArgumentInput){
    leagues(input: $input) {
        id
        name
    }
}`
