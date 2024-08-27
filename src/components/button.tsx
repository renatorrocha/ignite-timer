import { ButtonContainer, ButtonVariant } from "./button.styles";

interface ButtonProps {
    variant?: ButtonVariant;
}

export default function Button({ variant = "primary" }: ButtonProps) {
    return <ButtonContainer variant={variant}>Button</ButtonContainer>;
}
