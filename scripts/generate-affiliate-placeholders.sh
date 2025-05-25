#!/bin/bash

# Script to generate placeholder affiliate images
# Usage: ./scripts/generate-affiliate-placeholders.sh

# Create the affiliate images directory if it doesn't exist
mkdir -p public/images/affiliates

# Array of common affiliate platforms/products
declare -a products=(
    "github-copilot"
    "vercel"
    "figma"
    "webstorm"
    "vscode"
    "notion"
    "amazon-aws"
    "shopee"
    "lazada"
    "booking-com"
    "agoda"
    "aliexpress"
    "ebay"
)

echo "Generating placeholder affiliate images..."

for product in "${products[@]}"
do
    output_file="public/images/affiliates/${product}.jpg"
    
    # Check if the file already exists
    if [ -f "$output_file" ]; then
        echo "⏭️  Skipping $product (already exists)"
        continue
    fi
    
    # Create a simple placeholder using ImageMagick (if available)
    if command -v convert &> /dev/null; then
        # Create a 400x400 placeholder with the product name
        convert -size 400x400 xc:#1f2937 \
                -fill white \
                -pointsize 24 \
                -gravity center \
                -annotate +0+0 "${product^^}" \
                "$output_file"
        echo "✅ Generated $output_file"
    else
        echo "⚠️  ImageMagick not found. Creating text file for $product"
        echo "Placeholder for $product affiliate image" > "public/images/affiliates/${product}.txt"
    fi
done

echo ""
echo "📋 Generated placeholder images for affiliate links"
echo "💡 Replace these placeholders with actual product images"
echo "📐 Recommended size: 400x400px"
echo "📂 Location: public/images/affiliates/"

# Create a .gitkeep file to ensure the directory is tracked
touch public/images/affiliates/.gitkeep

echo ""
echo "🎯 Tips for affiliate images:"
echo "   - Use high-quality product photos"
echo "   - Ensure you have rights to use the images"
echo "   - Consider using official brand assets"
echo "   - Optimize images for web performance"
