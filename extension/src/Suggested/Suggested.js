import { Grid, Paper } from "@mui/material"
import "./suggested.css"

export const Suggested = ({title, link, image}) => {
    return (
        <Grid item container justifyContent={'center'}>
            <Paper elevation={2} className="suggestedContainer">
                <Grid item xs={12} className="suggTitle">
                    Suggested article
                </Grid>
                <div className="newsList">
                    <div className="newsItem">
                        <div className="newsTitle"><a className="newsLink" target={"_blank"} href={link}>{title}</a></div>
                        <img className="newsImg" src={image} loading="lazy"></img>
                    </div>
                </div>
            </Paper>
		</Grid>
    )
}