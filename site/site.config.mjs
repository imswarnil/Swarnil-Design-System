/**
 * The docs site's identity and sidebar.
 *
 * NAME appears nowhere else — rename the product here.
 */
export const NAME = 'Im Design System';
export const SHORT = 'Im';

export const site = {
	title: SHORT,
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
		{ label: 'Journal', url: '/components/post-card/' },
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

/** `icon` is a file in partials/icons/ (a Lucide name). */
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
			{ label: 'Swiss grid', url: '/layout/swiss/' },
			{ label: 'Divider', url: '/layout/divider/' },
		],
	},
	{
		title: 'Navigation',
		icon: 'navigation',
		items: [
			{ label: 'Navbar', url: '/navigation/navbar/' },
			{ label: 'Sidebar', url: '/navigation/sidebar/' },
			{ label: 'Dropdown menu', url: '/navigation/menu/' },
			{ label: 'Table of contents', url: '/navigation/toc/' },
			{ label: 'Breadcrumb', url: '/navigation/breadcrumb/' },
			{ label: 'Pagination', url: '/navigation/pagination/' },
			{ label: 'Course curriculum', url: '/navigation/curriculum/' },
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
			{ label: 'Post card', url: '/components/post-card/' },
			{ label: 'Widgets', url: '/components/widgets/' },
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
			{ label: 'A full article', url: '/content/article/' },
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
		title: 'Guides',
		icon: 'book-open',
		items: [
			{ label: 'Add a token', url: '/guides/add-a-token/' },
			{ label: 'Add a component', url: '/guides/add-a-component/' },
			{ label: 'Add a section', url: '/guides/add-a-section/' },
			{ label: 'Provenance & licences', url: '/provenance/' },
		],
	},
];
