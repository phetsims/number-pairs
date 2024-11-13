/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="3.54in" height="3.37in" viewBox="0 0 255.19 242.78"><defs><style>.cls-2{fill:none}.cls-6{fill:#e5e5e5}.cls-10{fill:#666}.cls-2{stroke:#000;stroke-miterlimit:10}.cls-13{fill:#b2b2b2}</style></defs><g style="isolation:isolate"><g id="Layer_1"><path d="M246.59 48.03c-.15 0-.29.03-.44.1l-3.18.1V.35H28.02L.5 27.87v214.41h214.14V242h.27l28.06-28.06v-27.05l3.62-.1v-.09c4.47 0 8.1-31.04 8.1-69.33s-3.63-69.34-8.1-69.34" style="fill:#ffb3d9"/><path d="m49.76 88.3-.51.51" style="fill:none"/><g style="mix-blend-mode:multiply;opacity:.5"><path d="M246.17 48.13c.14-.07.28-.1.42-.1 4.47 0 8.1 31.04 8.1 69.34s-3.63 69.33-8.1 69.33c-3.03 0-5.67-14.3-7.06-35.46-.65-10.01-1.03-21.57-1.03-33.87 0-1.76 0-3.5.02-5.23.09-10.12.43-19.63.98-28.08 1.22-19.07 3.46-32.69 6.08-35.49.19-.21.39-.36.59-.44m4.63 67.11-1.41-29.29-2.34 2.94-1.22 30.92.68 27.93 2.88-3.21z" style="fill:#f1f1f1"/><path d="m249.39 85.95 1.41 29.29-1.41 29.29-2.88 3.21-.68-27.93 1.22-30.92z" class="cls-10"/><path d="m242.97 48.23 3.2-.1c-.2.08-.4.23-.59.44-2.62 2.8-4.86 16.42-6.08 35.49-.55 8.45-.89 17.96-.98 28.08-.01 1.73-.02 3.47-.02 5.23 0 12.3.38 23.86 1.03 33.87 1.39 21.16 4.03 35.46 7.06 35.46v.09l-3.62.1-10.54.26v.09c-4.48-.05-8.09-31.07-8.09-69.33s3.62-69.33 8.09-69.33 10.54-.35 10.54-.35" class="cls-13"/><path d="M232.43 48.57c-4.47.01-8.09 31.05-8.09 69.34s3.61 69.28 8.08 69.33v-.09l10.55-.26v27.05L214.91 242h-.27V28.69L242.97.35v47.88z" class="cls-6"/><path d="m242.97.35-28.33 28.34v-.55H.5v-.27L28.02.35zM182.9 15.9c11.42-1.25 18.31-2.87 18.31-4.64 0-3.72-30.69-6.79-69.83-7.11-2.27-.02-4.57-.03-6.89-.03-42.37 0-76.72 3.2-76.72 7.14 0 1.64 5.9 3.15 15.83 4.35 12.62 1.53 31.76 2.58 53.55 2.77 2.42.02 4.86.03 7.34.03 23.39 0 44.34-.98 58.41-2.51" class="cls-6"/><path d="M214.64 242v.28H.5V28.14h214.14zm-34.47-106.25v-.27c-.14-38.18-29.58-69.46-67.02-72.5-1.98-.16-3.97-.24-5.99-.24-40.23 0-72.86 32.54-73.01 72.74v.27c0 40.33 32.69 73.02 73.01 73.02a74 74 0 0 0 7.89-.42 86 86 0 0 0 3.17-.41c.12-.02.24-.04.35-.05.51-.08 1.01-.17 1.52-.26q.93-.165 1.86-.36c.51-.1 1.01-.21 1.52-.33.54-.12 1.09-.25 1.63-.39 1.6-.4 3.18-.86 4.74-1.37.34-.11.68-.22 1.01-.34.28-.09.56-.19.83-.29.49-.17.97-.35 1.46-.53.12-.05.24-.1.35-.14q.675-.255 1.35-.54.825-.33 1.62-.69.735-.315 1.47-.66c.42-.19.84-.4 1.26-.61 1.97-.95 3.88-2 5.73-3.12.39-.23.77-.47 1.15-.72.29-.17.58-.36.86-.54.39-.26.78-.51 1.16-.77 1.86-1.26 3.65-2.6 5.38-4.02.43-.36.85-.71 1.27-1.08.42-.36.84-.72 1.25-1.1.32-.28.64-.57.95-.87.29-.26.57-.53.85-.8 2.61-2.51 5.03-5.21 7.24-8.08.34-.44.68-.89 1-1.34.68-.92 1.34-1.86 1.97-2.81q.345-.51.66-1.02c.17-.25.33-.51.49-.77.27-.42.53-.85.78-1.28 1.3-2.17 2.48-4.42 3.55-6.73.2-.43.39-.86.58-1.3.24-.55.48-1.1.7-1.65.16-.38.31-.77.46-1.15.17-.44.34-.87.5-1.31.05-.13.09-.26.14-.39.14-.38.28-.77.4-1.16.17-.48.33-.97.48-1.45.31-.97.6-1.95.87-2.93.09-.32.17-.63.25-.95.18-.68.34-1.36.49-2.04.11-.44.2-.88.29-1.32.09-.43.18-.86.26-1.29.05-.3.11-.6.16-.91.13-.73.25-1.46.35-2.19.06-.39.11-.78.16-1.18.09-.66.17-1.33.23-2 .05-.48.1-.96.13-1.45.03-.32.05-.64.07-.97.04-.45.06-.91.08-1.37.03-.58.05-1.17.07-1.76v-.03c.01-.59.02-1.19.02-1.78" style="fill:#fff"/><path d="M201.21 11.26c0 1.77-6.89 3.39-18.31 4.64-13.94-1.7-35.83-2.79-60.47-2.8h-.42c-23.39 0-44.34.97-58.41 2.51-9.93-1.2-15.83-2.71-15.83-4.35 0-3.94 34.35-7.14 76.72-7.14 2.32 0 4.62.01 6.89.03 39.14.32 69.83 3.39 69.83 7.11" style="fill:#989898"/><path d="M180.17 135.48v.27c0 .6 0 1.19-.02 1.78v.03c-.02.59-.04 1.18-.07 1.76-.02.46-.04.92-.08 1.37-.02.32-.04.65-.07.97-.04.48-.08.97-.13 1.45-.06.67-.14 1.34-.23 2-.04.4-.1.79-.16 1.18-.1.73-.22 1.46-.35 2.19-.05.31-.1.61-.16.91-.08.43-.17.86-.26 1.29-.09.44-.19.88-.29 1.32-.15.68-.31 1.36-.49 2.04-.08.32-.17.63-.25.95-.27.98-.56 1.96-.87 2.93-.15.49-.31.97-.48 1.45-.13.39-.26.78-.4 1.16-.05.13-.09.26-.14.39-.16.44-.33.88-.5 1.31-.15.39-.3.77-.46 1.15-.22.55-.46 1.1-.7 1.65-.19.44-.38.87-.58 1.3a72 72 0 0 1-3.55 6.73c-.25.43-.51.86-.78 1.28-.16.26-.32.52-.49.77q-.315.51-.66 1.02c-.63.95-1.29 1.89-1.97 2.81-.33.45-.66.9-1 1.34a73 73 0 0 1-7.24 8.08c-.28.27-.56.54-.85.8-.31.3-.63.59-.95.87-.41.38-.83.74-1.25 1.1-.42.37-.84.72-1.27 1.08a73 73 0 0 1-6.54 4.79c-.28.18-.57.37-.86.54-.38.25-.76.49-1.15.72a69 69 0 0 1-5.73 3.12c-.41.21-.83.41-1.26.61-.48.23-.98.45-1.47.66q-.795.36-1.62.69-.675.285-1.35.54c-.11.04-.23.09-.35.14-.49.18-.97.36-1.46.53-.27.1-.55.2-.83.29-.33.12-.67.23-1.01.34-1.56.51-3.14.97-4.74 1.37-.54.14-1.08.27-1.63.39-.5.12-1.01.23-1.52.33q-.93.195-1.86.36c-.51.09-1.01.18-1.52.26-.11.01-.23.03-.35.05-.52.08-1.05.15-1.58.22a70 70 0 0 1-3.49.37c-37.52-3.05-67.01-34.47-67.01-72.78v-.27c.14-38.18 29.58-69.45 67.01-72.5 37.44 3.04 66.88 34.32 67.02 72.5m-35.71.27-.16-.27-18.49-32.03h-37.3l-18.48 32.03-.16.27 18.64 32.3h37.3z" style="fill:#cbcbcb"/><path d="M182.9 15.9c-14.07 1.53-35.02 2.51-58.41 2.51-2.48 0-4.92-.01-7.34-.03-21.79-.19-40.93-1.24-53.55-2.77 14.07-1.54 35.02-2.51 58.41-2.51h.42c24.64 0 46.53 1.1 60.47 2.8m-38.6 119.58.16.27-18.65 32.3h-29.4l-18.64-32.3.16-.27 18.48-32.03h29.4z" class="cls-10"/><path d="M107.16 62.74c2.02 0 4.01.08 5.99.24-37.43 3.05-66.87 34.32-67.01 72.5v.27c0 38.31 29.49 69.73 67.01 72.78-1.98.16-3.97.24-5.99.24-40.32 0-73.01-32.69-73.01-73.02v-.27c.15-40.2 32.78-72.74 73.01-72.74" class="cls-13"/><path d="m96.41 103.45-18.48 32.03-.16.27 18.64 32.3h-7.9l-18.64-32.3.16-.27 18.48-32.03z" style="fill:gray"/></g><path d="M.5 28.14v214.14h214.14V28.14zM28.02.35.5 27.87M242.97.35l-28.33 28.34m28.33 185.25L214.91 242M27.47.35h215.77m-.27 48.22V.35m0 213.59v-26.97" class="cls-2"/><path d="M113.15 208.53c-1.98.16-3.97.24-5.99.24-40.32 0-73.01-32.69-73.01-73.02v-.27c.15-40.2 32.78-72.74 73.01-72.74 2.02 0 4.01.08 5.99.24m67 74.55c.01-.59.02-1.19.02-1.78m-.37 7.36c.05-.48.09-.97.13-1.45.03-.32.05-.65.07-.97.04-.45.06-.91.08-1.37.03-.58.05-1.17.07-1.76m-.74 8.76c.06-.42.12-.84.17-1.26m-.69 4.36c.07-.35.13-.7.19-1.06m-.73 3.64q.15-.615.27-1.23m-4.48 14.08c.18-.4.35-.8.51-1.21.17-.39.33-.79.48-1.19m-7.51 14.25c.25-.36.49-.72.72-1.09m-1.54 2.27c.2-.28.39-.56.59-.84m-2.36 3.24c.34-.44.67-.88 1-1.34m-8.72 9.88c.37-.34.74-.7 1.1-1.07.4-.38.8-.78 1.18-1.18.78-.8 1.53-1.61 2.26-2.44m-8.38 8.08c.43-.35.85-.7 1.27-1.08.83-.7 1.64-1.43 2.43-2.18m-7.64 6.27q.675-.465 1.32-.96c.45-.33.88-.66 1.32-1.01m-5.24 3.75c.39-.25.78-.51 1.16-.77m-5.54 3.4c.45-.24.89-.5 1.34-.76.48-.28.96-.56 1.43-.86m-8.15 4.32c.38-.16.75-.34 1.12-.51.46-.22.91-.44 1.36-.66m-6.14 2.7c.32-.12.64-.24.96-.37.36-.14.71-.29 1.06-.44m-12.76 4.04c.39-.08.78-.17 1.16-.26m-5.9 1.14c.45-.07.9-.14 1.34-.22l1.05-.18c.44-.08.88-.17 1.31-.26m-8.58 1.22c.88-.07 1.75-.16 2.62-.26" class="cls-2"/><path d="M113.15 62.98c-37.43 3.05-66.87 34.32-67.01 72.5v.27c0 38.31 29.49 69.73 67.01 72.78a75 75 0 0 0 4.88-.56c.45-.07.9-.14 1.34-.22l1.05-.18c.44-.08.88-.17 1.31-.26.35-.06.69-.14 1.04-.22.39-.08.77-.16 1.16-.26 3.28-.77 6.48-1.76 9.58-2.97.32-.11.64-.24.96-.37.36-.14.71-.29 1.06-.44.55-.23 1.1-.47 1.64-.72.38-.16.75-.33 1.12-.51.46-.21.91-.43 1.36-.66.98-.48 1.95-.99 2.9-1.53.45-.24.9-.5 1.34-.76.48-.28.96-.56 1.43-.86.54-.33 1.08-.67 1.61-1.01.39-.26.78-.51 1.16-.77.49-.33.97-.67 1.44-1.01q.66-.465 1.32-.96c.66-.495.88-.67 1.32-1.01s.87-.69 1.3-1.04c.43-.36.85-.71 1.27-1.08.83-.71 1.64-1.43 2.43-2.18.05-.04.09-.08.14-.13.37-.35.74-.71 1.1-1.07.4-.39.79-.78 1.18-1.18a73 73 0 0 0 5.44-6.29c.34-.44.67-.89 1-1.34.26-.35.52-.7.77-1.06.2-.28.39-.56.59-.84.07-.11.15-.22.23-.34.24-.36.48-.72.72-1.09 2.22-3.4 4.17-7 5.8-10.76.18-.4.35-.8.51-1.21.17-.39.33-.79.48-1.19 1.33-3.37 2.41-6.86 3.22-10.45q.15-.615.27-1.23.15-.66.27-1.35c.07-.35.13-.7.19-1.06q.18-1.005.33-2.04c.06-.42.12-.84.17-1.26.08-.64.16-1.3.22-1.95.05-.48.1-.97.13-1.45.03-.32.05-.65.07-.97.04-.46.06-.91.08-1.37.03-.58.05-1.17.07-1.76v-.03c.01-.59.02-1.18.02-1.78v-.27c-.14-38.18-29.58-69.46-67.02-72.5Zm119.28 124.26c-.07 0-.14-.01-.21-.02-4.37-.95-7.88-31.62-7.88-69.31s3.62-69.33 8.09-69.33m13.72-.45c.15-.07.29-.1.44-.1 4.47 0 8.1 31.04 8.1 69.34s-3.63 69.33-8.1 69.33c-3.03 0-5.67-14.3-7.06-35.46-.65-10.01-1.03-21.57-1.03-33.87 0-1.76 0-3.5.02-5.23.09-10.12.43-19.63.98-28.08 1.22-19.07 3.46-32.69 6.08-35.49.19-.2.38-.35.57-.44Z" class="cls-2"/><path d="M96.41 168.05h-7.9l-18.64-32.3.16-.27 18.48-32.03h7.9" class="cls-2"/><path d="M125.81 168.05h-29.4l-18.64-32.3.16-.27 18.48-32.03h29.4m0 64.6 18.65-32.3-.16-.27-18.49-32.03m106.54-54.88h.08l10.54-.34 3.18-.1.45-.01m-14.16 139.03 10.53-.26 3.62-.1h.2M63.6 15.61c-9.93-1.2-15.83-2.71-15.83-4.35 0-3.94 34.35-7.14 76.72-7.14 2.32 0 4.62.01 6.89.03 39.14.32 69.83 3.39 69.83 7.11 0 1.77-6.89 3.39-18.31 4.64" class="cls-2"/><path d="M63.6 15.61c14.07-1.54 35.02-2.51 58.41-2.51h.42c24.64.01 46.53 1.1 60.47 2.8m-119.3-.29c12.62 1.53 31.76 2.58 53.55 2.77 2.42.02 4.86.03 7.34.03 23.39 0 44.34-.98 58.41-2.51m66.5 70.06-2.34 2.93-1.23 30.93.68 27.92 2.89-3.21 1.41-29.29z" class="cls-2"/></g></g></svg>')}`;
export default image;