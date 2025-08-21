// Import the Pinecone library
const { Pinecone } = require( '@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding
const chatbotIndex = pc.Index('chatbot')

async function createMemory({vectors, metadata}) {
    await chatbotIndex.upsert([ {
        id: messageId,
        values: vectors,
        metadata
    } ])
}

async function queryMemory({ queryVector, limit = 5, metadata}) {
    const data = await chatbotIndex.query({
        vector: queryVector,
        topK: limit,  // to fetch clossed n points
        filter: metadata? {metadata}: undefined,
        includeMetadata: true
    })

    return data.matches
}

module.exports = {
    createMemory,
    queryMemory
}