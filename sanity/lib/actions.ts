"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from 'slugify';
import { writeClient } from "./write-client";
import { author } from "../schemaTypes/author"; 


export const createPitch = async ( state:any, form:FormData, pitch:string ) => {

    const session = auth();

    if (!session) {
        return parseServerActionResponse({ error: 'Not signed in', status: 'ERROR',});
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter( ([key]) => key !== 'pitch'  )
    )

    const slug = slugify( title as string, { lower: true, strict: true } );



    try {

        const startup = {
            title,
            description,
            category,
            image:link,
            slug: {
                _type:slug,
                current:slug,
            },
            author:{
               _type:"reference",
               _ref: author.type
            },
            pitch,
        }

        const result = await writeClient.create({
            _type:"startup",
            ...startup,
        })

        return parseServerActionResponse({
            ...result,
            error:"",
            status:"SUCCESS"
        })
        
    } catch (error) {
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        })
    }
}








export const createAuthor = async ( state:any, form:FormData ) => {

    const session = auth();

    if (!session) {
        return parseServerActionResponse({ error: 'Not signed in', status: 'ERROR',});
    }

    const { id, name, username, email, link, bio } = Object.fromEntries(
        Array.from(form)
    )



    try {

        const author = {
            id,
            name,
            username,
            email,
            image:link,
            bio,
        }

        const result = await writeClient.create({
            _type:"author",
            ...author,
        })

        return parseServerActionResponse({
            ...result,
            error:"",
            status:"SUCCESS"
        })
        
    } catch (error) {
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        })
    }
}