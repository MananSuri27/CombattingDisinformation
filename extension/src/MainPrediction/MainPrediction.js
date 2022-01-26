import './mainPred.css';
import { Button, Grid, Paper } from '@mui/material';

export const MainPrediction = ({bias, fact, pred}) => {
    return (
        <Grid item container justifyContent={'center'}>
        <Paper elevation={2} className="predictionContainer">
        </Paper>
    </Grid>

    )
}