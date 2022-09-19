import {platform} from 'node:process';

export const isMac = platform === 'darwin';
export const isWindows = platform === 'win32';
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isNode
    = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

const isWebWorker
    = typeof self === 'object'
    && self.constructor
    && self.constructor.name === 'DedicatedWorkerGlobalScope';

/**
 * @see https://github.com/jsdom/jsdom/releases/tag/12.0.0
 * @see https://github.com/jsdom/jsdom/issues/1537
 */
const isJsDom
    = (typeof window !== 'undefined' && window.name === 'nodejs')
    || (typeof navigator !== 'undefined'
        && (navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom')));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const isDeno = typeof Deno !== 'undefined' && typeof Deno.core !== 'undefined';

export {isBrowser, isWebWorker, isNode, isJsDom, isDeno};
