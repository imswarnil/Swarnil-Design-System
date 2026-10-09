'use client';
/**
 * <ImScripts /> — starts the system's behaviour once the page is in the
 * browser. Put it once, in the root layout. Markup rendered later (a client
 * route, a list that grows) is picked up by the scripts on their own.
 *
 *   <ImScripts features={['core', 'motion', 'charts']} />
 */
import { useEffect } from 'react';
import { start } from '../client.js';

export function ImScripts({ features = ['core', 'motion'] }) {
	const key = features.join(',');
	useEffect(() => {
		start(key.split(','));
	}, [key]);
	return null;
}
