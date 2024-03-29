import { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../util/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Container,
  FormControl,
  TextField,
  Button,
  Avatar,
  Typography,
  Alert,
  Grid,
} from '@mui/material';

const EditName = () => {
  const [currentUser] = useContext(AuthContext);
  const [editFormValues, setEditFormValues] = useState({});
  const [, setFormErrors] = useState({});

  useEffect(() => {
    setEditFormValues({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    });
  }, [currentUser]);

  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');

  const validateData = async () => {
    const errors = {};
    if (!editFormValues.firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!editFormValues.lastName) {
      errors.firstName = 'Last name is required.';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitData = async () => {
    const url = `/api/users/${currentUser._id}/updatename`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage['access-token'],
        'x-auth-token': localStorage['refresh-token'],
      },
      body: JSON.stringify({ firstName: editFormValues.firstName, lastName: editFormValues.lastName }),
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
  };

  const handleUpdate = ({ username }) => {
    setShowSuccessMessage(true);
    setMessage('Name updated.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateData()
      .then(() => submitData())
      .then((data) => handleUpdate(data.payload))
      .catch((error) => console.error(error));
  };
  const handleFormInputChange = (event) => {
    setEditFormValues({ ...editFormValues, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Box
        sx={{
          mb: 8,
          mx: 0,
          my: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
        <Typography component='h1' variant='h5'>
          Edit Name
        </Typography>

        {showSuccessMessage ? (
          <Alert
            action={
              <Button color='inherit' size='small' onClick={() => navigate('/account-settings')}>
                Go back to Account Settings
              </Button>
            }
            sx={{ height: '200px', mt: 3, width: '100%' }}
          >
            {message}
          </Alert>
        ) : (
          <Box sx={{ width: '100%' }} noValidate component='form' onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                margin='normal'
                required
                fullWidth
                id='first-name'
                name='firstName'
                autoComplete='firstName'
                autoFocus
                value={editFormValues.firstName || ''}
                onChange={handleFormInputChange}
                label='First name'
              />

              <TextField
                margin='normal'
                required
                fullWidth
                id='last-name'
                name='lastName'
                autoComplete='lastName'
                autoFocus
                value={editFormValues.lastName || ''}
                onChange={handleFormInputChange}
                label='Last name'
              />

              <Grid container sx={{ mt: 2 }} spacing={2}>
                <Grid item md={6}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/account-settings')}
                    variant='contained'
                    fullWidth
                  >
                    Discard edits
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button fullWidth variant='contained' type='submit'>
                    Edit name
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        )}
      </Box>
    </Container>
  );
};
export default EditName;
