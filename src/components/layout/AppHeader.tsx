import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api";
import { mapUserToHeaderView, type UserHeaderView, type UserProfile } from "../../utils/user";
import { ProfilePicture } from "../ui/ProfilePicture";
import { DarkModeToggle } from "../ui/DarkModeToggle";

export function AppHeader() {
	const [headerView, setHeaderView] = useState<UserHeaderView | null>(null);

	useEffect(() => {
		const loadUser = async () => {
			try {
				const user = await fetchJson<UserProfile>("/data/user.json");
				setHeaderView(mapUserToHeaderView(user));
			} catch (err) {
				console.error("Failed to load user profile", err);
			}
		};

		void loadUser();
	}, []);

	if (!headerView) {
		return null;
	}

	return (
		<header className="layout-header">
			<DarkModeToggle />
			<div className="profile-section">
				{headerView.profileImage && (
					<ProfilePicture
						src={headerView.profileImage}
						alt={headerView.profileImageAlt}
						size={256}
						border={true}
						borderWidth={4}
					/>
				)}
				<h1 className="profile-name text-h1 text-color-primary">{headerView.displayName}</h1>
				{headerView.bio && <p className="profile-bio">{headerView.bio}</p>}
			</div>
		</header>
	);
}

