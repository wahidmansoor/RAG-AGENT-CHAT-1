# Document Upload App

This application handles document uploading and storage for the document management system.

## API Documentation

### Upload Document
- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `file`: The document file to upload (PDF or text)
- **Response**:
  ```json
  {
    "success": true,
    "document": {
      "id": "uuid",
      "filename": "string",
      "content_type": "string",
      "size": "number",
      "chunks": "number",
      "pages": "number"
    }
  }
  ```

## Setup
1. Install dependencies: `npm install`
2. Create `.env` file with required environment variables
3. Start the server: `npm run dev`

## Environment Variables
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `PORT`: Server port (default: 3000)
