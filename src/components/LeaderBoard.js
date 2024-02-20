import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboardData } from "../store/store";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const leaderboardData = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchLeaderboardData());
  }, [dispatch]);

  return (
    <Main>
      <Header>Leaderboard</Header>
      <Table>
        <thead>
          <tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Score</Th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((user, index) => (
              <tr key={index}>
                <TdRank>{index + 1}</TdRank>
                <TdName>{user.name}</TdName>
                <TdScore>{user.score}</TdScore>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="3">
                <NoDataMessage>
                  No users found in the leaderboard.
                </NoDataMessage>
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Main>
  );
};

export default LeaderBoard;

const Main = styled.main`
  min-height: 100vh;
  background: url("/images/leaderboardbg.png") center center / cover no-repeat
    fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 36px;
  color: #4caf50;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 80%;
  max-width: 800px;
  margin-top: 30px;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Th = styled.th`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  text-align: left;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f2f2f2;
`;

const TdRank = styled(Td)`
  color: #4caf50;
  font-weight: bold;
`;

const TdName = styled(Td)`
  color: #ffff;
  font-weight: bold;
`;

const TdScore = styled(Td)`
  color: #ff9800;
  font-weight: bold;
`;

const NoDataMessage = styled.p`
  font-size: 18px;
  color: #666;
  font-weight: 600;
  margin: 20px;
`;
