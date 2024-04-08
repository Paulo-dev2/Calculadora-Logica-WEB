import styled from 'styled-components';

const buttonWidth = "25%";

export const ButtonText = styled.span<{ theme?: { [key: string]: string } }>`
  color: ${({ theme }) => theme && theme.theme === "secondary" ? "#060606" : "#fff"};
  font-size: 25px;
`;

export const ButtonContainer = styled.button<{ theme?: { [key: string]: string } }>`
  background-color: ${({ theme }) => theme && theme.theme === "accent" ? "#f09a36" : theme && theme.theme === "secondary" ? "#a6a6a6" : "#333333"};
  flex: 1;
  height: 50px; /* Ajuste conforme necessário */
  width: ${buttonWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 25px; /* Ajuste conforme necessário */
  margin: 5px;
  cursor: pointer;
`;

export const DoubleButtonContainer = styled(ButtonContainer)`
  width: calc(${buttonWidth} * 2);
  align-items: flex-start;
  padding-left: 20px; /* Ajuste conforme necessário */
`;
