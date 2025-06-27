// +page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { animeTable } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import path from 'path';
import { env } from '$env/dynamic/private';

const IMAGE_DIR = 'uploads';

export const actions = {
    new: async ({ request }) => {
        const formData = await request.formData();

        const password = formData.get('password');
        if (typeof password !== 'string' || password !== env.PASSWORD) {
            return error('invalid password');
        }

        const title = formData.get('title');
        if (typeof title !== 'string') {
            return error('invalid title');
        }

        let enjoyment = parseInt(formData.get('enjoyment'));
        if (typeof enjoyment !== 'number' || isNaN(enjoyment) || enjoyment < 0 || enjoyment > 10) {
            return error('invalid enjoyment');
        }

        let plot = parseInt(formData.get('plot'));
        if (typeof plot !== 'number' || isNaN(plot) || plot < 0 || plot > 10) {
            return error('invalid plot');
        }

        let quality = parseInt(formData.get('quality'));
        if (typeof quality !== 'number' || isNaN(quality) || quality < 0 || quality > 10) {
            return error('invalid quality');
        }

        let status = formData.get('status');
        if (status === 'finished') status = null;
        else if (status === 'dropped') {
            let season = parseInt(formData.get('season'));
            if (typeof season !== 'number' || isNaN(season) || season < -1 || season == 0) {
                return error('invalid season');
            }
            status = season;
        }
        else {
            return error('invalid status');
        }

        let notes = formData.get('notes');
        if (typeof notes !== 'string') {
            return error('invalid notes');
        }
        if (notes.trim() === '') notes = null;

        let image;
        let imageUrl = formData.get('image-url');
        if (typeof imageUrl === 'string') {
            image = await downloadAndSaveImage(imageUrl);
            if (image == null) {
                return error('invalid image url');
            }
        }
        else {
            image = formData.get('image');
            if (!(image instanceof File)) {
                return error('invalid image');
            }
            image = await saveImage(image);
        }
    
        await db.insert(animeTable).values({
            title,
            enjoyment,
            plot,
            quality,
            status,
            notes,
            image
        });
    
        return { success: true };
    }
};

function error(msg) {
    return { error: msg }
}

async function saveImage(image) {

    const buffer = Buffer.from(await image.arrayBuffer());
    const ext = path.extname(image.name);
    const filename = `${randomUUID()}${ext}`;
    const filepath = path.join(IMAGE_DIR, filename);
    await writeFile(filepath, buffer);
    return filename;

}

async function downloadAndSaveImage(imageUrl) {

    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const contentType = response.headers.get('content-type') || '';
    const ext = contentType.split('/')[1]?.split(';')[0] || 'jpg';
    const buffer = Buffer.from(await response.arrayBuffer());

    const filename = `${randomUUID()}.${ext}`;
    const filepath = path.join(IMAGE_DIR, filename);
    await writeFile(filepath, buffer);

    return filename;

}