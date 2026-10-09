import type { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from 'react';

type As = { as?: ElementType; href?: string; className?: string; children?: ReactNode } & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'> & Record<string, unknown>;

export declare const cx: (...parts: unknown[]) => string;
export declare const ImHead: FC;
export declare const ImScripts: FC<{ features?: Array<'core' | 'motion' | 'charts' | 'media' | 'code' | 'view' | 'content' | 'ads'> }>;

export declare const Button: FC<As & { variant?: 'primary' | 'outline' | 'ghost' | 'ink' | 'danger' | 'brand' | 'brand-soft'; size?: 'sm' | 'lg'; block?: boolean; icon?: boolean; type?: 'button' | 'submit' | 'reset' }>;
export declare const ButtonGroup: FC<As>;
export declare const Badge: FC<As & { tone?: 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'outline'; pill?: boolean }>;

export declare const Card: FC<As & { size?: 'sm' | 'lg'; outline?: boolean; plain?: boolean; horizontal?: boolean }>;
export declare const CardMedia: FC<As>;
export declare const CardBody: FC<As>;
export declare const CardEyebrow: FC<As>;
export declare const CardTitle: FC<As>;
export declare const CardText: FC<As>;
export declare const CardMeta: FC<As>;
export declare const CardFooter: FC<As>;

export declare const Wrap: FC<As & { wide?: boolean }>;
export declare const Cols: FC<As>;
export declare const Col: FC<As & { span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; start?: number }>;

export declare const Logo: FC<{
	text?: string;
	mark?: boolean;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
	live?: boolean;
	anim?: 'type-in' | 'drop' | 'reveal' | 'morph' | 'states';
	label?: string;
	className?: string;
}>;
export declare const ThemeToggle: FC<As>;
