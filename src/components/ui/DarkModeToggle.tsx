import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "knotly-theme";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") {
		return "light";
	}

	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	if (stored === "light" || stored === "dark") {
		return stored;
	}

	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
}

export function DarkModeToggle() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;

		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		window.localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<button
			type="button"
			className="dark-mode-toggle"
			onClick={toggleTheme}
			aria-label="Toggle dark mode"
		>
			<img
				src={theme === "dark" ? "/icons/moon.svg" : "/icons/sun.svg"}
				alt={theme === "dark" ? "Dark mode" : "Light mode"}
				className={`dark-mode-toggle-icon ${theme === "dark" ? "dark-mode-toggle-moon" : "dark-mode-toggle-sun"}`}
			/>
		</button>
	);
}


