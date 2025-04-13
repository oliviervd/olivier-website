'use client'
import {useContext, useState, useEffect, createContext} from "react"
const ThemeContext = createContext('light')

// @ts-ignore
export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {

        // Dynamically set CSS variables in :root
        if (theme === "light") {
            document.documentElement.style.setProperty("--bg-color", "#ffffff");
            document.documentElement.style.setProperty("--text-color", "#000000");
            document.documentElement.style.setProperty("--highlight-color", "#000000");
        } else {
            document.documentElement.style.setProperty("--bg-color", "#000000");
            document.documentElement.style.setProperty("--text-color", "#ffffff");
            document.documentElement.style.setProperty("--highlight-color", "#000000");
        }

        // Apply the theme class to the <body> element
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

    // @ts-ignore
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div className={`app ${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}

