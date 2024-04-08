import { ButtonContainer, ButtonText, DoubleButtonContainer } from "./style";

interface ButtonProps  {
    onClick: () => void; // Corrigindo o nome da propriedade e o tipo
    text: string;
    size?: "double";
    theme?: "secondary" | "accent";
}

export const Button = ({ onClick, text, size, theme } : ButtonProps) => {

    const ButtonComponent = size === "double" ? DoubleButtonContainer : ButtonContainer;

    return (
        <ButtonComponent theme={theme ? { theme } : undefined} onClick={onClick}>
            <ButtonText theme={theme ? { theme } : undefined}>{text}</ButtonText>
        </ButtonComponent>
    );
};
