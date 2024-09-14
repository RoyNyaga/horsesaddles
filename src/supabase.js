 
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://joyvelzeyetvfndcntmi.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveXZlbHpleWV0dmZuZGNudG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3NDczNzUsImV4cCI6MjAwNjMyMzM3NX0.PJjo630_eAQAK_ABUMujxd_YQIlX1-XbJY1LmWlB4lQ"
const supabase = createClient(supabaseUrl, supabaseKey)
//const supabase = createClientComponentClient() // This code assumes that we have the NEXT_PUBLIC_SUPABASE_ANON_KEY and NEXT_PUBLIC_SUPABASE_URL keys in the .env file

export default supabase;