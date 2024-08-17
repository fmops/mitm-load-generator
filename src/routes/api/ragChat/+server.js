import { pipeline } from '@xenova/transformers';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { prompt, args } = await request.json();

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
          "content": prompt
        }
      ],
    })
  })).json());

  try {
    // Set default values for modelName, pipeline, maxNewTokens, and doSample if not provided in args
    const modelName = args?.modelName || 'Xenova/Qwen1.5-0.5B-Chat';
    const pipe = args?.pipe || 'text-generation';
    const maxNewTokens = args?.max_new_tokens || 128;
    const doSample = args?.do_sample || false;

    // Prepare the message for the generator
    const message = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ];

    // Initialize the generator with the specified pipeline and modelName
    const generator = await pipeline(pipe, modelName);

    // Apply chat template to the message
    const text = generator.tokenizer.apply_chat_template(message, {
      tokenize: false,
      add_generation_prompt: true,
    });

    // Generate output text based on the provided message and arguments
    const output = await generator(text, {
      max_new_tokens: maxNewTokens,
      do_sample: doSample,
      return_full_text: false,
    });

    // Return the generated text after removing the assistant's prompt
    return json(output[0].generated_text.split('assistant\n').pop());
  } catch (error) {
    // Return an error if there is an issue generating the text
    return json(new Error('generating context: ', error));
  }
}
