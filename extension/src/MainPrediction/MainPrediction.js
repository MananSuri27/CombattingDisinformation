import './mainPred.css';
import { Button, Grid, Paper } from '@mui/material';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';


export const MainPrediction = ({ bias, fact, pred }) => {
    const circleColour = "green";
	return (
		<Grid item container justifyContent={'center'}>
			<Paper elevation={2} className="predictionContainer">
            <Grid container xs={12} alignItems={"center"} justifyContent={"center"}>
					<Grid container item xs={6} style={{ padding: '3em' }}>
                        <div>
						<CircularProgressbarWithChildren
							value={pred}
							strokeWidth={5}
							styles={buildStyles({
								textColor: 'black',
								pathColor: circleColour
							})}
						>
							<div style={{ fontSize: '29px', lineHeight: '22px' }}>{pred}%</div>
							<div style={{ fontSize: '10px', fontWeight: '500' }}>RELIABILITY</div>
						</CircularProgressbarWithChildren>
                        </div>
					</Grid>
                    <Grid container item xs={6} justifyContent={"center"} style={{padding: "20px"}}>
						<Grid item container xs={12} justifyContent={"center"}>
                            <h1 className='mediaHeading'>Media bias</h1>
                        </Grid>
					</Grid>
                </Grid>
			</Paper>
		</Grid>
	);
};
