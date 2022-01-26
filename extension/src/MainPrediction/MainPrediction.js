import './mainPred.css';
import { Button, Grid, Paper } from '@mui/material';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from 'react';

export const MainPrediction = ({bias, fact, pred}) => {
	const [clicked, setClicked] = useState(false);
	const colors = ["#ff0000", "#ffb300", "green"];
	const circleColour = pred < 33 ? colors[0] : (pred < 66 ? colors[1] : colors[2]);
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
					{bias !== 0 && 
					<Grid container item xs={6} justifyContent={"center"} style={{padding: "20px"}}>
						<Grid item container xs={12} justifyContent={"center"}>
                            <h1 className='mediaHeading'>Media bias</h1>
                        </Grid>
						<Grid item container xs={12} justifyContent={"center"}>
                            <div className='bias'>{bias}</div>
                        </Grid>
						<Grid item container xs={12} justifyContent={"center"}>
                            <h1 className='mediaHeading'>Objectivity</h1>
                        </Grid>
						<Grid item container xs={12} justifyContent={"center"}>
                            <div className='obj'>{fact}</div>
                        </Grid>
					</Grid>
					}
				</Grid>
                <Grid container justifyContent={"center"} style={{padding: "1em"}}>
                    
                    {!clicked && (
						<div className='feedback'>Is this report accurate?</div>
					)}
                    <div className='feedbackContainer'>
						{clicked ? (
							<div className='feedback'>Thanks for the feedback</div>
						) :
						(
						<>
							<Button style={{marginRight: "6px"}} color='success' onClick={() => {setClicked(true)}}>
								YES
							</Button>
							<Button color='error' onClick={() => {setClicked(true)}}>
								NO
							</Button>
						</>
						)
						}
                    </div>
                </Grid>
			</Paper>
		</Grid>
	);
};