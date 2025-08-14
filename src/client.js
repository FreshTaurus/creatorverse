import { createClient } from '@supabase/supabase-js';

const URL = 'https://mehygsbkyvigghxqrlrc.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1laHlnc2JreXZpZ2doeHFybHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzk1MjIsImV4cCI6MjA3MDcxNTUyMn0.G183N3XnlhouigkHNSC8nr964lKRXnYMxD92HofDmlg';
export const supabase = createClient(URL, API_KEY);
