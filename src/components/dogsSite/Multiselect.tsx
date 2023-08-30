import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getBreeds, getDogs, searchLocations } from '../helpers/appHelpers';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TableDogs from './TableDogs';
import { arrOfStates } from '../helpers/listOfStates';
import toast, { Toaster } from 'react-hot-toast';

export default function Multiselect() {
    const [Breeds, setBreeds] = React.useState([{ name: 'No items loaded' }]);
    const [selectedBreeds, setSelectedBreeds] = React.useState(['']);
    const [selectedState, setSelectedState] = React.useState(['']);
    const [DogsTemp, setDogsTemp] = React.useState([]);
    const [MinAge, setMinAge] = React.useState(0);
    const [MaxAge, setMaxAge] = React.useState(0);
    const [NextPrev, setNextPrev] = React.useState({ next: '', prev: '' });
    const [city, setCity] = React.useState('');
    const [total, setTotal] = React.useState(0);

    

    React.useEffect(() => {
        // onfirst render get list of Dogs
        getBreeds(setBreeds);
    }, []);

    const getFilteredDogs = async () => {
            // First get all zipCodes, then get all filtered dogs
            searchLocations({ city: city, states: selectedState }).then(
                (res) => {
                    const zipCodesTemp = res.data.results.map(
                        (element: any) => element.zip_code
                    );
                    getDogs(
                        {
                            // sort: "breed:asc",
                            breeds: selectedBreeds,
                            zipCodes: zipCodesTemp,
                            ageMin: MinAge,
                            ageMax: MaxAge,
                            size: 40,
                        },
                        setDogsTemp,
                        setNextPrev,
                        setTotal
                    );
                }
            );
    };

    return (
        <Stack spacing={3}>
            <Typography
                variant='h4'
                gutterBottom
                sx={{ textAlign: 'center' }}
            >
                Match Dogs App
            </Typography>
            <Typography
                variant='subtitle1'
                gutterBottom
                sx={{ textAlign: 'center', color: '#1E89D3' }}
            >
                Use the search filter to match you with a puppy
            </Typography>

            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    xs={3}
                >
                    <Autocomplete
                        multiple
                        id='tags-standard'
                        options={Breeds}
                        fullWidth
                        getOptionLabel={(option) => option?.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant='standard'
                                label='Breed'
                                placeholder='Favorites'
                            />
                        )}
                        onChange={(event, newValue) => {
                            setSelectedBreeds(
                                newValue.map((element) => element.name)
                            );
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={1}
                >
                    <TextField
                        id='standard-basic'
                        label='Min Age'
                        variant='standard'
                        type='number'
                        fullWidth
                        InputProps={{
                            inputProps: {
                                max: 100,
                                min: 0,
                            },
                        }}
                        onChange={(e) => {
                            setMinAge(Number(e.target.value));
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={1}
                >
                    <TextField
                        fullWidth
                        id='standard-basic'
                        label='Max Age'
                        variant='standard'
                        type='number'
                        InputProps={{
                            inputProps: {
                                max: 100,
                                min: 0,
                            },
                        }}
                        onChange={(e) => {
                            setMaxAge(Number(e.target.value));
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={1}
                >
                    <TextField
                        fullWidth
                        id='standard-basic'
                        label='City'
                        variant='standard'
                        type='text'
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                >
                    <Autocomplete
                        multiple
                        id='tags-standard'
                        options={arrOfStates}
                        fullWidth
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant='standard'
                                label='State'
                                placeholder='Favorites'
                            />
                        )}
                        onChange={(event, newValue) => {
                            setSelectedState(
                                newValue.map((element) => element)
                            );
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                >
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={() => {
                            getFilteredDogs();
                            localStorage.removeItem('rowSelection');
                        }}
                    >
                        Filter
                    </Button>
                </Grid>
            </Grid>
            <TableDogs
                total={total}
                DogsData={DogsTemp}
                next={NextPrev?.next}
                previous={NextPrev?.prev}
            />
            <Toaster position='top-left' />
        </Stack>
    );
}
