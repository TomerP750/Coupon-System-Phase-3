import "./Footer.css";
import {NavLink} from "react-router-dom";
import {TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                marginTop: '10%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
                backgroundColor: '#1c1b1b',
                color: '#fff',
            }}
        >
            {/* Row 1: Four Columns with Responsiveness */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2, // Add gap between columns
                    // Stack columns for medium (md) and smaller screen sizes (tablets and phones)
                    '@media (max-width: 960px)': {
                        flexDirection: 'column', // Stack columns on tablets
                    },
                    '@media (max-width: 600px)': {
                        flexDirection: 'column', // Stack columns on small devices like phones
                    },
                }}
            >
                {/* Column 1: About Us, Terms, Privacy */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '23%',
                        minWidth: '220px',
                        '@media (max-width: 960px)': {
                            maxWidth: '48%', // On tablet screens, reduce width
                        },
                        '@media (max-width: 600px)': {
                            maxWidth: '100%', // On mobile screens, take full width
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom>Company</Typography>
                    <NavLink to="/about" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        About Us
                    </NavLink>
                    <NavLink to="/terms" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        Terms of Service
                    </NavLink>
                    <NavLink to="/privacy" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        Privacy Policy
                    </NavLink>
                </Box>

                {/* Column 2: Social Media Links */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '23%',
                        minWidth: '220px',
                        '@media (max-width: 960px)': {
                            maxWidth: '48%', // On tablet screens, reduce width
                        },
                        '@media (max-width: 600px)': {
                            maxWidth: '100%', // On mobile screens, take full width
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom>Follow Us</Typography>
                    <NavLink to="https://www.linkedin.com/in/tomerj750/" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        LinkedIn
                    </NavLink>
                    <NavLink to="https://github.com/TomerP750" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        GitHub
                    </NavLink>
                    <NavLink to="#" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        Instagram
                    </NavLink>
                </Box>

                {/* Column 3: Contact Information */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '23%',
                        minWidth: '220px',
                        '@media (max-width: 960px)': {
                            maxWidth: '48%', // On tablet screens, reduce width
                        },
                        '@media (max-width: 600px)': {
                            maxWidth: '100%', // On mobile screens, take full width
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom>Contact</Typography>
                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                        Email: contact@CoupoNest.com
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                        Phone: +1 234 567 890
                    </Typography>
                    <NavLink to="/contact" style={{ display: 'block', marginTop: '8px', color: '#fff', textDecoration: 'none' }}>
                        Contact Us
                    </NavLink>
                </Box>

                {/* Column 4: Newsletter */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: '23%',
                        minWidth: '220px',
                        '@media (max-width: 960px)': {
                            maxWidth: '48%', // On tablet screens, reduce width
                        },
                        '@media (max-width: 600px)': {
                            maxWidth: '100%', // On mobile screens, take full width
                        },
                    }}
                >
                    <Typography variant="h6" gutterBottom>Newsletter</Typography>
                    <Typography variant="body2">Subscribe to our newsletter for the latest updates.</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <TextField
                            label="Your Email"
                            variant="outlined"
                            size="small"
                            sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2 }}
                        >
                            Subscribe
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Footer bottom */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">&copy; 2024 CoupoNest. All rights reserved.</Typography>
            </Box>
        </Box>
    );
}

export default Footer;

