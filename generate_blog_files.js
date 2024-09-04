const fs = require('fs');
const path = require('path');

const blogFolder = path.join(__dirname, 'blog');
const outputFilePath = path.join(__dirname, 'blog/blogFiles.json');

// Read all Markdown files from the blog folder
fs.readdir(blogFolder, (err, files) => {
    if (err) {
        console.error('Error reading blog folder:', err);
        return;
    }

    const markdownFiles = files.filter(file => path.extname(file) === '.md');

    // Write the list of Markdown files to a JSON file
    fs.writeFile(outputFilePath, JSON.stringify(markdownFiles), err => {
        if (err) {
            console.error('Error writing blogFiles.json:', err);
        } else {
            console.log('blogFiles.json has been created.');
        }
    });
});
