import * as React from 'react';
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import {
    getDogsObjects2,
    getMatch,
    getPaginatedApplications,
} from '../helpers/appHelpers';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AlertDialog from './AlertDialog';

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Image',
        width: 150,
        renderCell: (params) => (
            <Avatar
                sx={{ width: 56, height: 56 }}
                alt='Remy Sharp'
                src={params.value}
            />
        ),
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 200 },
    {
        field: 'breed',
        headerName: 'Breed',
        width: 100,
    },
    {
        field: 'zip_code',
        headerName: 'Zip Code',
        width: 100,
    },
];

export default function TableDogs({
    total = 0,
    DogsData = [],
    next = '',
    previous = '',
}) {
    const [previousState, setPreviousState] = React.useState('');
    const [NextState, setNextState] = React.useState('');
    const [DogsDataTemp, setDogsDataTemp] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 20,
        page: 0,
    });
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [dataMatch, setDataMatch] = React.useState([]);

    // Pass the prev or next link as parameter
    const fetchDataDogsPaginated = async (actualPage: String) => {
        const result = await getPaginatedApplications(actualPage);
        setNextState(result?.data?.next);
        setPreviousState(result?.data?.prev);
        // Sends the next DogsId in order to fetch dogs objects
        const dogsInfo = await getDogsObjects2(result?.data?.resultIds);
        setDogsDataTemp(dogsInfo.data);
    };

    // Verifies if page is next or previous
    const detectChange = async (e: any) => {
        // Next page
        if (e.page - paginationModel.page === 1) {
            fetchDataDogsPaginated(NextState);
        } else {
            // Previous Page
            fetchDataDogsPaginated(previousState);
        }

        setPaginationModel(e);
    };

    React.useEffect(() => {
        // Default Config for first render
        setPaginationModel({
            pageSize: 20,
            page: 0,
        });
        setNextState(next);
        setPreviousState(previous);
        setDogsDataTemp(DogsData);
    }, [DogsData]);

    const handleGetMatch = async () => {
        const res = await getMatch(rowSelectionModel);
        let arrDogTemp = []
        arrDogTemp.push(res.data.match)
        const dogMatch = await getDogsObjects2(arrDogTemp);
        setDataMatch(dogMatch.data);
        setOpen(true);
    };

    return (
        <div style={{ height: 500, width: '100%' }}>
            {rowSelectionModel.length > 0 ? (
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        xs={4}
                    ></Grid>
                    <Grid
                        item
                        xs={4}
                    >
                        <Button
                            fullWidth
                            variant='contained'
                            color='success'
                            sx={{ marginBottom: '10px' }}
                            onClick={() => {
                                handleGetMatch();
                            }}
                        >
                            Match
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                    ></Grid>
                </Grid>
            ) : (
                <></>
            )}

            {DogsDataTemp.length !== 0 ? (
                <DataGrid
                    rowCount={total}
                    rows={DogsDataTemp}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        // Saves the list of Selections in order to change Page
                        const tempValues = JSON.parse(
                            localStorage?.getItem('rowSelection') || '[]'
                        );
                        setRowSelectionModel(
                            [...tempValues, newRowSelectionModel].flat()
                        );
                    }}
                    rowSelectionModel={rowSelectionModel}
                    paginationMode='server'
                    paginationModel={paginationModel}
                    onPaginationModelChange={(e) => {
                        localStorage.setItem(
                            'rowSelection',
                            JSON.stringify(rowSelectionModel)
                        );
                        setRowSelectionModel(rowSelectionModel);
                        detectChange(e);
                    }}
                />
            ) : (
                <Alert severity='info'>
                    No dogs found with the search criteria
                </Alert>
            )}
            <AlertDialog
                info={dataMatch}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}
