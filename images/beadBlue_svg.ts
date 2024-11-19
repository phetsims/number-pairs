/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="21.79" height="41.99" viewBox="0 0 21.79 41.99"><path d="M10.89.26C7.28 1.17 2.44 8.01.25 12.49v17.02c2.38 4.67 7.22 11.23 10.64 12.23 3.61-.91 8.46-7.75 10.64-12.23V12.49C19.16 7.82 14.31 1.26 10.89.26" style="fill:#83bdff"/><path d="M.62 28.65C.24 24.5.33 12.76.33 12.76c-.01 0 4.22-9.37 10.56-12.5C14.52 5.51 13.83 13 13.2 19.21c-.78 7.72-3.52 16.88-12.58 9.44" style="fill:#fff;opacity:.2"/><path d="M7.57 7.87c.66-.08.89.4 1 1C8.86 10.5 7.64 20 6.58 21.05c-.14.14-.18.22-.41.18-1.19-.24-1.03-7.64-.88-8.84.14-1.12.89-4.34 2.28-4.51Z" style="fill:#fff;opacity:.4"/><path d="M21.54 29.46c.46-5.31.05-11.82 0-16.98-.01-1.31-1.86-2.56-2.21-3.79-.42-1.22-.61.75-.27 1.74 1.28 3.91 1.25 9.11.73 13.2-7.17 20.75-21.76 3.65-17.38 9.55 3.11 4.2 6.82 8.54 8.49 8.54 1.97 0 8.56-6.95 10.64-12.27Z" style="opacity:.2"/><path d="M10.89.26C7.28 1.17 2.44 8.01.25 12.49v17.02c2.38 4.67 7.22 11.23 10.64 12.23 3.61-.91 8.46-7.75 10.64-12.23V12.49C19.16 7.82 14.31 1.26 10.89.26Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:.5px"/></svg>')}`;
export default image;