#!/usr/bin/env python3
import os
import re
import shutil
from datetime import datetime, date
import yaml
import openai
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration - read from .env file with fallbacks
SOURCE_DIR = os.getenv("SOURCE_DIR", "migration/output/posts")
DEST_DIR = os.getenv("DEST_DIR", "src/content/blog")
SOURCE_IMAGES_DIR = os.getenv("SOURCE_IMAGES_DIR", "migration/output/images")  # Fallback global images directory
DEST_IMAGES_DIR = os.path.join(DEST_DIR, "images")
DRY_RUN = os.getenv("DRY_RUN", "False").lower() == "true"  # Convert string to boolean

# Set OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY not found in .env file or environment variables")

# Print configuration for verification
print("Configuration:")
print(f"SOURCE_DIR: {SOURCE_DIR}")
print(f"DEST_DIR: {DEST_DIR}")
print(f"SOURCE_IMAGES_DIR: {SOURCE_IMAGES_DIR}")
print(f"DEST_IMAGES_DIR: {DEST_IMAGES_DIR}")
print(f"DRY_RUN: {DRY_RUN}")

# Create destination directories if they don't exist
os.makedirs(DEST_DIR, exist_ok=True)
os.makedirs(DEST_IMAGES_DIR, exist_ok=True)

def generate_description(title, content, max_words=75):
    """
    Use OpenAI API to generate a description based on the post content
    """
    try:
        # Extract first 1000 characters of content to save tokens
        content_preview = content[:1000] if len(content) > 1000 else content
        
        # Prepare the prompt
        prompt = f"""Generate a concise description (maximum {max_words} words) for a blog post titled:
"{title}"

Here's the beginning of the post:
{content_preview}

The description should be engaging and accurately represent the content.
"""

        # Call OpenAI API
        response = openai.chat.completions.create(
            model="gpt-4o",  # You can use a different model if preferred
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates concise blog post descriptions."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,  # Limiting tokens for shorter response
            temperature=0.7
        )
        
        # Extract and clean the description
        description = response.choices[0].message.content.strip()
        
        # Ensure it's not too long
        words = description.split()
        if len(words) > max_words:
            description = ' '.join(words[:max_words]) + '...'
            
        return description
    
    except Exception as e:
        print(f"Error generating description: {e}")
        return "Lorem ipsum dolor sit amet"  # Fallback description

def format_date(date_str):
    """
    Format date from YYYY-MM-DD to 'MMM DD YYYY'
    """
    try:
        # Parse the date
        if isinstance(date_str, (datetime, date)):
            date_obj = date_str if isinstance(date_str, datetime) else datetime.combine(date_str, datetime.min.time())
        else:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            
        # Format according to the destination format
        return date_obj.strftime("%b %d %Y")
    except Exception as e:
        print(f"Error formatting date {date_str}: {e}")
        return datetime.now().strftime("%b %d %Y")  # Fallback to current date

def generate_slug(title):
    """
    Generate a slug from the title
    """
    # Convert to lowercase
    slug = title.lower()
    # Replace non-alphanumeric characters with hyphens
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    # Replace multiple hyphens with a single hyphen
    slug = re.sub(r'-+', '-', slug)
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    
    return slug

def handle_image(image_path, post_source_dir, post_dest_dir):
    """
    Fix image path and copy image to the same folder as index.md in the destination directory.
    """
    if not image_path:
        return ""
    
    # Ensure the destination directory exists
    os.makedirs(post_dest_dir, exist_ok=True)
    
    # Extract filename
    filename = os.path.basename(image_path)
    
    # Possible source paths to check
    possible_paths = []
    
    # 1. Check in the post's own images subdirectory (if post_source_dir is provided)
    if post_source_dir:
        post_images_dir = os.path.join(post_source_dir, "images")
        if os.path.exists(post_images_dir):
            possible_paths.append(os.path.join(post_images_dir, filename))
    
    # 2. Check in the global images directory
    possible_paths.append(os.path.join(SOURCE_IMAGES_DIR, filename))
    
    # Try all possible paths
    source_image_path = None
    for path in possible_paths:
        if os.path.exists(path):
            source_image_path = path
            break
    
    # If image is found, copy it
    if source_image_path:
        dest_image_path = os.path.join(post_dest_dir, filename)
        shutil.copy2(source_image_path, dest_image_path)
        print(f"Copied image: {filename} from {source_image_path} to {dest_image_path}")
        
        # Return the new path format
        return f"./{filename}"
    else:
        paths_checked = ", ".join(possible_paths)
        print(f"Warning: Image not found: {filename} (checked: {paths_checked})")
        return f"./{filename}"  # Still return the path even if image not found

