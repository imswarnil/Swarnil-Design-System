/**
 * The docs site's identity and sidebar.
 *
 * NAME appears nowhere else — rename the product here.
 */
export const NAME = 'Im Design System';
export const SHORT = 'Im';

export const site = {
	title: NAME,
	description: 'A Tailwind design system for Ghost themes: tokens, layout, components and ready-made sections.',
	locale: 'en',
	accent_color: '#ff5a1f',
	members_enabled: true,
	logo: null,
	cover_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1140&h=1425&q=80',
	github: 'imswarnil',
	twitter: '@imswarnil',
	youtube: '@imswarnil',
	instagram: 'imswarnil',
	// What Ghost would hand {{navigation}} — used by the navbar examples.
	navigation: [
		{ label: 'Home', url: '/' },
		{ label: 'Journal', url: '/collections/post/' },
		{ label: 'Videos', url: '/sections/home-hero-full/' },
		{ label: 'Projects', url: '/components/card/' },
		{ label: 'About', url: '/getting-started/' },
	],
	secondary_navigation: [
		{ label: 'Newsletter', url: '/components/forms/' },
		{ label: 'Colophon', url: '/provenance/' },
		{ label: 'RSS', url: '/components/icons/' },
	],
};

/** `icon` is a file in partials/icons/ (a Lucide name).
 *  An item with `children` is a group INSIDE a group — one more level of the
 *  tree, for a family of pages (a collection) that belongs under one name. */
