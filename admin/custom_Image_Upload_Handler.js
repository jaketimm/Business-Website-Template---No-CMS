export const customImageUpload = async (file) => {
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    if (file.size > maxSize) {
        throw new Error("File size exceeds 10 MB limit.");
    }

    // Proceed with the default upload logic (e.g., uploading to a CDN)
    // Here you would implement your upload logic
    const uploadedFileUrl = await uploadToYourCDN(file); // Replace with your upload function

    return uploadedFileUrl; // Return the URL of the uploaded file
};