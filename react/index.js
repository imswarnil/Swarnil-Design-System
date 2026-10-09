/**
 * Im Design System — React.
 *
 * The system is classes and data attributes, so most of it needs no wrapper:
 * write <div className="im-card"> and it is a card. This layer adds only what
 * a wrapper is genuinely for — the head snippet, starting the behaviour, and
 * a few primitives whose class lists have enough variants to be worth typing.
 *
 *   import 'im-design-system/css';
 *   import { ImHead, ImScripts, Button, Badge, Card, Logo, Wrap, Cols, Col } from 'im-design-system/react';
 *
 * Written with createElement, not JSX, so it runs in any React setup
 * without a build step. Server-safe: only <ImScripts> touches the browser.
 */
import { createElement as h } from 'react';
import { headScript } from '../js/head.mjs';

export { ImScripts } from './scripts.js';

/** Joins class names, skipping anything falsy. */
export const cx = (...parts) => parts.flat(Infinity).filter(Boolean).join(' ');

/** In <head>: applies the saved theme before first paint. Put suppressHydrationWarning on <html>. */
export const ImHead = () => h('script', { dangerouslySetInnerHTML: { __html: headScript } });

/* A component that renders `as` (default `tag`), or an <a> when given href. */
const element = (tag, base) => {
	const C = ({ as, className, children, ...rest }) => h(as || (rest.href ? 'a' : tag), { className: cx(base(rest), className), ...strip(rest) }, children);
	return C;
};
// Variant props are read by `base` and never reach the DOM.
const VARIANT_PROPS = ['variant', 'size', 'block', 'icon', 'tone', 'pill', 'outline', 'plain', 'horizontal', 'wide', 'mark', 'live', 'anim', 'span', 'start'];
const strip = (props) => Object.fromEntries(Object.entries(props).filter(([k]) => !VARIANT_PROPS.includes(k)));

/** variant: primary · outline · ghost · ink · danger · brand · brand-soft — size: sm · lg — block — icon (a square icon button). */
const ButtonBase = element('button', ({ variant, size, block, icon }) => cx('im-btn', variant && `im-btn-${variant}`, size && `im-btn-${size}`, block && 'im-btn-block', icon && 'im-btn-icon'));
export const Button = (props) => h(ButtonBase, { ...(props.href || props.as ? {} : { type: 'button' }), ...props });

/** A row of joined buttons. */
export const ButtonGroup = element('div', () => 'im-btn-group');

/** tone: accent · info · success · warning · danger · outline — pill. */
export const Badge = element('span', ({ tone, pill }) => cx('im-badge', tone && `im-badge-${tone}`, pill && 'im-badge-pill'));

/** size: sm · lg — outline · plain · horizontal. Fill it with the parts below. */
export const Card = element('article', ({ size, outline, plain, horizontal }) => cx('im-card', size && `im-card-${size}`, outline && 'im-card-outline', plain && 'im-card-plain', horizontal && 'im-card-horizontal'));
export const CardMedia = element('div', () => 'im-card-media');
export const CardBody = element('div', () => 'im-card-body');
export const CardEyebrow = element('p', () => 'im-card-eyebrow');
export const CardTitle = element('h3', () => 'im-card-title');
export const CardText = element('p', () => 'im-card-text');
export const CardMeta = element('div', () => 'im-card-meta');
export const CardFooter = element('div', () => 'im-card-footer');

/** The page container: ten of the twelve columns, or all twelve with `wide`. */
export const Wrap = element('div', ({ wide }) => (wide ? 'im-wrap-wide' : 'im-wrap'));

/** The twelve-column grid. Children are <Col span={n}>; a phone stacks them. */
export const Cols = element('div', () => 'im-cols');
export const Col = ({ span, start, as, className, children, ...rest }) =>
	h(as || 'div', { 'data-span': span, 'data-start': start, className, ...strip(rest) }, children);

/**
 * The logo: the letters and the recording-light dot, as live text.
 * text (default "Swarnil") · mark (the square: first letter + dot) · size: xs…3xl
 * · live (the dot pulses) · anim: type-in · drop · reveal · morph · states
 */
export const Logo = ({ text = 'Swarnil', mark, size, live, anim, label, className, ...rest }) => {
	const split = !mark && (anim === 'type-in' || anim === 'morph') ? { 'data-im-split': 'chars' } : {};
	return h(
		'span',
		{
			className: cx('im-logo', mark && 'im-logo-mark', live && 'im-logo-live', anim && `im-logo-${anim}`, size && `im-logo-${size}`, className),
			role: 'img',
			'aria-label': label || text,
			...rest,
		},
		h('b', { className: 'im-logo-type', 'aria-hidden': 'true', ...split }, mark ? text[0] : text),
		h('i', { className: 'im-logo-dot', 'aria-hidden': 'true' }),
	);
};

/** Light ⇄ dark. Needs <ImScripts>. */
export const ThemeToggle = ({ className, children = 'Theme', ...rest }) =>
	h('button', { type: 'button', className: cx('im-btn im-btn-ghost', className), 'data-theme-toggle': '', ...rest }, children);
