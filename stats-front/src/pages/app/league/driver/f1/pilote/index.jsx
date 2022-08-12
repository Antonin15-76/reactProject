import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Stack, Typography } from "@material-ui/core"
import { height } from "@material-ui/system"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const Pilotes = () => {
    return (
        <Paper
            style={{ 
                marginLeft: '100px',
                marginRight: '100px',
                marginTop: '10px',
                marginBottom: '10px',
                height: '2000px'
            }} 
        >
            <Typography variant="h2" component="div" style={{ textAlign: 'center' }}>Line up</Typography>
                <Divider variant="middle"  style={{ margin: '50px' }}/>
                <Carousel showArrows={true} width='100%' style={{ display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' }}>
                    <div style={{
    
    padding: '100px'
}}>
                        <Stack direction="row" spacing={16} >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Stack>
                        <p className="legend">Ferrari</p>
                    </div>
                    <div style={{height: '200px'}}>
                        test 2
                    </div>
                </Carousel>
         </Paper>
    )
}

export default Pilotes
