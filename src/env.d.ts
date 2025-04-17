/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options?: {
      element?: string;
      resetStyles?: boolean;
      showImages?: boolean;
      showEmptyFilters?: boolean;
      excludeRoute?: string[];
      [key: string]: any;
    });
  }
}
