import "./PrivacyPolicy.css";

// export function PrivacyPolicy(): JSX.Element {
//     return (
//         <div className="PrivacyPolicy">
//
//         </div>
//     );
// }

import { Box, Typography } from '@mui/material';

export function PrivacyPolicy() {
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
                Privacy Policy
            </Typography>

            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                Last updated: December 2024
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Introduction
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                Welcome to CoupoNest. We are committed to protecting your personal information
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website or use our services.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Information We Collect
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                We may collect personal information that you provide to us when you register on our website,
                make a purchase, or interact with us. This may include:
            </Typography>
            <ul>
                <li style={{ color: 'white' }}>Email address</li>
                <li style={{ color: 'white' }}>Phone number</li>
                <li style={{ color: 'white' }}>Payment information</li>
                <li style={{ color: 'white' }}>Billing address</li>
                <li style={{ color: 'white' }}>Shipping address</li>
            </ul>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                We use the information we collect in various ways, including to:
            </Typography>
            <ul>
                <li style={{ color: 'white' }}>Process your transactions and manage your account</li>
                <li style={{ color: 'white' }}>Communicate with you about your account or transactions</li>
                <li style={{ color: 'white' }}>Send you marketing and promotional communications</li>
                <li style={{ color: 'white' }}>Improve our website and services</li>
            </ul>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Disclosure of Your Information
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                We do not sell or rent your personal information to third parties. We may share your information
                with trusted third parties who assist us in operating our website, conducting our business, or servicing you,
                as long as those parties agree to keep this information confidential.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Your Rights
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                You have the right to request access to the personal information we hold about you,
                and to ask that your personal information be corrected, updated, or deleted.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
                We may update our Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page.
            </Typography>
        </Box>
    );
}
