import React, {useRef, useState} from 'react';
import {TextField, Button, Box, Container, ToggleButtonGroup, ToggleButton} from '@mui/material';
import {LoginFormViews} from "./regstration-window-view";
import {useDispatch, useSelector} from "react-redux";
import {getUserToken, setToken} from "../../shared/redux/user-info";
import {LocalStorage} from "../../utils/localStorage";
import {useNavigate} from "react-router-dom";
import {loginCall} from "./registration-window-controller";
import ModalPortal from "../../shared/components/ModalPortal";

const LoginForm = () => {
    const dispatch = useDispatch();
    const authToken = useSelector(getUserToken);
    console.log('auth before', authToken);

    const email = useRef('');
    const password = useRef('');

    const repeatedPassword = useRef('');
    const accessKey = useRef('');

    const [view, setCurrentView] = useState(LoginFormViews.LOGIN);
    const [isShowModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (view === LoginFormViews.LOGIN) {
            await handleLogin();
        } else {
            handleRegistration();
        }
    };

    const handleLogin = async () => {
        const emailText = email.current.value;
        const passwordText = password.current.value;

        console.log(emailText, passwordText)

        const {data, status} = await loginCall(emailText, passwordText);

        console.log(data, status);
        if (status === 200) {
            dispatch(setToken({
                token: data.token
            }));
            LocalStorage.setItem('authToken', data.token);

            console.log('authToken after', authToken);

            navigate('/');
        } else {
            console.log('error', data);
            setShowModal(true);
        }
    };

    const handleRegistration = () => {
    };

    const handleChangeView = (event, newView) => {
        setCurrentView(newView);
    }

    return (
        <React.Fragment>
        <form onSubmit={handleSubmit}>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '500px',
                        margin: 'auto',
                        border: '1px solid black',
                        padding: '4rem',
                        paddingTop: '1rem',
                        borderRadius: '16px'
                    }}
                >
                    <ToggleButtonGroup
                        color="primary"
                        value={view}
                        exclusive
                        onChange={handleChangeView}
                        aria-label="Platform"
                        sx={{
                            marginBottom: '2rem'
                        }}
                    >
                        <ToggleButton value="registration">Register</ToggleButton>
                        <ToggleButton value="login">Login</ToggleButton>
                    </ToggleButtonGroup>
                    { view === 'registration' && (
                        <TextField
                            label="Access Code"
                            type="text"
                            inputRef={accessKey}
                            margin="normal"
                            required
                        />
                    )}
                    <TextField
                        label="Email"
                        type="email"
                        inputRef={email}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        inputRef={password}
                        margin="normal"
                        required
                    />
                    { view === 'registration' && (
                        <TextField
                            label="Repeat password"
                            type="password"
                            inputRef={repeatedPassword}
                            margin="normal"
                            required
                        />
                    )}
                    <Button type="submit" variant="contained" color="primary" sx={{marginTop: '1rem'}}>
                        Submit
                    </Button>
                </Box>
            </Container>
        </form>
            {isShowModal && (
                <ModalPortal onClose={() => {
                    console.log('closed')
                }}/>
            )}
        </React.Fragment>

    );
};

export default LoginForm;
