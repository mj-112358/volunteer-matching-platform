# MongoDB Atlas Vector Search Index Setup

## IMPORTANT: You must create a vector search index before using recommendations

### Steps to create the index:

1. **Go to MongoDB Atlas Dashboard**
2. **Navigate to your cluster > Browse Collections**
3. **Go to the MAUKA database > profiles collection**
4. **Click on "Search Indexes" tab**
5. **Click "Create Search Index"**
6. **Choose "Atlas Vector Search - JSON Editor"**
7. **Use this index definition:**

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 1536,
      "similarity": "cosine"
    }
  ]
}
```

### Important Notes:
- **Index name**: Use "default" (this matches the code)
- **Collection**: profiles
- **numDimensions**: 1536 (for text-embedding-3-small) or 1536 (for ada-002)
- **similarity**: cosine
- **Wait for index to be ready** before testing recommendations

### Alternative: If using text-embedding-3-large:
Change numDimensions to 3072

### Alternative: If using OpenAI instead of Azure:
The dimensions remain the same (1536 for text-embedding-3-small)
