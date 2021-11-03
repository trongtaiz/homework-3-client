import styled from "styled-components";
import Card from "@mui/material/Card";

export const ClassWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MyCard = styled(Card)`
  height: 300px;
  width: 294px;
  border: 0.5px solid rgb(218, 220, 224);
  border-radius: 8px;
  padding: 12px;
`;
