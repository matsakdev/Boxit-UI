import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getContainerInfo} from "./container-details-controller";
import {Button, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import classes from './container-details-page.module.css';
import {ContainerCategories, ContainerTypes, Indicators} from "../../../shared/constants/container-constants";
import Typography from "@mui/material/Typography";
import NavigationPanel from "../../app-bar/navigation-panel";

const ContainerDetailsPage = () => {
    const navigate = useNavigate();
    const {containerId} = useParams();

    const allIndicators = Object.keys(Indicators);
    const allTypes = Object.keys(ContainerTypes);
    const allCategories = Object.keys(ContainerCategories);

    useEffect(() => {
        getContainerInfo(containerId).then(containerInfo => setContainerDetailsFields(containerInfo));
    }, [])

    const setContainerDetailsFields = (containerInfo) => {
        const indicatorsNormalized = containerInfo.indicators.map(indicator => indicator.type);
        console.log(indicatorsNormalized)
        setFormData({
            location: containerInfo.location,
            indicators: indicatorsNormalized,
            categories: containerInfo.categories,
            title: containerInfo.title,
            width: containerInfo.width,
            height: containerInfo.height,
            length: containerInfo.length,
            type: containerInfo.type,
        })
    }

    const handleCancel = () => {
        navigate('/');
    };

    const [formData, setFormData] = useState({
        location: 'Kyiv',
        indicators: [],
        title: '',
        width: 0,
        height: 0,
        length: 0,
        type: '',
        categories: []
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDropdownChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (e) => {
        const {name} = e.target;
        const selectedValues = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedValues,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Відправити дані на /api/v2/save
        console.log(formData);
    };

    return (
        <div>
            <NavigationPanel/>
            <div className={classes['details-section']}>
                <h1>Container Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className={classes['info-section']}>
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: 'Hind, sans-serif',
                        }}>
                            Container Type
                        </Typography>
                        <Select
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleDropdownChange}
                        >
                            {allTypes.map(type => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className={classes['info-section']}>
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: 'Hind, sans-serif',
                        }}>
                            Categories
                        </Typography>
                        <Select
                            label="Categories"
                            name="categories"
                            multiple
                            value={formData.categories}
                            onChange={handleMultiSelectChange}
                        >
                            {allCategories.map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className={classes['info-section']}>
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: 'Hind, sans-serif',
                        }}>
                            Indicators
                        </Typography>
                        <Select
                            label="Indicators"
                            name="indicators"
                            multiple
                            value={formData.indicators}
                            onChange={handleMultiSelectChange}
                        >
                            {allIndicators.map(indicator => (
                                <MenuItem key={indicator} value={indicator}>{indicator}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className={classes['info-section']}>
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: 'Hind, sans-serif',
                        }}>
                            Container Title
                        </Typography>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes['info-section']}>
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: 'Hind, sans-serif',
                        }}>
                            Current Location
                        </Typography>
                        <Select
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleDropdownChange}
                        >
                            <MenuItem value="Kyiv">Kyiv</MenuItem>
                            <MenuItem value="London">London</MenuItem>
                            <MenuItem value="New York">New York</MenuItem>
                        </Select>
                    </div>
                    <div className={classes['info-section']}>
                        <Typography variant="h6" component="h6" sx={{
                            fontFamily: 'Hind, sans-serif',
                        }}>
                            Dimensions
                        </Typography>
                        <TextField
                            type="number"
                            label="Width"
                            name="width"
                            value={formData.width}
                            onChange={handleInputChange}
                            sx={{width: '10rem'}}
                        />
                        <TextField
                            type="number"
                            label="Length"
                            name="length"
                            value={formData.length}
                            onChange={handleInputChange}
                            sx={{marginLeft: '1rem', width: '10rem'}}
                        />
                        <TextField
                            type="number"
                            label="Height"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            sx={{marginLeft: '1rem', width: '10rem'}}
                        />
                    </div>
                    <Button variant="contained" type="button" onClick={handleCancel}
                            sx={{backgroundColor: 'red', margin: '1rem'}}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{margin: '1rem'}}>Save</Button>
                </form>
            </div>
        </div>
    );
};

export default ContainerDetailsPage;
