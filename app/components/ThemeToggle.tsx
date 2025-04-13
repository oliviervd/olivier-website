import {useTheme} from "@/app/context/ThemeProvider";
import {JSX} from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

export function ThemeToggle(): JSX.Element {
    // @ts-ignore
    const {theme, toggleTheme} = useTheme()

    return (
        <a className={"typo_header"} onClick={toggleTheme}>{theme === 'light' ? 'dark' : 'light'}</a>
    )
}