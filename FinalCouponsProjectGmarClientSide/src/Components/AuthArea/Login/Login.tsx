import "./Login.css";
import * as React from 'react';
import {useState} from 'react';
import {
    Button,
    createTheme,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {AppProvider} from '@toolpad/core/AppProvider';
import {AuthProvider, SignInPage} from '@toolpad/core/SignInPage';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import authService from "../AuthService";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {ClientType} from "../../../Services/ClientType";
import {jwtDecode} from "jwt-decode";
import {authStore, JWTUser, login} from "../AuthStore";
import notificationService from "../../../Services/NotificationService";

export default function SlotsSignIn() {
    let role= "CUSTOMER";
    let password: string;
    let email: string;

    const providers: AuthProvider[] = [{ id: 'credentials', name: 'Email and Password'}];

    function CustomEmailField() {
        const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
            email = (event.target.value);
        };

        return (
            <TextField onChange={handleEmail}
                       id="input-with-icon-textfield"
                       label="Email"
                       name="email"
                       type="email"
                       size="small"
                       required={true}
                       fullWidth
                       slotProps={{
                           input: {
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <AccountCircle fontSize="inherit" />
                                   </InputAdornment>
                               ),
                           },
                       }}
                       variant="outlined"
            />
        );
    }

    function CustomPasswordField() {
        const [showPassword, setShowPassword] = React.useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event: React.MouseEvent) => {
            event.preventDefault();
        };

        const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
            password = (event.target.value);
        };
        return (
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
                <InputLabel size="small" htmlFor="outlined-adornment-password" required={true} >
                    Password
                </InputLabel>
                <OutlinedInput onChange={handlePassword}
                               id="outlined-adornment-password"
                               type={showPassword ? 'text' : 'password'}
                               name="password"
                               size="small"
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword}
                                           onMouseDown={handleMouseDownPassword}
                                           edge="end"
                                           size="small"
                                       >
                                           {showPassword ? (
                                               <VisibilityOff fontSize="inherit" />
                                           ) : (
                                               <Visibility fontSize="inherit" />
                                           )}
                                       </IconButton>
                                   </InputAdornment>
                               }
                               label="Password"
                />
            </FormControl>
        );
    }

    function BasicSelect(){
        const [showRole, setShowRole] = useState("CUSTOMER");
        const handleChange = (event: SelectChangeEvent) => {
            role = event.target.value as string;
            setShowRole(role);
        };

        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        variant={"filled"} // play with it
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleChange}
                    >
                        <MenuItem value={"ADMINISTRATOR"}>Admin</MenuItem>
                        <MenuItem value={"COMPANY"}>Company</MenuItem>
                        <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    const navigate = useNavigate();

    // Email Validation function
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    function submitLogin(event: React.FormEvent) {
        event.preventDefault();

        if (!email || !validateEmail(email)) {
            notificationService.errorPlainText("Invalid or empty email.");
            return;
        }

        if (!password) {
            notificationService.errorPlainText("Password cannot be empty.");
            return;
        }

        authService.login(email, password, role)
            .then(res => {
                localStorage.my_token = res;
                authStore.dispatch(login(res));
                notificationService.successPlainText(authStore.getState().user?.name + " Login Successfully");
                switch (role) {
                    case 'ADMINISTRATOR':
                        navigate("/admin/dashboard");
                        break;
                    case 'COMPANY':
                        navigate("/company/dashboard");
                        break;
                    case 'CUSTOMER':
                        navigate("/customer/dashboard");
                        break;
                    default:
                        break;
                }
            })
            .catch(err => notificationService.errorAxiosApiCall(err));
    }

    function CustomButton() {
        return (
            <Button
                onClick={submitLogin}
                type="submit"
                variant="outlined"
                color="success"
                size="small"
                disableElevation
                fullWidth
                sx={{ my: 2 }}
            >
                Sign In
            </Button>
        );
    }

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#388E3C',
            },
            background: {
                default: '#c8c8c8',
                paper: '#bcbcbc',
            },
            text: {
                primary: '#ffffff',
                secondary: '#b0bec5',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#388E3C',
            },
            background: {
                default: '#2b2424',
                paper: '#1e1e1e',
            },
            text: {
                primary: '#ffffff',
                secondary: '#b0bec5',
            },
        },
    });
    const theme = useTheme();

    return (
        <AppProvider theme={darkTheme}>
            <SignInPage
                signIn={(provider, formData) =>
                    alert(
                        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
                    )
                }
                slots={{
                    emailField: CustomEmailField,
                    passwordField: CustomPasswordField,
                    submitButton: BasicSelect,
                    forgotPasswordLink: CustomButton,
                }}
                providers={providers}
            />
        </AppProvider>
    );
}
