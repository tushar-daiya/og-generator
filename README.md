# Dynamic Open Graph Image Generator for Blog Posts

This project automatically generates Open Graph images for blog posts based on their content. It creates custom images for social media sharing and caches them for improved performance.

## How It Works

1. **Image Generation API**
   - The `/api/generate` endpoint handles POST requests with blog post data.
   - It uses the `canvas` library to create an image with the blog's title, description, and author.
   - If a custom image is provided, it's used as a background with an overlay gradient.
   - The generated image is saved as a PNG file in the `/public/opengraph/` directory.

2. **Metadata Generation**
   - The `generateMetadata` function in the blog post page checks if an Open Graph image already exists for the post.
   - If the image doesn't exist, it calls the generation API to create one.
   - The function then returns metadata including the Open Graph image URL.

3. **Image Caching**
   - Generated images are saved on the server, avoiding regeneration on subsequent requests.
   - This approach improves load times and reduces server load.

4. **Blog Post Display**
   - The blog post page displays the content along with the generated Open Graph image.

## Key Features

- Dynamic image generation based on blog post content
- Gradient overlays for background images
- Text wrapping for titles and descriptions
- Fallback to default styling if no custom image is provided
- Caching of generated images for improved performance
- Integration with Next.js metadata API for SEO optimization

## Usage

1. Ensure your blog post data includes `id`, `title`, `desc`, `author`, and optionally `image`.
2. The system will automatically generate and cache Open Graph images when accessing blog posts.
3. Generated images are stored in `/public/opengraph/` with the blog post ID as the filename.
