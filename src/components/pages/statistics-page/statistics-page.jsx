import React from 'react';
import NavigationPanel from "../../app-bar/navigation-panel";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import * as StatisticsPageController from './statistics-pae-controller';

const StatisticsPage = () => {

    const downloadStatistics = async() => {
        const response = await StatisticsPageController.downloadStatistics();
        const blob = new Blob([response], { type: 'application/xlsx' });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `statistics-${new Date().toISOString()}.xlsx`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
    };

    return (
        <div>
            <NavigationPanel selectedItem='Statistics' />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', width: '60%', margin: '45vh auto' }}>
                <Button variant="contained" sx={{backgroundColor: 'orange'}} onClick={downloadStatistics}>
                    Download latest statistics
                </Button>
            </Box>
        </div>
    );
};

export default StatisticsPage;