export const navigation = [
	{
		items: [
			{ label: 'Home', url: '/', icon: 'house' },
			{ label: 'Getting started', url: '/getting-started/', icon: 'rocket' },
		],
	},
	{
		title: 'Foundation',
		icon: 'layers',
		items: [
			{ label: 'Principles', url: '/foundation/principles/' },
			{ label: 'Logo', url: '/foundation/logo/' },
			{ label: 'Color', url: '/foundation/color/' },
			{ label: 'Typography', url: '/foundation/typography/' },
			{ label: 'Space, radius, shadow', url: '/foundation/space/' },
			{ label: 'Patterns', url: '/foundation/patterns/' },
		],
	},
	{
		title: 'Layout',
		icon: 'layout-grid',
		items: [
			{ label: 'Shell', url: '/layout/shell/' },
			{ label: 'Containers & grid', url: '/layout/grid/' },
			{ label: 'Footer', url: '/layout/footer/' },
			{ label: 'Divider', url: '/layout/divider/' },
		],
	},
	{
		title: 'Navigation',
		icon: 'navigation',
		items: [
			{ label: 'Navbar', url: '/navigation/navbar/' },
			{ label: 'Menu panel', url: '/navigation/panel/' },
			{ label: 'Mega menu', url: '/navigation/mega/' },
			{ label: 'Sidebar', url: '/navigation/sidebar/' },
			{ label: 'Dropdown menu', url: '/navigation/menu/' },
			{ label: 'Table of contents', url: '/navigation/toc/' },
			{ label: 'Breadcrumb', url: '/navigation/breadcrumb/' },
			{ label: 'Pagination', url: '/navigation/pagination/' },
		],
	},
	{
		title: 'Components',
		icon: 'component',
		items: [
			{ label: 'Button', url: '/components/button/' },
			{ label: 'Social & share', url: '/components/share/' },
			{ label: 'Avatar', url: '/components/avatar/' },
			{ label: 'Badge & tag', url: '/components/badge/' },
			{ label: 'Callout', url: '/components/callout/' },
			{ label: 'Card', url: '/components/card/' },
			{ label: 'Widgets', url: '/components/widgets/' },
			{ label: 'Ads & sponsors', url: '/components/ads/' },
			{ label: 'Accordion & tabs', url: '/components/disclosure/' },
			{ label: 'Switch & switcher', url: '/components/switch/' },
			{ label: 'Tooltip & hover card', url: '/components/tooltip/' },
			{ label: 'Dialog', url: '/components/dialog/' },
			{ label: 'Progress', url: '/components/progress/' },
			{ label: 'Skeleton & lazy load', url: '/components/loading/' },
			{ label: 'Stats & charts', url: '/components/stats/' },
			{ label: 'Timeline', url: '/components/timeline/' },
			{ label: 'Code', url: '/components/code/' },
			{ label: 'Icons', url: '/components/icons/' },
		],
	},
	{
		title: 'Media',
		icon: 'images',
		items: [
			{ label: 'Gallery & lightbox', url: '/media/gallery/' },
			{ label: 'Video & timestamps', url: '/media/video/' },
			{ label: 'Backgrounds & blends', url: '/media/backgrounds/' },
			{ label: 'Carousel', url: '/components/carousel/' },
			{ label: 'Marquee', url: '/components/marquee/' },
		],
	},
	{
		title: 'Content',
		icon: 'file-text',
		items: [
			{ label: 'Text & lists', url: '/content/text/' },
			{ label: 'Quotes, tables & notes', url: '/content/blocks/' },
			{ label: 'Media cards', url: '/content/media/' },
			{ label: 'Editor cards', url: '/content/cards/' },
			{ label: 'Mockups', url: '/content/mockups/' },
		],
	},
	{
		title: 'Forms',
		icon: 'clipboard-list',
		items: [
			{ label: 'Inputs', url: '/forms/inputs/' },
			{ label: 'Checkbox, radio & choice', url: '/forms/choices/' },
			{ label: 'Select, range & file', url: '/forms/controls/' },
			{ label: 'Form layout & states', url: '/forms/layout/' },
		],
	},
	{
		title: 'Motion',
		icon: 'zap',
		items: [
			{ label: 'Animation', url: '/motion/animation/' },
			{ label: 'Entrances', url: '/motion/entrances/' },
			{ label: 'Page transitions', url: '/motion/transitions/' },
			{ label: 'Interaction', url: '/motion/micro/' },
		],
	},
	{
		title: 'Effects',
		icon: 'wand-sparkles',
		items: [
			{ label: 'Text effects', url: '/effects/text/' },
			{ label: 'Image effects', url: '/effects/image/' },
			{ label: 'Border effects', url: '/effects/border/' },
		],
	},
	{
		title: 'Sections',
		icon: 'rows-3',
		items: [
			{ label: 'All sections', url: '/sections/' },
			{ label: 'Home hero, full', url: '/sections/home-hero-full/' },
			{ label: 'Stats band', url: '/sections/stats-band/' },
		],
	},
	{
		title: 'Collections',
		icon: 'library',
		items: [
			{
				label: 'Post',
				icon: 'newspaper',
				children: [
					{ label: 'Post collection', url: '/collections/post/' },
					{ label: 'Post card', url: '/collections/post/card/' },
					{ label: 'Post single', url: '/collections/post/single/' },
					{ label: 'Post page', url: '/collections/post/article/' },
				],
			},
			{
				label: 'Project',
				icon: 'folder',
				children: [
					{ label: 'Project collection', url: '/collections/project/' },
					{ label: 'Project card', url: '/collections/project/card/' },
					{ label: 'Project page', url: '/collections/project/page/' },
					{ label: 'Project log', url: '/collections/project/log/' },
				],
			},
			{
				label: 'Series',
				icon: 'square-play',
				children: [
					{ label: 'Series collection', url: '/collections/series/' },
					{ label: 'Episode page', url: '/collections/series/episode/' },
				],
			},
			{
				label: 'Course',
				icon: 'graduation-cap',
				children: [
					{ label: 'Course collection', url: '/collections/course/' },
					{ label: 'Curriculum', url: '/collections/course/curriculum/' },
					{ label: 'Lesson page', url: '/collections/course/lesson/' },
				],
			},
			{
				label: 'Shop',
				icon: 'wallet',
				children: [
					{ label: 'Shop collection', url: '/collections/shop/' },
					{ label: 'Product page', url: '/collections/shop/product/' },
				],
			},
			{
				label: 'Newsletter',
				icon: 'mail',
				children: [
					{ label: 'Newsletter', url: '/collections/newsletter/' },
					{ label: 'Letter page', url: '/collections/newsletter/issue/' },
				],
			},
			{
				label: 'Uses',
				icon: 'package',
				children: [
					{ label: 'Uses collection', url: '/collections/uses/' },
					{ label: 'Uses card', url: '/collections/uses/card/' },
					{ label: 'Product page', url: '/collections/uses/page/' },
				],
			},
			{ label: 'Timeline', url: '/collections/timeline/', icon: 'git-commit-vertical' },
			{ label: 'Archive', url: '/collections/archive/', icon: 'library' },
			{
				label: 'Snippet',
				icon: 'code',
				children: [
					{ label: 'Snippet collection', url: '/collections/snippets/' },
					{ label: 'Snippet card', url: '/collections/snippets/card/' },
					{ label: 'Snippet page', url: '/collections/snippets/page/' },
				],
			},
			{
				label: 'Prompt',
				icon: 'sparkles',
				children: [
					{ label: 'Prompt collection', url: '/collections/prompts/' },
					{ label: 'Prompt card', url: '/collections/prompts/card/' },
					{ label: 'Prompt page', url: '/collections/prompts/page/' },
				],
			},
			{
				label: 'Travel',
				icon: 'map-pin',
				children: [
					{ label: 'Travel collection', url: '/collections/travel/' },
					{ label: 'Trip card', url: '/collections/travel/card/' },
					{ label: 'Trip page', url: '/collections/travel/trip/' },
				],
			},
			{
				label: 'Experience',
				icon: 'compass',
				children: [
					{ label: 'Experience collection', url: '/collections/experience/' },
					{ label: 'Experience card', url: '/collections/experience/card/' },
					{ label: 'Experience page', url: '/collections/experience/page/' },
				],
			},
			{
				label: 'Bucket list',
				icon: 'square-check',
				children: [
					{ label: 'Bucket collection', url: '/collections/wishlist/' },
					{ label: 'Bucket card', url: '/collections/wishlist/card/' },
					{ label: 'Bucket page', url: '/collections/wishlist/page/' },
				],
			},
			{
				label: 'Tag',
				icon: 'tag',
				children: [
					{ label: 'All tags', url: '/collections/tag/' },
					{ label: 'Tag page', url: '/collections/tag/page/' },
				],
			},
			{
				label: 'Video',
				icon: 'video',
				children: [
					{ label: 'Video collection', url: '/collections/video/' },
					{ label: 'Video card', url: '/collections/video/card/' },
					{ label: 'Video page', url: '/collections/video/page/' },
					{ label: 'Playlist page', url: '/collections/video/playlist/' },
					{ label: 'Short (9:16)', url: '/collections/video/short/' },
				],
			},
		],
	},
	{
		title: 'Pages',
		icon: 'file-text',
		items: [
			{ label: 'Home', url: '/pages/home/' },
			{ label: 'About', url: '/pages/about/' },
			{ label: 'Résumé', url: '/pages/resume/' },
			{ label: 'Guestbook', url: '/pages/guestbook/' },
			{ label: 'Now', url: '/pages/now/' },
			{ label: 'Contact', url: '/pages/contact/' },
			{ label: 'Membership', url: '/pages/membership/' },
			{ label: 'Sign in / Sign up', url: '/pages/auth/' },
			{ label: 'Forgot password', url: '/pages/reset/' },
			{ label: 'Sitemap', url: '/pages/sitemap/' },
		],
	},
	{
		title: 'Guides',
		icon: 'book-open',
		items: [
			{ label: 'Add a token', url: '/guides/add-a-token/' },
			{ label: 'Add a component', url: '/guides/add-a-component/' },
			{ label: 'Add a section', url: '/guides/add-a-section/' },
			{ label: 'Helpers & utilities', url: '/guides/helpers/' },
			{ label: 'Provenance & licences', url: '/provenance/' },
		],
	},
];
