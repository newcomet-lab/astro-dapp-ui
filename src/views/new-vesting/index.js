import * as React from 'react';

import {
    Grid,
    TextField,
    Select,
    MenuItem,
    Switch,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    Button
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function NewVesting() {
    const [value, setValue] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [flag, setFlag] = React.useState(false);

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
        <MainCard title="Add New Vesting">
            <Grid container rowSpacing={2}>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={12}>
                            <TextField id="recipient_address" fullWidth label="Recipient Address" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={6}>
                            <TextField id="recipient_name" fullWidth label="Recipient Name" variant="outlined" />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField id="recipient_cohort" fullWidth label="Cohort" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={6}>
                            <TextField id="amount" fullWidth label="Amount" variant="outlined" />
                        </Grid>
                        <Grid item sm={6}>
                            <TextField id="strike_amount" fullWidth label="Strike Amount" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Start Date"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                    renderInput={(params) => 
                                        <TextField id="start_date" fullWidth {...params} />
                                    }
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item sm={6}>
                            <TextField id="period" fullWidth label="Period(Months)" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={4}>
                            <TextField id="release_frequency" fullWidth label="Release Frequency" variant="outlined" />
                        </Grid>
                        <Grid item sm={2}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>second</MenuItem>
                                    <MenuItem value={60}>minute</MenuItem>
                                    <MenuItem value={3600}>hour</MenuItem>
                                    <MenuItem value={86400}>day</MenuItem>
                                    <MenuItem value={604800}>week</MenuItem>
                                    <MenuItem value={2592000}>month</MenuItem>
                                    <MenuItem value={31536000}>year</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    {/* <Grid container sm={12} columnSpacing={2}>
                    </Grid> */}
                        <Switch {...{ inputProps: { 'aria-label': 'Switch demo' } }} />
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Cliff Date"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                    renderInput={(params) => 
                                        <TextField id="cliff_date" fullWidth {...params} />
                                    }
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={4}>
                            <FormControl component="fieldset" variant="standard">
                                <FormLabel component="legend">Who can transfer?</FormLabel>
                                    <FormGroup row={true}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={flag} onChange={() => setFlag(!flag)} name="flag" />
                                            }
                                            label="Sender"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={flag} onChange={() => setFlag(!flag)} name="flag" />
                                            }
                                            label="Sender"
                                        />
                                    </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl component="fieldset" variant="standard">
                                <FormLabel component="legend">Who can cancel?</FormLabel>
                                    <FormGroup row={true}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={flag} onChange={() => setFlag(!flag)} name="flag" />
                                            }
                                            label="Sender"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={flag} onChange={() => setFlag(!flag)} name="flag" />
                                            }
                                            label="Sender"
                                        />
                                    </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <Grid container sm={8} columnSpacing={2}>
                        <Grid item sm={4}>
                            <Button variant="contained">Add New</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}
