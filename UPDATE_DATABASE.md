# Database Update - Add WhatsApp Field

If you already have the database set up and need to add the WhatsApp field, follow these steps:

## Add WhatsApp Column to Existing Database

1. Go to your Supabase dashboard
2. Click on **SQL Editor**
3. Run this SQL query:

```sql
-- Add WhatsApp field to contact table
ALTER TABLE contact 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;
```

4. Click **Run**

That's it! Your database now supports WhatsApp numbers.

## How to Use

### In Admin Panel:

1. Log in to your admin panel
2. Go to **Contact** tab
3. Enter your WhatsApp number with country code
   - Example (Malawi): `265999123456`
   - Example (USA): `1234567890`
   - Example (UK): `447123456789`
4. Click **Save**

### Format Guidelines:

- **Include country code** (e.g., 265 for Malawi)
- **No spaces, dashes, or symbols**
- **Just numbers**

Examples:
- ✅ Correct: `265999123456`
- ✅ Correct: `265888123456`
- ❌ Wrong: `+265 999 123 456`
- ❌ Wrong: `+265-999-123-456`
- ❌ Wrong: `0999 123 456`

### On Your Website:

Once you add a WhatsApp number:
- A green WhatsApp button appears on the homepage
- The button shakes to get attention
- Visitors click it to chat with you directly
- Opens WhatsApp app or web automatically

If you leave the WhatsApp field empty, the button won't appear.

## Testing

After adding your number:
1. Save in admin panel
2. Go to your homepage
3. You should see a green floating button above the admin button
4. Click it - it should open WhatsApp with your number

## Country Codes Reference

Common country codes:
- Malawi: `265`
- South Africa: `27`
- USA/Canada: `1`
- UK: `44`
- Kenya: `254`
- Tanzania: `255`
- Zambia: `260`
- Zimbabwe: `263`

Full list: https://countrycode.org/

## Troubleshooting

### Button not showing
- Make sure you entered a number
- Check that the number contains only digits
- Refresh the page

### WhatsApp not opening
- Verify the number is correct
- Make sure you included the country code
- Test on a device with WhatsApp installed

### Button shows but wrong number
- Check the number in admin panel
- Make sure there are no extra characters
- Country code should be first
