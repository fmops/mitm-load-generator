import { pipeline } from '@xenova/transformers';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { userMessage } = await request.json();

  // TODO: send request to vendor llm generator
  console.log(await (await fetch("https://dreamcatcher.blueteam.ai/api/v1/stub/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 123",
    },
    body: JSON.stringify({
      model: "gpt-4o-turbo",
      messages: [
        {
          "role": "user",
          "content": userMessage
        }
      ],
    })
  })).json());


  const textGenerationPipeline = await pipeline(
    'text-generation',
    'shi-zheng-qxhs/gpt2_oasst2_curated_onnx'
  );

  const output = await textGenerationPipeline(userMessage, {
    max_new_tokens: 128,
    penalty_alpha: 0.6,
    top_k: 6,
    eos_token_id: 50256,
    pad_token_id: 50256,
  });

  return json({
    response: output
  });
}
