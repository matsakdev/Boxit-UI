import React, {useEffect, useState} from 'react';
import NavigationPanel from "../../app-bar/navigation-panel";
import axios from "axios";
import * as ContainersPageController from './containers-page-controller';
import ContainersTable from "./containers-table";

const ContainersPage = () => {
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        fetchContainers();
    }, []);

    const fetchContainers = async () => {
        try {
            const fetchedContainers = await ContainersPageController.fetchContainers();

            setContainers(fetchedContainers);
            console.log(containers);
        } catch (error) {
            console.error('Error fetching containers:', error);
        }
    };

    return (
        <div>
            <NavigationPanel selectedItem='Containers'/>
            <ContainersTable containers={containers}/>
        </div>
    );
};

export default ContainersPage;
