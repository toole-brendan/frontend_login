import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { fontFamilies, fontWeights } from '../styles/theme-constants';
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
  userSelect: 'none',
  fontSize: '1.25rem',
  fontWeight: 300,
  letterSpacing: '0.02em',
});

const VersionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.grey[900],
  cursor: 'pointer',
  borderRadius: 0,
  minWidth: '200px',
  transition: 'background-color 0.2s ease-in-out',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
}));

const StyledTypography = styled(Typography)({
  color: 'text.primary',
  textAlign: 'center',
  userSelect: 'none',
});

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
            alignItems: 'center',
          }}
        >
          <VersionCard onClick={() => handleVersionSelect('defense')}>
            <StyledTypography variant="body1">
              Defense
            </StyledTypography>
          </VersionCard>

          <VersionCard onClick={() => handleVersionSelect('civilian')}>
            <StyledTypography variant="body1">
              Civilian
            </StyledTypography>
          </VersionCard>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default VersionSelector;
