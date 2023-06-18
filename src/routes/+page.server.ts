import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    upload: async ({ request, locals }) => {
        const data = await request.formData();

        // check that the form has files
        const hasImages = data.has('file') && (data.get('file') as File).size > 0;
        if (!hasImages) data.delete('file');

        // upload the image e.g. to pocketbase
        try {
            // const createdRecord = await locals.pocketbase.collection('images').create(data);
            return { success: true }
        }
        catch (error) {
            return fail(500, { error: 'Failed to upload images' });
        }
    }
} satisfies Actions;