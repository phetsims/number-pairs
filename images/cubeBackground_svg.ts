/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="3.53in" height="3.36in" viewBox="0 0 254.19 241.93"><path d="M246.09 47.68c-.15 0-.29.03-.44.1l-3.18.1V0H27.52L0 27.52v214.41h214.14v-.28h.27l28.06-28.06v-27.05l3.62-.1v-.09c4.47 0 8.1-31.04 8.1-69.33s-3.63-69.34-8.1-69.34" style="fill:#ffb3d9"/></svg>')}`;
export default image;