import { Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { Card, Grid, TextField, Typography } from "@material-ui/core"

const PaperAccueil = (props) => {
    const { marginBottom, marginLeft, marginRight, marginTop, height, children } = props
    console.log(props)

    return (
        <Paper
            style={{ 
                marginLeft: `${marginLeft}px`, 
                marginRight: `${marginRight}px`, 
                marginTop: `${marginTop}px`, 
                marginBottom: `${marginBottom}px`, 
                height: `${height}px` 
            }} 
        >
            <Typography variant="h2" component="div" style={{ textAlign: 'center' }}>Ligue</Typography>
            <Divider variant="middle"  style={{ margin: '50px' }}/>
            <Grid container spacing={3} style={{ padding: '20px' }}>
                <Grid item xs={6}>
                    <Card>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Dernier Résultat 
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ligue</TableCell>
                                    <TableCell align="right">Vainqueur</TableCell>
                                    <TableCell align="right">Second</TableCell>
                                    <TableCell align="right">Troisième</TableCell>
                                    <TableCell align="right">Meilleur Tour</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    {/* {rows.map((row) => ( */}
                                        <TableRow
                                        key='key'
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row"> 
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                {/* ))} */}
                            </TableBody>
                        </Table>

                    </Card>
                </Grid>
                <Grid item xs={6}>
                <Card>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Mon Dernier Résultat
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ligue</TableCell>
                                    <TableCell align="right">Position Course</TableCell>
                                    <TableCell align="right">Position Qualification</TableCell>
                                    <TableCell align="right">Meilleure Temps Qualif</TableCell>
                                    <TableCell align="right">Meilleur Temps Course</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    {/* {rows.map((row) => ( */}
                                        <TableRow
                                        key='key'
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row"> 
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                {/* ))} */}
                            </TableBody>
                        </Table>

                    </Card>
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
        </Paper>
    )
}

export default PaperAccueil
