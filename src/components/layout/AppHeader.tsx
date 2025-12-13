import { useEffect, useState } from "react";
import { fetchJson } from "../../utils/api";
import { mapUserToHeaderView, type UserHeaderView, type UserProfile } from "../../utils/user";
import { ProfilePicture } from "../ui/ProfilePicture";
import { DarkModeToggle } from "../ui/DarkModeToggle";

export interface AppHeaderProps {
	textBorder?: boolean;
	titleColor?: string;
	bioColor?: string;
}

export function AppHeader({ textBorder = false, titleColor = "#8B6F5E", bioColor = "#F5C2C7" }: AppHeaderProps = {}) {
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
						border={false}
					/>
				)}
				<h1 
					className={`profile-name text-h1 ${textBorder ? 'profile-name-bordered' : ''}`}
					style={{ color: titleColor }}
				>
					{headerView.displayName}
				</h1>
				{headerView.bio && (
					<p 
						className={`profile-bio ${textBorder ? 'profile-bio-bordered' : ''}`}
						style={{ color: bioColor }}
					>
						{headerView.bio}
					</p>
				)}
			</div>
		</header>
	);
}

