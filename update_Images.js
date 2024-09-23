const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesFolderPath = 'images';
const imagesJsonPath = 'images.json';

async function updateImagesJson() {
  const imagesData = [];

  try {
    // Read the contents of the 'images' folder
    const imageFiles = fs.readdirSync(imagesFolderPath);

    // Loop through each image file in the folder
    for (const file of imageFiles) {
      const filePath = path.join(imagesFolderPath, file);

       // Check if the file is an image
       if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.jpeg') && !file.toLowerCase().endsWith('.png')) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }

      try {
        // Get the metadata of the image using sharp
        const metadata = await sharp(filePath).metadata();
        const aspectRatio = metadata.width / metadata.height;

        // Add the file path and aspect ratio to the imagesData array
        imagesData.push({ filePath, aspectRatio });
      } catch (error) {
        console.error(`Error processing image: ${filePath}, Error: ${error.message}`);
      }
    }

    // Write the updated imagesData to the images.json file
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesData, null, 2));
    console.log('images.json updated successfully.');
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

updateImagesJson();