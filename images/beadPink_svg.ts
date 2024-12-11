/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="22.04" height="42.78" viewBox="0 0 22.04 42.78"><path d="M11.12.39C7.51 1.31 2.67 8.23.48 12.77V30c2.38 4.73 7.22 11.37 10.64 12.38 3.61-.92 8.46-7.85 10.64-12.38V12.77C19.39 8.04 14.55 1.4 11.12.39" style="fill:#ffa2e8"/><path d="M.74 29.14C.36 24.94.45 13.05.45 13.05c0-.01 4.22-9.49 10.57-12.66 3.63 5.32 2.94 12.9 2.31 19.19-.78 7.81-3.52 17.09-12.58 9.56Z" style="fill:#fff;opacity:.2"/><path d="M7.7 8.1c.66-.08.89.41 1 1.01.29 1.65-.93 11.27-1.99 12.33-.14.14-.18.22-.41.18-1.19-.25-1.03-7.74-.88-8.95.14-1.13.89-4.4 2.28-4.57" style="fill:#fff;opacity:.4"/><path d="M21.66 29.96c.46-5.37.05-11.97 0-17.19-.01-1.32-1.86-2.6-2.21-3.83-.42-1.24-.61.76-.27 1.76 1.28 3.96 1.25 9.22.73 13.37-7.17 21.01-21.76 3.69-17.38 9.67 3.11 4.25 6.82 8.65 8.49 8.65 1.97 0 8.56-7.04 10.64-12.43" style="opacity:.2"/><path d="m11.01 42.78-.1-.03C7.22 41.65 2.33 34.74.04 30.17L0 30.01l.04-17.4C2.27 7.96 7.13.99 10.93.03l.1-.03.1.03C14.82 1.12 19.71 8.04 22 12.6l.04.17-.04 17.4c-2.24 4.64-7.09 11.62-10.89 12.58zM.75 29.92C3.31 34.99 7.93 40.99 11.03 42c3.49-.99 8.15-7.73 10.26-12.08V12.86C18.72 7.79 14.11 1.79 11.01.78 7.52 1.77 2.86 8.51.75 12.86z"/></svg>')}`;
export default image;