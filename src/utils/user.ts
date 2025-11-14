export interface UserPersonal {
	name: string;
	firstName: string;
	lastName: string;
	age: string;
	birthday: string;
	location: string;
	city: string;
	country: string;
	timezone: string;
	bio: string;
	tagline: string;
	pronouns: string;
	occupation: string;
	company: string;
	jobTitle: string;
}

export interface UserContact {
	email: string;
	phone: string;
	website: string;
	address: string;
	postalCode: string;
}

export interface NamedLink {
	name: string;
	url: string;
}

export interface UserSocial {
	facebook: string;
	twitter: string;
	instagram: string;
	linkedin: string;
	youtube: string;
	tiktok: string;
	snapchat: string;
	pinterest: string;
	reddit: string;
	discord: string;
	twitch: string;
	github: string;
	gitlab: string;
	behance: string;
	dribbble: string;
	medium: string;
	devto: string;
	stackoverflow: string;
	telegram: string;
	whatsapp: string;
	signal: string;
	mastodon: string;
	bluesky: string;
	threads: string;
	xing: string;
	vimeo: string;
	spotify: string;
	soundcloud: string;
	bandcamp: string;
	appleMusic: string;
	patreon: string;
	koFi: string;
	buyMeACoffee: string;
	onlyfans: string;
	fansly: string;
	customSocial: NamedLink[];
}

export interface UserShop {
	etsy: string;
	shopify: string;
	bigcartel: string;
	redbubble: string;
	teepublic: string;
	society6: string;
	zazzle: string;
	cafepress: string;
	printful: string;
	gumroad: string;
	sellfy: string;
	customShop: NamedLink[];
}

export interface UserMedia {
	profileImage: string;
	coverImage: string;
	avatar: string;
	logo: string;
	banner: string;
	gallery: string[];
}

export interface UserPreferences {
	theme: string;
	language: string;
	currency: string;
	colorScheme: string;
	displayLinks?: string[];
}

export interface CustomField {
	label: string;
	value: string;
}

export interface UserCustom {
	customFields: CustomField[];
}

export interface UserMetadata {
	createdAt: string;
	updatedAt: string;
	version: string;
}

export interface UserProfile {
	personal: UserPersonal;
	contact: UserContact;
	social: UserSocial;
	shop: UserShop;
	media: UserMedia;
	preferences: UserPreferences;
	custom: UserCustom;
	metadata: UserMetadata;
}

export interface UserHeaderView {
	displayName: string;
	bio: string;
	profileImage: string;
	profileImageAlt: string;
}

const isNonEmpty = (value: string | null | undefined): value is string =>
	typeof value === "string" && value.trim().length > 0;

const buildDisplayName = (personal: UserPersonal, contact: UserContact): string => {
	if (isNonEmpty(personal.name)) {
		return personal.name.trim();
	}

	const fullName = `${personal.firstName} ${personal.lastName}`.trim();
	if (isNonEmpty(fullName)) {
		return fullName;
	}

	if (isNonEmpty(contact.email)) {
		return contact.email.trim();
	}

	return "Anonymous User";
};

const selectProfileImage = (media: UserMedia): string => {
	if (isNonEmpty(media.profileImage)) {
		return media.profileImage.trim();
	}
	if (isNonEmpty(media.avatar)) {
		return media.avatar.trim();
	}
	if (isNonEmpty(media.logo)) {
		return media.logo.trim();
	}
	return "";
};

export const mapUserToHeaderView = (user: UserProfile): UserHeaderView => {
	const displayName = buildDisplayName(user.personal, user.contact);
	const bio = isNonEmpty(user.personal.bio) ? user.personal.bio.trim() : "";
	const profileImage = selectProfileImage(user.media);

	return {
		displayName,
		bio,
		profileImage,
		profileImageAlt: profileImage
			? `${displayName}'s profile picture`
			: `${displayName} profile`,
	};
};

export interface LinkItem {
	name: string;
	url: string;
	type: "social" | "shop" | "contact" | "custom";
}

const extractLinksFromObject = (
	obj: UserSocial | UserShop | Record<string, string | NamedLink[]>,
	type: "social" | "shop" | "contact" | "custom",
): LinkItem[] => {
	const links: LinkItem[] = [];

	for (const [key, value] of Object.entries(obj)) {
		if (Array.isArray(value)) {
			// Handle customSocial and customShop arrays
			for (const link of value) {
				if (isNonEmpty(link.url)) {
					links.push({
						name: isNonEmpty(link.name) ? link.name : key,
						url: link.url.trim(),
						type,
					});
				}
			}
		} else if (typeof value === "string" && isNonEmpty(value)) {
			// Handle regular string URLs
			const url = value.trim();
			// Only include if it looks like a URL
			if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
				links.push({
					name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim(),
					url,
					type,
				});
			}
		}
	}

	return links;
};

export const extractAllLinks = (user: UserProfile): LinkItem[] => {
	const links: LinkItem[] = [];

	// Extract social links
	const socialLinks = extractLinksFromObject(user.social, "social");
	links.push(...socialLinks);

	// Extract shop links
	const shopLinks = extractLinksFromObject(user.shop, "shop");
	links.push(...shopLinks);

	// Extract contact links (website, email)
	const contactLinks: LinkItem[] = [];
	if (isNonEmpty(user.contact.website)) {
		contactLinks.push({
			name: "Website",
			url: user.contact.website.trim(),
			type: "contact",
		});
	}
	if (isNonEmpty(user.contact.email)) {
		contactLinks.push({
			name: "Email",
			url: `mailto:${user.contact.email.trim()}`,
			type: "contact",
		});
	}
	links.push(...contactLinks);

	return links;
};

export const getLinkByName = (user: UserProfile, linkName: string): LinkItem | null => {
	const normalizedName = linkName.toLowerCase().trim();

	// Check social links
	for (const [key, value] of Object.entries(user.social)) {
		if (key.toLowerCase() === normalizedName || key.toLowerCase().replace(/([A-Z])/g, " $1").toLowerCase().trim() === normalizedName) {
			if (typeof value === "string" && isNonEmpty(value)) {
				const url = value.trim();
				if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
					return {
						name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim(),
						url,
						type: "social",
					};
				}
			}
		}
		// Check customSocial array
		if (Array.isArray(value)) {
			for (const link of value) {
				if (link.name.toLowerCase() === normalizedName && isNonEmpty(link.url)) {
					return {
						name: link.name,
						url: link.url.trim(),
						type: "social",
					};
				}
			}
		}
	}

	// Check shop links
	for (const [key, value] of Object.entries(user.shop)) {
		if (key.toLowerCase() === normalizedName || key.toLowerCase().replace(/([A-Z])/g, " $1").toLowerCase().trim() === normalizedName) {
			if (typeof value === "string" && isNonEmpty(value)) {
				const url = value.trim();
				if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
					return {
						name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim(),
						url,
						type: "shop",
					};
				}
			}
		}
		// Check customShop array
		if (Array.isArray(value)) {
			for (const link of value) {
				if (link.name.toLowerCase() === normalizedName && isNonEmpty(link.url)) {
					return {
						name: link.name,
						url: link.url.trim(),
						type: "shop",
					};
				}
			}
		}
	}

	// Check contact links
	if (normalizedName === "website" && isNonEmpty(user.contact.website)) {
		return {
			name: "Website",
			url: user.contact.website.trim(),
			type: "contact",
		};
	}
	if (normalizedName === "email" && isNonEmpty(user.contact.email)) {
		return {
			name: "Email",
			url: `mailto:${user.contact.email.trim()}`,
			type: "contact",
		};
	}

	return null;
};


