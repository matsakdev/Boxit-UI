import './App.css';
import LoginForm from "./components/registration-window/registration-window";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ContainersPage from "./components/pages/containers-page/containers-page"
import {useEffect, useState} from "react";
import {LocalStorage} from "./utils/localStorage";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "./shared/redux/user-info";
import BackupPage from "./components/pages/backup-page/backup-page";
import StatisticsPage from "./components/pages/statistics-page/statistics-page";
import ContainerDetailsPage from "./components/pages/container-details-page/container-details-page";

function App() {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const localToken = LocalStorage.getItem('authToken');
    //     if (localToken) {
    //         dispatch(setToken({
    //             token: localToken
    //         }))
    //     }
    // }, []);
    //
    // const token = useSelector(state => state.userInfo.token);
    // console.log('tt', token);

    const [isAuth, setAuth] = useState(LocalStorage.getItem('authToken'));

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuth ? (
                                <ContainersPage selectedItem='Containers' />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={<LoginForm />}
                    />
                    <Route
                        path="/backup"
                        element={<BackupPage />}
                    />
                    <Route
                        path="/statistics"
                        element={<StatisticsPage />}
                    />
                    <Route
                        path="/containers/:containerId"
                        element={<ContainerDetailsPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
