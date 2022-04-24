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

export default function Account() {
    const [value, setValue] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [flag, setFlag] = React.useState(false);

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
        <>
            Account
        </>
    );
}
