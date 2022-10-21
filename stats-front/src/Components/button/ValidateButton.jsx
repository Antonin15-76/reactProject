import { Button, Grid } from "@material-ui/core"

const ValidateButton = (props) => {
    const { id, title, onClick } = props
    return (
        <Grid item xs={12}>
            <Button type='submit' id={id} title={title} {...props}>{title}</Button>
        </Grid>
    )
}
export default ValidateButton
