import { Card, Grid, TextField, Typography } from "@material-ui/core"
import PaperBook from "../../../../StoryBook/Paper"

const LeagueHome = () => {

    return (
        <PaperBook 
            marginLeft={100}
            marginRight={100}
            marginTop={10}
            marginBottom={10}
            height={2000}
            children={<Children />}
         ><TextField /></PaperBook>
    )
}

const Children = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Card>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Dernier Résultat
                    </Typography>
                </Card>
            </Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={5}>

            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
    )
}
export default LeagueHome
