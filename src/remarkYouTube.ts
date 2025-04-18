import type { RemarkPlugin } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Root } from 'mdast';

interface YouTubeOptions {
  width?: number;
  height?: number;
}

/**
 * A remark plugin that transforms YouTube URLs into embedded iframes
 */
export const remarkYouTube: RemarkPlugin = (options: YouTubeOptions = {}) => {
  const width = options.width || 560;
  const height = options.height || 315;

  return (tree) => {
    // Use type any to work around TypeScript errors with unist-util-visit
    // The actual implementation is correct, but TypeScript is having trouble with the type definitions
    visit(tree, 'text', function visitor(node: any, index, parent) {
      if (!parent) return;

      // YouTube URL pattern
      const youtubeRegex = /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:&[^&\s]*)*(?:\?[^?\s]*)*/g;
      
      const value = node.value as string;
      let match;
      let lastIndex = 0;
      const children: any[] = [];

      // Find all YouTube URLs in the text
      while ((match = youtubeRegex.exec(value)) !== null) {
        const videoId = match[1];
        
        // Add text before the URL
        if (match.index > lastIndex) {
          children.push({
            type: 'text',
            value: value.slice(lastIndex, match.index)
          });
        }

        // Add the YouTube iframe
        children.push({
          type: 'html',
          value: `<div class="youtube-container my-5">
            <iframe 
              width="${width}" 
              height="${height}" 
              src="https://www.youtube.com/embed/${videoId}"
              title="YouTube video player"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              style="width: 100%; aspect-ratio: 16/9;"
            ></iframe>
          </div>`
        });

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text
      if (lastIndex < value.length) {
        children.push({
          type: 'text',
          value: value.slice(lastIndex)
        });
      }

      // Replace the current node with the new children if we found YouTube URLs
      if (children.length > 0 && index !== undefined) {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
      
      return undefined;
    });
  };
};