import { Paper } from "@material-ui/core"

const PaperBook = (props) => {
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
        />
    )
}

export default PaperBook
