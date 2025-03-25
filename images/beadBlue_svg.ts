/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="21.75" height="41.24" viewBox="0 0 21.75 41.24"><path d="M10.79.65C7.4 1.52 2.85 8.11.8 12.42v16.39c2.23 4.5 6.8 10.33 10.01 11.3 3.39-.87 7.91-6.98 9.96-11.3V12.42C18.55 7.93 14 1.61 10.79.65" style="fill:#a5b3ee"/><path d="M1.05 27.45c-.04-3.94-.04-14.94-.04-14.94S4.73 3.95 10.79.93c3.47 5.06 3.12 11.81 2.52 17.8-.74 7.43-3.6 15.89-12.26 8.73Z" style="opacity:.35;fill:#fff"/><path d="M7.68 7.98c.64-.08.86.39.96.96.28 1.57-.9 10.72-1.92 11.73-.13.13-.18.21-.39.17-1.15-.23-.99-7.36-.85-8.52.14-1.08.86-4.18 2.2-4.34" style="fill:#fff;opacity:.9"/><path d="M20.54 28.88c.43-5.11.24-15.09.09-16.52-.05-.47-1.27-2.52-1.94-3.54-.78-1.17-.41.58-.09 1.53 1.21 3.77 1.9 8.93.7 12.71-6.4 20.03-17.05 7.96-16.29 9 3.35 4.59 7.34 8.14 7.93 8.05 1.51-.23 7.64-6.11 9.62-11.24Z" style="opacity:.1"/><path d="M10.87.65C7.4 1.52 2.73 8.11.62 12.42v16.39c2.29 4.5 6.96 10.81 10.25 11.78 3.48-.87 8.15-7.46 10.25-11.78V12.42C18.84 7.93 14.17 1.61 10.87.65Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:1.25px"/></svg>')}`;
export default image;