import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Slider } from '@mui/material';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider({ value, setValue, label, icon, min, max, step, showTextInput}) {

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      {label && <Typography id="input-slider" gutterBottom>{label}</Typography>}
      <Grid container spacing={2} alignItems="center">
        {icon && <Grid item>{icon}</Grid>}
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 1}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={step}
            min={min}
            max={max}
            marks
          />
        </Grid>
        {showTextInput && <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>}
      </Grid>
    </Box>
  );
}