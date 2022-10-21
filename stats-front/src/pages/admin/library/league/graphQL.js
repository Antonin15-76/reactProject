import { gql } from "graphql-tag"

export const createLeague = gql`mutation createLeague($input: CreateLeagueInput!){
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

export const updateLeague = gql`mutation updateLeague($input: UpdateLeagueInput!){
    updateLeague(input: $input) {
        id
    }
}`

export const league = gql`query league($id: ObjID!) {
    league(id: $id) {
        id
        name
    }
}`

export const deleteLeague = gql`mutation deleteLeague($id: ObjID!) {
    deleteLeague(id: $id) {
        id
    }
}`