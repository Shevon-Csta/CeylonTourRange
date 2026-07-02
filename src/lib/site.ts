/**
 * Single source of truth for the brand name. Every page title, the
 * navbar wordmark, and the footer copyright all read from here — change
 * the name once, it updates everywhere. (This file exists specifically
 * because the client renamed the venture once already; next time it
 * should be a one-line edit, not a grep-and-replace across the app.)
 */
export const BRAND_NAME = "Ceylon Tour Range";
export const BRAND_SUFFIX = "by Nonis";
export const SITE_NAME = `${BRAND_NAME} ${BRAND_SUFFIX}`;
