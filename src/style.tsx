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

  @media (max-width: 600px) {
    padding: 10px;
  }

  @media (max-width: 400px) {
    padding: 8px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
`;

export const Result = styled.input`
  text-align: left;
  color: #fff;
  background-color: #333;
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 25px;

  @media (max-width: 600px) {
    font-size: 20px;
    padding: 8px;
  }

  @media (max-width: 400px) {
    font-size: 18px;
    padding: 6px;
  }
`;

export const ContainerTitle = styled.div`
  text-align: center;
  padding: 10px;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    padding: 8px;
  }

  @media (max-width: 400px) {
    padding: 6px;
  }
`;

export const Title = styled.p`
  font-size: 25px;
  color: #fff;

  @media (max-width: 600px) {
    font-size: 22px;
  }

  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

export const Calculator = styled.div`
  margin-top: 20px;
  width: 25vw;
  height: 60vh;
  padding: 15px;
  background-color: #333333;
  border-radius: 30px;

  @media (max-width: 1200px) {
    width: 40vw;
    height: 65vh;
  }

  @media (max-width: 900px) {
    width: 60vw;
    height: 60vh;
  }

  @media (max-width: 600px) {
    width: 80vw;
    height: 55vh;
    padding: 10px;
  }

  @media (max-width: 400px) {
    width: 90vw;
    height: 50vh;
    padding: 8px;
    border-radius: 20px;
  }
`;
