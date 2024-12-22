import "./TermsOfService.css";

// export function TermsOfService(): JSX.Element {
//     return (
//         <div className="TermsOfService">
//
//         </div>
//     );
// }


import { Box, Typography } from '@mui/material';

export function TermsOfService() {
    return (
        <Box
            sx={{
                maxWidth: '800px',
                margin: '60px auto',
                padding: 2,
                height: '80vh', // Set a height for scrolling
                overflowY: 'auto', // Enable vertical scrolling
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#333', // Dark background for contrast
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                Terms of Service
            </Typography>

            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                Last updated: 2024
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Introduction
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                Welcome to CoupoNest. These Terms of Service govern your use of our website
                and services. By accessing or using our services, you agree to be bound by these terms.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Use of Our Services
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                You agree to use our services only for lawful purposes and in accordance with these terms.
                You must not use our services in a way that violates any applicable laws or regulations.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                User Accounts
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                To access certain features of our services, you may need to create an account. You are
                responsible for maintaining the confidentiality of your account information and for all
                activities that occur under your account.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                All content and materials on our website, including text, graphics, logos, and software,
                are the property of CoupoNest or its licensors. You may not reproduce, distribute,
                or create derivative works without our permission.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                To the fullest extent permitted by law, [Your Company Name] shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your use
                of our services.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Changes to These Terms
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                We may update these Terms of Service from time to time. We will notify you of any changes
                by posting the new Terms on this page.
            </Typography>
        </Box>

    );
}