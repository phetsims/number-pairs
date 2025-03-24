/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="21" height="40.98" viewBox="0 0 21 40.98"><path d="M10.41.52C7.03 1.39 2.48 7.98.43 12.29v16.39c2.23 4.5 6.8 10.33 10.01 11.3 3.39-.87 7.91-6.98 9.96-11.3V12.29C18.17 7.8 13.62 1.48 10.41.52" style="fill:#ffee8c"/><path d="M.67 27.32C.63 23.38.63 12.38.63 12.38S4.36 3.82 10.41.8c3.47 5.06 3.12 11.81 2.52 17.8-.74 7.43-3.6 15.89-12.26 8.73Z" style="opacity:.35;fill:#fff"/><path d="M7.3 7.85c.64-.08.86.39.96.96.28 1.57-.9 10.72-1.92 11.73-.13.13-.18.21-.39.17-1.15-.23-.99-7.36-.85-8.52.14-1.08.86-4.18 2.2-4.34" style="fill:#fff;opacity:.9"/><path d="M20.17 29c.43-5.11.14-11.56.09-16.52-.01-1.26-1.61-2.36-1.94-3.54-.4-1.18-.41.58-.09 1.53 1.21 3.77 1.19 8.77.7 12.71-6.79 19.98-20.39 3.28-16.29 9 3.31 4.61 6.35 8.05 7.93 8.05 1.86 0 7.64-6.11 9.62-11.24Z" style="opacity:.1"/><path d="M10.5.52C7.02 1.39 2.35 7.98.25 12.29v16.39c2.29 4.5 6.96 10.81 10.25 11.78 3.48-.87 8.15-7.46 10.25-11.78V12.29C18.46 7.8 13.79 1.48 10.5.52Z" style="fill:none;stroke:#000;stroke-miterlimit:10"/></svg>')}`;
export default image;