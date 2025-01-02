# Document Chat App

This application handles chat functionality for the document management system.

## API Documentation

### Send Message
- **URL**: `/api/chat`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
    "message": "string"
  }
  ```
- **Response**:
  ```json
  {
    "response": "string",
    "relevantChunks": [
      {
        "id": "uuid",
        "content": "string",
        "similarity": "number"
      }
    ]
  }
  ```

### Get Chat History
- **URL**: `/api/history`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": "uuid",
      "user_query": "string",
      "ai_response": "string",
      "relevant_docs": ["uuid"],
      "created_at": "timestamp"
    }
  ]
  ```

## Setup
1. Install dependencies: `npm install`
2. Create `.env` file with required environment variables
3. Start the server: `npm run dev`

## Environment Variables
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_GEMINI_API_KEY`: Google Gemini API key
- `PORT`: Server port (default: 3001)
