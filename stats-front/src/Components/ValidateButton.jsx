import { Button, Grid } from "@material-ui/core"

const ValidateButton = (props) => {
    const { id, title } = props
    return (
        <Grid item xs={12}>
            <Button type="submit" id={id} title={title}>{title}</Button>
        </Grid>
    )
}
export default ValidateButton
