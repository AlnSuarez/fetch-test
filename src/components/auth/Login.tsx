import React, { useState } from 'react';
import { Container, FormContainer } from '../styles/LoginStyles';
import { getBreeds, registerSite } from '../helpers/appHelpers';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { text } from 'stream/consumers';

export default function Login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState<String>('');
    const [Name, setName] = useState<String>('');

    // Creates a toast in every message sent
    const notify = (message: Text) => toast(`${message}`);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevents the default behavior of the button click
        // Register/Login method using API
        registerSite(
            {
                name: Name,
                email: Email,
            },
            goToSite,
            notify
        );
    };

    

    const goToSite = () => {
        navigate('/DogSite');
    };

    return (
        <Container>
            <FormContainer>
                <Typography
                    variant='h2'
                    gutterBottom
                    sx={{ color: 'black' }}
                >
                    Login <PetsIcon />
                </Typography>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id='outlined-basic'
                            type='text'
                            label='Name'
                            variant='outlined'
                            fullWidth
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                    >
                        <TextField
                            id='outlined-basic'
                            label='Email'
                            variant='outlined'
                            type='email'
                            fullWidth
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={4}
                    ></Grid>

                    <Grid
                        item
                        xs={4}
                    >
                        <Button
                            variant='contained'
                            onClick={(e) => {
                                handleClick(e);
                            }}
                            fullWidth
                        >
                            Enter
                        </Button>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                    ></Grid>
                    <Toaster />
                </Grid>

                {/* <DogFilter/> */}

                {/* <button
                    onClick={(e) => {
                        handleBreeds(e);
                    }}
                >
                    breeds
                </button> */}

                {/* <InputComponent name='correo' /> */}
            </FormContainer>
        </Container>
    );
}