def process_markdown_file(file_path, post_dir_name):
    """
    Process a markdown file and convert it to the destination format.
    """
    try:
        # Get the post directory
        post_source_dir = os.path.dirname(file_path)
        
        # Read the file content
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Split the content into frontmatter and markdown content
        if content.startswith('---'):
            # Find the end of the frontmatter
            parts = content.split('---', 2)
            if len(parts) >= 3:
                frontmatter_yaml = parts[1]
                markdown_content = parts[2]
                
                # Parse the frontmatter
                frontmatter = yaml.safe_load(frontmatter_yaml)
            else:
                frontmatter = {}
                markdown_content = content
        else:
            frontmatter = {}
            markdown_content = content
        
        # Extract title
        title = frontmatter.get('title', 'Untitled')
        
        # Generate slug from title or directory name
        slug = post_dir_name
        
        # Generate description using OpenAI
        description = generate_description(title, markdown_content)
        
        # Ensure description is a single string
        if isinstance(description, list):
            description = ' '.join(description).strip()
        
        # Handle the date
        date_str = frontmatter.get('date', datetime.now().strftime("%Y-%m-%d"))
        formatted_date = format_date(date_str)
        
        # Handle cover image
        cover_image = frontmatter.get('coverImage', '')
        post_dest_dir = os.path.join(DEST_DIR, post_dir_name)
        if cover_image:
            new_cover_image = handle_image(cover_image, post_source_dir, post_dest_dir)
        else:
            new_cover_image = ""
        
        # Handle tags
        tags = frontmatter.get('tags', [])
        categories = frontmatter.get('categories', [])
        
        # Create new frontmatter
        new_frontmatter = {
            'title': title,
            'slug': slug,
            'description': description,
            'tags': tags,
            'pubDate': formatted_date,
        }
        
        if new_cover_image:
            new_frontmatter['coverImage'] = new_cover_image
            
        if categories:
            new_frontmatter['categories'] = categories
        
        # Create the new content
        new_content = '---\n'
        for key, value in new_frontmatter.items():
            if isinstance(value, list):
                new_content += f"{key}:\n"
                for item in value:
                    new_content += f"  - '{item}'\n"
            elif isinstance(value, str):
                # Always use single quotes for strings
                escaped_value = value.replace("'", "''")  # Escape single quotes
                new_content += f"{key}: '{escaped_value}'\n"
            else:
                new_content += f"{key}: '{value}'\n"
        new_content += '---\n' + markdown_content
        
        # Determine destination path
        post_dest_dir = os.path.join(DEST_DIR, slug)
        os.makedirs(post_dest_dir, exist_ok=True)
        dest_file_path = os.path.join(post_dest_dir, "index.md")
        
        # Write the file
        with open(dest_file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
            
        print(f"Processed: {file_path} -> {dest_file_path}")
        return True
        
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return False

def process_posts():
    """
    Traverse the posts directory and process all index.md files.
    """
    processed = 0
    errors = 0
    
    print(f"\nStarting migration from {SOURCE_DIR} to {DEST_DIR}...")
    print(f"Mode: {'DRY RUN (no files will be written)' if DRY_RUN else 'LIVE RUN'}")
    print("Searching for index.md files in subdirectories...")
    
    # Check if source directory exists
    if not os.path.exists(SOURCE_DIR):
        print(f"ERROR: Source directory {SOURCE_DIR} does not exist!")
        return
    
    # Get all subdirectories in the source directory (direct children only)
    try:
        post_directories = [d for d in os.listdir(SOURCE_DIR) 
                           if os.path.isdir(os.path.join(SOURCE_DIR, d))]
        
        print(f"Found {len(post_directories)} potential post directories")
        
        if not post_directories:
            print(f"WARNING: No subdirectories found in {SOURCE_DIR}")
            return
        
        # Process each post directory
        for post_dir_name in post_directories:
            post_dir_path = os.path.join(SOURCE_DIR, post_dir_name)
            index_path = os.path.join(post_dir_path, 'index.md')
            
            # Check if index.md exists in this directory
            if os.path.exists(index_path) and os.path.isfile(index_path):
                print(f"\nProcessing post: {post_dir_name}")
                print(f"  File path: {index_path}")
                
                # For images, check if there's an images subdirectory
                images_dir = os.path.join(post_dir_path, "images")
                if os.path.exists(images_dir) and os.path.isdir(images_dir):
                    image_files = [f for f in os.listdir(images_dir) 
                                  if os.path.isfile(os.path.join(images_dir, f))]
                    print(f"  Found images directory: {images_dir}")
                    print(f"  Images found: {len(image_files)}")
                
                if not DRY_RUN:
                    # Process the file
                    success = process_markdown_file(index_path, post_dir_name)
                    
                    if success:
                        processed += 1
                    else:
                        errors += 1
                else:
                    print(f"  [DRY RUN] Would process: {index_path}")
                    print(f"  [DRY RUN] Would create: {os.path.join(DEST_DIR, post_dir_name, 'index.md')}")
                    processed += 1
            else:
                print(f"Skipping directory {post_dir_name} - no index.md file found")
    
    except Exception as e:
        print(f"Error processing directories: {e}")
                
    print(f"\nMigration {'would be' if DRY_RUN else ''} completed!")
    print(f"Processed: {processed} files")
    print(f"Errors: {errors} files")
    
    if DRY_RUN:
        print("\nThis was a DRY RUN. No files were written. Set DRY_RUN = False to perform the actual migration.")

if __name__ == "__main__":
    process_posts()