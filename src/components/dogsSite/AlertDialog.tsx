import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
    info = [{ age: 0, breed: '', id: '', img: '', name: '', zip_code: '' }],
    open = false,
    setOpen = (setValue: boolean) => {},
}) {
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        console.log(info[0]);
    }, [info]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{'Match!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You were matched with the next puppy, congratulations!
                    </DialogContentText>
                    <DialogContentText id='alert-dialog-description'>
                        Name: {info[0]?.name || "None"} Age: {info[0]?.name || "None"} breed:{' '}
                        {info[0]?.breed|| "None"} Zip Code: {info[0]?.zip_code || "None"}
                    </DialogContentText>

                    <img
                        src={info[0]?.img || ""}
                        alt=''
                        style={{ width: '90%' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        autoFocus
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
