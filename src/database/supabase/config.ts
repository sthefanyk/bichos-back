import * as dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    auth: {
        persistSession: false,
    }
})

export default supabase;

