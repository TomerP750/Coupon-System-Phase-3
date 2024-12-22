import "./About.css";

// export function About(): JSX.Element {
//     return (
//         <div className="About">
//
//         </div>
//     );
// }


import { Box, Typography } from '@mui/material';

export function About() {
    return (
        <Box
            sx={{
                color: 'white',
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
            <Typography variant="h4" align="center" gutterBottom>
                About Us
            </Typography>
            <Typography paragraph>
                Welcome to CoupoNest, your go-to destination for the best coupons and discounts available online! Our mission is to help you save money while shopping for the products and services you love.
            </Typography>
            <Typography paragraph>
                Founded in 2024, we started with a simple idea: to bring together the best deals from various retailers and make them accessible to everyone. We believe that saving money shouldn't be complicated, which is why we strive to provide a user-friendly platform that makes finding and using coupons easy.
            </Typography>
            <Typography paragraph>
                At CoupoNest, we work tirelessly to partner with leading brands and retailers, ensuring that our users have access to exclusive offers and the latest promotions. Our team is dedicated to curating high-quality coupons, ensuring that every deal we provide is genuine and valuable.
            </Typography>
            <Typography paragraph>
                We understand that every penny counts, which is why we're passionate about helping you maximize your savings. Whether you're shopping for groceries, clothing, electronics, or dining out, we've got you covered with the best deals around.
            </Typography>
            <Typography paragraph>
                Thank you for choosing CoupoNest as your trusted source for coupons. Join our community of savvy shoppers today and start saving!
            </Typography>
        </Box>

    );
}