"use client";

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createAuthor } from '@/sanity/lib/actions';

const AuthorForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const handleFormSubmit = async ( prevState:any, formData:FormData ) => {

        try {

            const formValues = {
                id: formData.get('title') as string,
                name: formData.get('name') as string,
                username: formData.get('username') as string,
                email: formData.get('email') as string,
                link: formData.get("link") as string,
                bio: formData.get('bio') as string,
            }

            await formSchema.parseAsync(formValues);

            console.log(formValues);

            const result = await createAuthor( prevState, formData )
            console.log(result);

            if (result.status === 'SUCCESS') {
                toast.success("Author created successfully!")

                //router.push(`/profile/${result._id}`);
            }

            return result;
            
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors( fieldErrors as unknown as Record< string, string > );

                toast.error("please check inputs and try again!")
                return { ...prevState, error: "Validation failed", status: "ERROR" }
            }

            toast.error("unexpected error has occured!")
            return { ...prevState, error: "Unexpected error occured", status: "ERROR" }

        }
    }




    const [ state, formAction, isPending ] = useActionState( handleFormSubmit, 
        {error:'', status:'INITIAL'} )

  return (
    <form action={ formAction } className='startup-form'>
        <div>
            <label htmlFor="id" className='startup-form_label'>ID</label>
            <Input id="id" name='id' className='startup-form_input' required placeholder='Author ID'/>

            { errors.id && <p className='startup-form_error'>{errors.id}</p> }
        </div>

        <div>
            <label htmlFor="name" className='startup-form_label'>Name</label>
            <Input id="name" name='name' className='startup-form_input' required placeholder='Your Name'/>

            { errors.name && <p className='startup-form_error'>{errors.name}</p> }
        </div>

        <div>
            <label htmlFor="username" className='startup-form_label'>Username</label>
            <Input id="username" name='username' className='startup-form_input' required placeholder='Your Username'/>

            { errors.username && <p className='startup-form_error'>{errors.username}</p> }
        </div>

        <div>
            <label htmlFor="email" className='startup-form_label'>Email</label>
            <Input id="email" name='email' className='startup-form_input' required placeholder='Enter Email'/>

            { errors.email && <p className='startup-form_error'>{errors.email}</p> }
        </div>

        <div>
            <label htmlFor="link" className='startup-form_label'>Image URL</label>
            <Input id="link" name='link' className='startup-form_input' required placeholder='Image URL'/>

            { errors.link && <p className='startup-form_error'>{errors.link}</p> }
        </div>

        <div>
            <label htmlFor="bio" className='startup-form_label'>Bio</label>
            <Textarea id="bio" name='bio' className='startup-form_textarea' required placeholder='Describe Yourself'/>

            { errors.bio && <p className='startup-form_error'>{errors.bio}</p> }
        </div>

        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
            { isPending ? "Submiting..." : "Register" }
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default AuthorForm
