import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whncdupzgukzaelbwbki.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobmNkdXB6Z3VremFlbGJ3YmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDE0NDYsImV4cCI6MjA2NjYxNzQ0Nn0.z1HgamDkl330SbqbtABjzCflGwaI-QrFEcGBmwesX_I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
