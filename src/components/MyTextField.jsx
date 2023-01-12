import React from 'react'
import { TextField, Alert } from '@mui/material';
import { useField } from 'formik';

const MyTextField = ({ label, error, ...props }) => {
    const [field, meta, helpers] = useField(props);
    return (
      <>
        { meta.touched && meta.error ? <Alert severity="warning">{error || meta.error}</Alert> : null }
        <TextField 
            {...field} {...props} 
            label={label} 
        />
      </>
    );
};

export default MyTextField