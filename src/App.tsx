import { ThemeProvider } from "styled-components";
import Button from "./components/button";
import { defaultTheme } from "./styles/themes/default";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Button />
            <Button />
            <Button />
            <Button />
            <Button />
            <Button />
        </ThemeProvider>
    );
}
