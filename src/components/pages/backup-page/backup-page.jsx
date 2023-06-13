import React, {useEffect, useState} from 'react';
import NavigationPanel from "../../app-bar/navigation-panel";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import classes from './backup-page.module.css'
import * as BackupPageController from './backup-page-controller';
import {Box, Divider} from "@mui/material";

const BackupPage = () => {
    const [open, setOpen] = useState(false);
    const [backups, setBackups] = useState([]);

    useEffect(() => {
        loadBackups();
    }, [])

    const loadBackups = () => {
        BackupPageController.getBackups().then(backups => {
            setBackups(backups)
            console.log(backups)
        });
    }

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const createBackup = async () => {
        const createdBackup = await BackupPageController.createBackup();
        const blob = new Blob([createdBackup], { type: 'application/zip' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `backup-${new Date().toISOString()}.zip`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
    };


    return (
        <div>
            <NavigationPanel selectedItem='Backup'/>
            <div>
                <Button variant="contained" onClick={createBackup} sx={{marginTop: '2rem', marginBottom: '2rem', backgroundColor: 'green'}}>
                    Create backup
                </Button>
            </div>
            <div className={classes.root}>
                {backups.map((backup) => {
                    const dumpTime = new Date(backup.timestamp);
                    const cardTitle = `${dumpTime.getDate()}-${dumpTime.getMonth()}-${dumpTime.getFullYear()} (${dumpTime.getHours()}:${dumpTime.getMinutes()}:${dumpTime.getSeconds()})`;
                    return (
                    <Card key={backup.id} className={classes.card} sx={{maxWidth: '20rem', backgroundColor: '#D3D3D34D'}}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {cardTitle}
                            </Typography>
                            <Divider/>
                            <Typography variant="h6" component="div" sx={{marginTop: '1rem'}}>
                                Dump size (mb):
                            </Typography>
                            <Typography variant="h5" component="div">
                                {backup.dumpSize}
                            </Typography>
                            <Divider/>
                            <Typography variant="h6" component="div" sx={{marginTop: '1rem'}}>
                                Dump id:
                            </Typography>
                            <Typography variant="h8" component="div">
                                {backup.id}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                <Button variant="contained">
                                    Download
                                </Button>
                                <Button variant="contained" onClick={handleOpenModal} sx={{ backgroundColor: 'red' }}>
                                    Backup it
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )})
                }
                <Modal open={open} onClose={handleCloseModal}>
                    <div className={classes.modal}>
                        <Typography variant="h6" component="h2">
                            Modal Content
                        </Typography>
                        <Typography variant="body1">
                            This is the content of the modal window.
                        </Typography>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default BackupPage;
