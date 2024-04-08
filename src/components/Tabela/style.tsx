import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding: 20px 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const HeaderText = styled.div`
  flex: 1;
  margin: 6px;
  color: #f09a36;
  text-align: center;
  font-weight: bold;
`;

export const Cell = styled.div`
  flex: 1;
  margin: 6px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 8px;
`;
