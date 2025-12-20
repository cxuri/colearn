'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

const sql = neon(process.env.DATABASE_URL!);

export async function submitToWaitlist(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const college = formData.get('college') as string;
    const year = formData.get('year') as string;
    const reason = formData.get('why') as string;
    const whatsapp = formData.get('whatsapp') as string; 

    await sql`
      INSERT INTO waitlist (name, email, college, year, reason, whatsapp_number)
      VALUES (${name}, ${email}, ${college}, ${year}, ${reason}, ${whatsapp})
    `;

    revalidatePath('/join');
    return { success: true, message: 'Welcome to the Chaos.' };

  } catch (error: any) {
    console.error('Neon Error:', error);
    if (error.code === '23505') {
        return { success: false, message: 'You are already on the list.' };
    }
    return { success: false, message: 'Database refused connection.' };
  }
}


export async function getCount() {
  try {
    const result = await sql`SELECT count(*) FROM waitlist`;

    // Result comes back like: [{ count: '42' }]
    const count = parseInt(result[0].count, 10);
    
    return count;
  } catch (error) {
    console.error('Failed to fetch count:', error);
    return 0; 
  }
}