-- Run this SQL in Supabase SQL Editor to add WhatsApp field

ALTER TABLE contact 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'contact';
