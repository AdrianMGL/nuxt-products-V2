import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { v4 as uuidV4 } from 'uuid';

interface UploadResponse {
    success: boolean,
    result: UploadApiResponse | undefined,
}

const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
};

const missingConfig = Object.entries(cloudinaryConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

if (missingConfig.length > 0) {
    throw new Error(`Missing Cloudinary configuration: ${missingConfig.join(', ')}`);
}

cloudinary.config(cloudinaryConfig);

export const fileUpload = async (fileBuffer: Buffer<ArrayBufferLike>) => {
    // TODO
    try {
        // Upload an image
        const uuidFileName = uuidV4();

        const uploadResult = await new Promise<UploadResponse>(async (resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'image',
                public_id: uuidFileName,
                folder: 'nuxt-uploadsV2',
            }, (err, result) => {
                if (err) {
                    console.log({ err });

                    return reject({ success: false, error: err });
                }
                return resolve({ success: true, result });
            }).end(fileBuffer);
        })

        const cloudinaryPublicId = uploadResult.result!.public_id;
        console.log({ result: uploadResult.result });

        if (!uploadResult.success) {
            throw new Error('Cant upload image');
        }

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(cloudinaryPublicId, {
            fetch_format: 'auto',
            quality: 'auto',
            width: 600,
            height: 400,
            crop: 'limit',
        });

        console.log(optimizeUrl);

        return optimizeUrl
    } catch (error) {
        console.error('Cloudinary upload failed:', error);
        throw error;
    }
}