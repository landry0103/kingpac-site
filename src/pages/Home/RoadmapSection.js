import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import MotionDiv from '../../components/MotionDiv';
import { FONT_RIGHTEOUS, VAR_FADE_IN_UP } from '../../utils/constants';

export default function RoadmapSection({ bgcolor, id }) {
  return (
    <Box bgcolor={bgcolor} py={8} id={id}>
      <Container maxWidth="lg">
        <MotionDiv variants={VAR_FADE_IN_UP}>
          <Typography
            fontFamily={FONT_RIGHTEOUS}
            fontSize={{ xs: 24, sm: 36, md: 48 }}
            color={grey[300]}
            textAlign="center"
          >
            Roadmap
          </Typography>
        </MotionDiv>
      </Container>
    </Box>
  );
}