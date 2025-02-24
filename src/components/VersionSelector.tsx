import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import '../styles/global.css';

const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  border: '1px solid rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(1.5, 4),
  marginBottom: theme.spacing(4),
  display: 'inline-block',
  userSelect: 'none',
  '& h1': {
    fontSize: '2.5rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: '#FFFFFF',
    margin: 0,
    fontFamily: 'Georgia, serif',
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },
}));

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
});

const TitleTypography = styled(Typography)({
  color: 'white',
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 300,
  letterSpacing: '0.02em',
});

const VersionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#000000',
  borderRadius: 0,
  border: '1px solid rgba(25, 118, 210, 0.5)',
  minWidth: '140px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    border: '1px solid #1976d2',
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
  '& .card-header': {
    padding: theme.spacing(1, 2),
    textAlign: 'center',
    '& h6': {
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#1976d2',
      margin: 0,
      fontSize: '0.875rem',
    },
  },
}));

const VersionSelector: React.FC = () => {
  const handleVersionSelect = (version: 'civilian' | 'defense') => {
    const url = version === 'civilian' 
      ? import.meta.env.VITE_CIVILIAN_URL 
      : import.meta.env.VITE_DEFENSE_URL;
    
    window.location.href = url;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        backgroundColor: '#000000',
      }}
    >
      <ContentContainer>
        <LogoBox>
          <h1>HandReceipt</h1>
        </LogoBox>

        <TitleTypography>
          Please select dual-use version.
        </TitleTypography>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <VersionCard onClick={() => handleVersionSelect('defense')}>
            <div className="card-header">
              <Typography variant="h6">Defense</Typography>
            </div>
          </VersionCard>

          <VersionCard onClick={() => handleVersionSelect('civilian')}>
            <div className="card-header">
              <Typography variant="h6">Civilian</Typography>
            </div>
          </VersionCard>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default VersionSelector;
