# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Get Your OMDb API Key

1. Visit [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Choose the **FREE** tier (1,000 requests per day)
3. Enter your email address
4. Check your email and click the activation link
5. Copy your API key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Windows (PowerShell)
New-Item -Path .env.local -ItemType File

# Mac/Linux
touch .env.local
```

Add your API key to the file:

```
NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
```

**Important:** Replace `your_api_key_here` with your actual API key from step 2.

### 4. Run the Development Server

```bash
bun run dev
```

### 5. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Error: "API request failed: 401 Unauthorized"

This means your API key is either:
- Not set in `.env.local`
- Invalid or expired
- Not activated yet

**Solution:**
1. Verify your `.env.local` file exists in the root directory
2. Check that the API key is correct (no extra spaces)
3. Make sure you activated your API key via the email link
4. Restart your development server after adding/changing the API key

### Error: "API key not configured"

This means the `NEXT_PUBLIC_OMDB_API_KEY` environment variable is not set.

**Solution:**
1. Create `.env.local` file if it doesn't exist
2. Add `NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here`
3. Restart the development server

### The app shows "API key not configured" message

This is expected if you haven't set up your API key yet. Follow the setup steps above to configure it.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OMDB_API_KEY` | Your OMDb API key | Yes |

## Notes

- The `.env.local` file is gitignored and won't be committed to version control
- You need to restart the dev server after changing environment variables
- The free tier allows 1,000 API requests per day

