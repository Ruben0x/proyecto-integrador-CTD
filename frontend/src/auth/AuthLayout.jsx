import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';

export const AuthLayout = ({ children, title = '', subtitle = '' }) => {
  return (
    <Container sx={{ minHeight: '90vh', backgroundColor: 'white' }}>
      <Box sx={{ margin: 2 }}>
        <Box paddingY={2}>
          <Link
            component={RouterLink}
            style={{ textDecoration: 'none' }}
            to={'/'}
          >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
              }}
            >
              <WestIcon fontSize='large' sx={{ paddingRight: 2 }} />
              {'Volver'}
            </Typography>
          </Link>
        </Box>
        <Typography
          variant='h3'
          sx={{
            color: '#ff5000',
            fontWeight: '600',
            textTransform: 'uppercase',
            pb: 5,
          }}
        >
          {title}
          <span style={{ color: '#000000' }}> {subtitle}</span>
        </Typography>
        {children}
      </Box>
    </Container>
  );
};
