/**
 * <Icon name="arrow-right" /> — every icon the system draws (Lucide, ISC;
 * brand marks from Simple Icons, CC0). A separate entry so an app that does
 * not use it does not carry it:  import { Icon } from 'im-design-system/react/icon';
 */
import { createElement as h } from 'react';
import { icons } from './icons.js';

export const iconNames = Object.keys(icons);

export const Icon = ({ name, label, className, ...rest }) => {
	const svg = icons[name];
	if (!svg) return null;
	return h('span', {
		className,
		role: label ? 'img' : undefined,
		'aria-label': label,
		'aria-hidden': label ? undefined : 'true',
		style: { display: 'inline-flex' },
		dangerouslySetInnerHTML: { __html: svg },
		...rest,
	});
};
