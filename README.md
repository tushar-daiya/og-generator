# Dynamic Open Graph Image Generator for Blog Posts

This project automatically generates Open Graph images for blog posts based on their content. It creates custom images for social media sharing and caches them for improved performance.

## How It Works

1. **Image Generation API**
   - The `/api/createblog` endpoint handles POST requests with blog post data.
   - It passes the data to the `/api/generate` endpoint to generate an image.
   - It uses the `canvas` library to create an image with the blog's title, description, and author.
   - If a custom image is provided, it's used as a background with an overlay gradient.
   - The generated image is saved as a PNG file on vercel blob storage and the url is returned.
   - The `/api/createblog` endpoint also creates a blog entry in the database.

2. **Metadata Generation**
   - The `generateMetadata` function fetches the blog data from the database.
   - If an Open Graph image URL is present, it returns metadata including the URL.

3. **Image Caching**
   - Generated images are saved on vercel blob storage, avoiding regeneration on subsequent requests.

4. **Blog Post Display**
   - The blog post page displays the content along with the generated Open Graph image.

## Key Features

- Dynamic image generation based on blog post content
- Gradient overlays for background images
- Text wrapping for titles and descriptions
- Fallback to default styling if no custom image is provided
- Caching of generated images for improved performance
- Integration with Next.js metadata API for SEO optimization

