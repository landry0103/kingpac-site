import React from 'react';
import {
  Box,
  CardHeader,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import MotionDiv from '../../components/MotionDiv';
import NoData from '../../components/NoData';
import { PrimaryCard, SecondaryTableContainer } from '../../components/styledComponents';
import {
  FONT_AMARANTH,
  FONT_RIGHTEOUS,
  NO_WINNERS,
  VAR_FADE_IN_DOWN,
  VAR_FADE_IN_UP
} from '../../utils/constants';
import useUser from '../../hooks/useUser';
import { COLOR_PRIMARY } from '../../utils/constants';
import useWallet from '../../hooks/useWallet';

export default function LeaderboardSection({ bgcolor, id }) {
  const { winnersOfThisWeek, winnersOfLastWeek } = useUser();
  const { balanceOfRewardPool } = useWallet();

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
            Leaderboard
          </Typography>
        </MotionDiv>
        <MotionDiv variants={VAR_FADE_IN_DOWN}>
          <Typography
            fontFamily={FONT_AMARANTH}
            fontSize={{ xs: 14, sm: 22, md: 28 }}
            color={grey[300]}
            textAlign="center"
          >
            Reward Pool:&nbsp;
            <Typography
              component="span"
              fontFamily={FONT_AMARANTH}
              fontSize={{ xs: 20, sm: 28, md: 36 }}
              color={COLOR_PRIMARY}
              textAlign="center"
              fontWeight={900}
            >{balanceOfRewardPool} BNB</Typography>
          </Typography>
        </MotionDiv>
        <MotionDiv variants={VAR_FADE_IN_UP}>
          <PrimaryCard sx={{ mt: { xs: 3, md: 6 } }}>
            <CardHeader
              title="Current week leaderboard"
              titleTypographyProps={{
                sx: {
                  fontFamily: FONT_RIGHTEOUS,
                  fontSize: {
                    xs: 18,
                    md: 24
                  }
                }
              }}
            />

            <SecondaryTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Rank</TableCell>
                    <TableCell align="center">Wallet address</TableCell>
                    <TableCell align="center">Telegram username</TableCell>
                    <TableCell align="center" sx={{ display: { xs: 'none', md: 'block' } }}>Twitter username</TableCell>
                    <TableCell align="center">Completed Levels</TableCell>
                    <TableCell align="center">Reward</TableCell>
                  </TableRow>
                </TableHead>

                {
                  winnersOfThisWeek.length > 0 && (
                    <TableBody>
                      {
                        winnersOfThisWeek.map(winner => (
                          <TableRow key={winner.rank}>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.rank}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.walletAddress}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.telegramUsername}</TableCell>
                            <TableCell
                              align="center"
                              sx={{ display: { xs: 'none', md: 'block' }, maxWidth: { xs: 60, md: 'none' } }}
                            >
                              {winner.twitterUsername}
                            </TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.completedLevel}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.reward}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  )
                }
              </Table>
              {
                winnersOfThisWeek.length === 0 && (<NoData text={NO_WINNERS} />)
              }
            </SecondaryTableContainer>
          </PrimaryCard>
        </MotionDiv>
        <MotionDiv variants={VAR_FADE_IN_UP}>
          <PrimaryCard sx={{ mt: { xs: 3, md: 6 } }}>
            <CardHeader
              title="Last week leaderboard"
              titleTypographyProps={{
                sx: {
                  fontFamily: FONT_RIGHTEOUS,
                  fontSize: {
                    xs: 18,
                    md: 24
                  }
                }
              }}
            />

            <SecondaryTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Rank</TableCell>
                    <TableCell align="center">Wallet address</TableCell>
                    <TableCell align="center">Telegram username</TableCell>
                    <TableCell align="center" sx={{ display: { xs: 'none', md: 'block' } }}>Twitter username</TableCell>
                    <TableCell align="center">Completed Levels</TableCell>
                    <TableCell align="center">Reward</TableCell>
                  </TableRow>
                </TableHead>

                {
                  winnersOfLastWeek.length > 0 && (
                    <TableBody>
                      {
                        winnersOfLastWeek.map(winner => (
                          <TableRow key={winner.rank}>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.rank}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.walletAddress}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.telegramUsername}</TableCell>
                            <TableCell
                              align="center"
                              sx={{ display: { xs: 'none', md: 'block' }, maxWidth: { xs: 60, md: 'none' } }}
                            >
                              {winner.twitterUsername}
                            </TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.completedLevel}</TableCell>
                            <TableCell align="center" sx={{ maxWidth: { xs: 60, md: 'none' } }}>{winner.reward}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  )
                }
              </Table>
              {
                winnersOfLastWeek.length === 0 && (<NoData text={NO_WINNERS} />)
              }
            </SecondaryTableContainer>
          </PrimaryCard>
        </MotionDiv>
      </Container>
    </Box>
  );
}