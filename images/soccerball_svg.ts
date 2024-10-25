/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" id="Layer_3" width="331.49" height="331.49" viewBox="0 0 331.49 331.49"><defs><style>.cls-1,.cls-3{fill:#fff;stroke:#000;stroke-miterlimit:10;stroke-width:2px}.cls-3{fill:#1f1f1f}</style></defs><path d="M116.11 8.63s-8.29 14.6-10.76 28.2c0 0-32.1 21.6-53.09 51.22 0 0-19.97-.22-35.91 8.23 19.34-41.56 55.52-73.7 99.76-87.65Z" class="cls-1"/><path d="M215.86 28.18s-18.93 12.97-49.29 25.31c0 0-34.06-15.43-61.22-16.66 2.46-13.6 10.76-28.2 10.76-28.2C131.78 3.67 148.45 1 165.75 1c10.95 0 21.64 1.07 31.97 3.11 12.1 11.74 18.13 24.07 18.13 24.07Z" class="cls-3"/><path d="M299.68 69.81c-8.16-1.6-21.47-2.75-21.47-2.75-27.16-30.23-62.36-38.89-62.36-38.89s-6.03-12.32-18.13-24.07c41.84 8.23 78.01 32.29 101.96 65.7Z" class="cls-1"/><path d="M59.67 150.41S39.29 181.9 25.1 194.24c-11.88-8.31-23.2-23.59-24.03-24.73-.03-1.24-.05-2.5-.05-3.76 0-24.83 5.49-48.37 15.33-69.48 15.94-8.45 35.91-8.23 35.91-8.23s6.17 30.25 7.41 62.36Z" class="cls-3"/><path d="M175.44 119.64s-34.48 21.92-51.67 49.8c-9.36-5.64-64.11-19.03-64.11-19.03-1.24-32.1-7.41-62.36-7.41-62.36 20.99-29.62 53.09-51.22 53.09-51.22 27.16 1.22 61.22 16.66 61.22 16.66 9.36 30.25 8.87 66.16 8.87 66.16Z" class="cls-1"/><path d="M328.79 142.15c-5.34 5.32-11.68 23.61-11.68 23.61-.2-.2-.41-.42-.61-.65-.2-.2-.41-.44-.61-.66-.82-.87-1.65-1.78-2.5-2.72-2.28-2.5-4.69-5.22-7.1-8-.63-.71-1.24-1.43-1.87-2.14-.25-.29-.49-.58-.73-.85-.82-.93-1.6-1.87-2.4-2.79-1.95-2.29-3.87-4.55-5.66-6.68-.53-.61-1.02-1.21-1.51-1.78-2.38-2.86-4.52-5.42-6.22-7.48-.25-.31-.49-.59-.73-.88-.29-.34-.56-.68-.82-.99-.19-.24-.37-.48-.56-.68-.05-.07-.1-.14-.14-.19-.19-.22-.34-.41-.49-.59-.19-.22-.36-.42-.51-.61-.14-.17-.27-.32-.37-.46-.12-.14-.22-.25-.27-.34-.03-.02-.05-.03-.05-.05-.08-.1-.15-.17-.17-.2-.02-.02-.02 0-.02 0v-.05c0-36.44-5.56-59.89-5.56-59.89s13.31 1.16 21.47 2.75c15.06 20.97 25.31 45.62 29.11 72.33Z" class="cls-3"/><path d="M52.26 260.93s-5.12 8-6.88 17.27C18.66 249.61 2.01 211.49 1.07 169.51c.83 1.14 12.15 16.42 24.03 24.73 0 0 9.26 38.29 27.16 66.69ZM298 263.99c1.87-11.11-3.11-24.68-3.11-24.68 21.36-30.59 22.23-73.56 22.23-73.56s6.34-18.29 11.68-23.61c1.12 7.7 1.7 15.58 1.7 23.61 0 36.81-12.08 70.8-32.5 98.23Z" class="cls-1"/><path d="M140.55 315.86s-13.04 6-24.42 7.02h-.02c-27.36-8.63-51.62-24.2-70.73-44.66v-.02c1.77-9.26 6.88-17.27 6.88-17.27s23.98 15.36 55.56 17.28c0 0 16.76 23.28 32.73 37.64ZM298 263.99v.02c-15.41 20.72-35.61 37.7-58.92 49.3-8.91-.1-18.88-3.62-18.88-3.62l-.97-.12c.2-.14.41-.27.59-.41.02 0 .02-.02.03-.03h.02s.05-.03.07-.05c1.05-.75 2.01-1.65 2.8-2.7l32.63-42.37.02-.02c1.02-.48 33.53-16.11 39.5-24.68 0 0 4.98 13.56 3.11 24.68Z" class="cls-3"/><path d="M239.07 313.31c-22.08 11-46.98 17.18-73.32 17.18-17.28 0-33.97-2.67-49.63-7.61 11.39-1.02 24.42-7.02 24.42-7.02s45.39 8.06 76.79-5.3c.65-.27 1.27-.61 1.89-.99l.97.12s9.98 3.52 18.88 3.62Zm-89.95-83.03s-35.27 48.28-41.3 47.93c-31.58-1.92-55.56-17.28-55.56-17.28-17.9-28.4-27.16-66.69-27.16-66.69 14.19-12.34 34.57-43.83 34.57-43.83s54.74 13.39 64.11 19.03c0 0 17.85 49.34 25.34 60.84Zm134.65-103.33v.03c0 .07-.02.12-.03.19 0 .03 0 .07-.02.08-.02.1-.05.2-.1.31-.05.1-.1.22-.17.32-.08.12-.15.24-.24.36-.08.12-.19.24-.31.36-.15.19-.34.37-.54.58s-.42.41-.68.63c-.17.15-.34.31-.51.44-.36.29-.75.59-1.17.92s-.87.65-1.34.97q-.36.255-.75.51c-.51.36-1.04.7-1.58 1.04-.48.32-.97.63-1.5.95-.2.14-.42.27-.63.39-.31.19-.63.37-.95.56-.83.49-1.7 1-2.58 1.51-2.33 1.34-4.81 2.72-7.33 4.06-1.33.7-2.65 1.41-3.98 2.09-7.43 3.86-14.58 7.31-18.19 9.01-.34.17-.65.31-.92.44-.2.1-.39.19-.56.25-.15.07-.29.14-.41.19-.34.17-.53.25-.53.25-36.37-26.63-63.32-33.75-63.32-33.75s.49-35.91-8.87-66.16c30.35-12.34 49.29-25.31 49.29-25.31s35.2 8.65 62.36 38.89c0 0 5.56 23.45 5.56 59.89Z" class="cls-1"/><path d="m255.9 263.32-.51.66-.02.02-32.63 42.37c-.8 1.05-1.75 1.95-2.8 2.7-.02.02-.05.03-.07.05h-.02s-.02.03-.03.03c-.19.14-.39.27-.59.41-.61.37-1.24.71-1.89.99-31.39 13.36-76.79 5.3-76.79 5.3-15.98-14.36-32.73-37.64-32.73-37.64 6.03.36 41.3-47.93 41.3-47.93 31.41 3.31 77.13-6.22 77.13-6.22s16.59 21.55 29.66 39.26Z" class="cls-1"/><path d="M226.24 224.06s-45.72 9.53-77.13 6.22c-7.5-11.51-25.34-60.84-25.34-60.84 17.18-27.87 51.67-49.8 51.67-49.8s26.95 7.12 63.32 33.75c0 0 3.4 25.78-12.53 70.67Z" class="cls-3"/><path d="M317.12 165.75s-.87 42.96-22.23 73.56c-5.97 8.57-38.48 24.2-39.5 24.68l.51-.66c-13.07-17.71-29.66-39.26-29.66-39.26 15.92-44.88 12.53-70.67 12.53-70.67s.19-.08.53-.25c.12-.05.25-.12.41-.19.17-.07.36-.15.56-.25.27-.14.58-.27.92-.44 3.6-1.7 10.76-5.15 18.19-9.01 1.33-.68 2.65-1.39 3.98-2.09 2.52-1.34 5-2.72 7.33-4.06.88-.51 1.75-1.02 2.58-1.51.32-.19.65-.37.95-.56.2-.12.42-.25.63-.39.53-.32 1.02-.63 1.5-.95.54-.34 1.07-.68 1.58-1.04.25-.17.51-.34.75-.51.48-.32.92-.65 1.34-.97s.82-.63 1.17-.92c.17-.14.34-.29.51-.44.25-.22.48-.42.68-.63s.39-.39.54-.58c.12-.12.22-.24.31-.36s.15-.24.24-.36c.07-.1.12-.22.17-.32s.08-.2.1-.31c.02-.02.02-.05.02-.08.02-.05.02-.08.02-.12.02-.02.02-.03.02-.05h.02s.08.1.17.2c0 .02.02.03.05.05.05.09.15.2.27.34.1.14.24.29.37.46.15.19.32.39.51.61.15.19.31.37.49.59.03.05.09.12.14.19.19.2.37.44.56.68.25.31.53.65.82.99l.73.88c1.7 2.06 3.84 4.62 6.22 7.48.49.58.99 1.17 1.51 1.78 1.78 2.12 3.71 4.38 5.66 6.68.8.92 1.58 1.85 2.4 2.79.24.27.48.56.73.85.63.71 1.24 1.43 1.87 2.14 2.41 2.79 4.83 5.51 7.1 8 .85.93 1.68 1.85 2.5 2.72.2.22.41.46.61.66.2.22.41.44.61.65Z" class="cls-1"/><path d="M1.07 169.51c-.03-.05-.05-.07-.05-.07m327.79-27.31-.02.02" style="stroke:#000;stroke-miterlimit:10;stroke-width:2px;fill:#edebeb"/><path d="M248.9 23.51c-12.49-.44-24.27-.27-35.4.46-31.42 2.04-57.6 8.45-79.39 17.95-37.56 16.37-62.07 41.94-77.92 70.17-13.89 24.69-21.11 51.41-24.64 75.77-1.07 7.24-1.8 14.26-2.26 20.97-1.51 20.94-.56 38.74.47 49.89 29.68 43.33 79.52 71.76 136 71.76 90.98 0 164.74-73.75 164.74-164.74 0-60.65-32.78-113.64-81.59-142.23Z" style="opacity:.08"/><path d="M328.79 142.12c-2.45-17.2-7.58-33.53-14.94-48.59-2.36 20.87-5.95 39.74-10.55 56.75-12.47 46.11-32.44 78.77-55.81 101.73-36.81 36.18-82.07 48.25-119.73 50.88-22.98 1.58-43.13-.32-56.83-2.45a164 164 0 0 0 45.19 22.42h.02c15.67 4.95 32.33 7.61 49.63 7.61 26.34 0 51.24-6.19 73.32-17.18a165.34 165.34 0 0 0 58.91-49.3c20.43-27.43 32.51-61.44 32.51-98.25 0-8.02-.58-15.91-1.7-23.62Z" style="opacity:.13"/></svg>')}`;
export default image;