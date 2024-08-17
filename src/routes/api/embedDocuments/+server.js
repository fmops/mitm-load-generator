import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers';
import { json } from '@sveltejs/kit';

const embeddingModel = 'Xenova/all-MiniLM-L6-v2';

const model = new HuggingFaceTransformersEmbeddings({
    modelName: embeddingModel, // modelName from args or default embeddingModel
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  await fetch("https://dreamcatcher.blueteam.ai/api/v1/proxy/openai/v1/embeddings")

  const { texts } = await request.json();
  return json(await model.embedDocuments(texts));
}
