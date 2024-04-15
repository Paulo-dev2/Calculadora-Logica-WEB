import styled from 'styled-components';

// Define a largura máxima para o ContainerResult e o Calculator
const maxWidth = "600px";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #202020;
`;

export const ContainerResult = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-bottom: 8px;
  background-color: #333;
  max-width: ${maxWidth};
  width: 90%; // Adapta-se ao tamanho do Container
  padding: 15px;
`;

export const Result = styled.input`
  text-align: left;
  color: #fff;
  background-color: #333;
  border: none;
  width: 100%;
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
  margin-top: 20px;
  width: 25vw;
  padding: 15px;
  background-color: #333333;
  border-radius: 30px
`;
