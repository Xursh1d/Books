import { TextField, Button, Typography, Card } from '@mui/material';
import { useSignUpMutation } from '../../../features/api/authApi';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { ErrorMessage, SignUpRequest } from '../../../types/authTypes';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import Toaster from '../../../helpers/Toaster';
import { boxStyle, authCardStyle, centerStyle } from '../../styles';
import { useState, useEffect } from "react";

const validationSchema = Yup.object({
    name: Yup.string().required("Your name is required"),
    email: Yup.string().email("Enter only email").required("Your email address is required"),
    key: Yup.string().required("Your key is required").min(3, "Enter at least 3 characters"),
    secret: Yup.string().required("Your secret is required").min(3, "Enter at least 3 characters")
});

function SignUpPage() {
    const [signUp, { isLoading, isError, error, isSuccess, data }] = useSignUpMutation();
    const navigate = useNavigate()
    const [responseError, setResponseError] = useState<string | null>(null)


    const formik = useFormik({
        initialValues: { name: "", email: "", key: "", secret: "" },
        validationSchema,
        onSubmit: async (values: SignUpRequest) => {
            await signUp(values).unwrap();
        }
    });

    useEffect(() => {
        if (isSuccess && data?.isOk) {
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/login");
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError && error) {
            const responseError = error as ErrorMessage;
            setResponseError(responseError.data.message || "Internal server error");
        }
    }, [isError, error]);

    return (
        <Box sx={boxStyle}>
            <Card variant='outlined' sx={authCardStyle}>
                <Typography variant="h4" align="center" gutterBottom>
                    SignUp
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="key"
                        label="Key"
                        value={formik.values.key}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.key && Boolean(formik.errors.key)}
                        helperText={formik.touched.key && formik.errors.key}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="secret"
                        label="Secret"
                        value={formik.values.secret}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.secret && Boolean(formik.errors.secret)}
                        helperText={formik.touched.secret && formik.errors.secret}
                    />
                    <Box sx={centerStyle}>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ textAlign: "center", margin: "20px 0" }}>
                        Do you have an account?
                        <Link to={"/login"}>
                            Sign In
                        </Link>
                    </Typography>
                </form>
                {isError && <Toaster type='error' message={responseError || "Something went wrong"} />}
            </Card>
        </Box>
    );
}

export default SignUpPage;
