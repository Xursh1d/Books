import * as Yup from "yup";
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Toaster from '../../../helpers/Toaster';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../features/api/authApi';
import { SignUpKeySecret } from '../../../types/authTypes';
import { TextField, Button, Typography, Card } from '@mui/material';
import { boxStyle, authCardStyle, centerStyle } from "../../styles";


const validationSchema = Yup.object({
    key: Yup.string().required("Your key is required").min(3, "Enter at least 3 characters"),
    secret: Yup.string().required("Your secret is required").min(3, "Enter at least 3 characters")
});

function LoginPage() {
    const [signIn, { data, isLoading, isError, isSuccess, error }] = useSignInMutation()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { key: "", secret: "" },
        validationSchema,
        onSubmit: async (values: SignUpKeySecret) => {
            await signIn(values).unwrap();
        }
    });

    if (isSuccess && data?.isOk) {
        localStorage.setItem("user", JSON.stringify(data))
        navigate("/")
    }

    return (
        <Box sx={boxStyle}>
            <Card variant='outlined' sx={authCardStyle}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
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
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ textAlign: "center", margin: "20px 0" }}>
                        Don't have an account?
                        <Link to={"/signUp"}>
                            Sign Up
                        </Link>
                    </Typography>
                </form>
                {isError && <Toaster type="error" message={error?.data?.message as string || "Something went wrong"} />}
            </Card>
        </Box>
    );
}

export default LoginPage;
