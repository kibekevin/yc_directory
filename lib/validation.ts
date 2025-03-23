import { z } from 'zod';

export const formSchema = z.object({
    //title: z.string().min(4).max(100),
    //description: z.string().min(20).max(500),
    //category: z.string().min(3).max(20),
    link: z.string().url(),
    // .refine( async (url) => {
    //     try {
    //         const res = await fetch(url, {method:"HEAD"});
    //         const contentType = res.headers.get("content-type");
    //         if (contentType?.startsWith("image/")) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } catch (error) {
    //         return false;
    //     }
    // }),
   // pitch: z.string().min(10),
    //id: z.string().min(4),
    name: z.string().min(4).max(20),
    username: z.string().min(4).max(30),
    email: z.string().min(4).max(30),
    bio: z.string().min(4).max(500),
})



export const createStartupFormSchema = z.object({
    title: z.string().min(4).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url(),
    pitch: z.string().min(10),
})