import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: #202020;
`;

export const ContainerResult = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-bottom: 8px;
  background-color: #333; // adiciona uma cor de fundo
`;

export const Result = styled.input`
  text-align: left;
  color: #fff;
  background-color: #333; // adiciona uma cor de fundo
  border: none; // remove a borda
  width: 100%; // faz o input ocupar toda a largura disponível
  max-width: 90%;
  padding: 10px;
  font-size: 25px;
`;


export const ContainerTitle = styled.div`
  text-align: center;
  padding: 10px;
  margin-bottom: 8px;
`;

export const Title = styled.p`
  font-size: 25px;
  color: #fff;
`;

export const Calculator = styled.div`
  width: 20vw;
  padding: 15px;
  background-color: #333333;
  border-radius: 30px
`;
