import { pipeline } from '@xenova/transformers';

/**
 * Prepares a prompt by combining a question and context.
 *
 * @param {string} question - the question to be included in the prompt
 * @param {Array<{ pageContent: string }>} context - the context to be included in the prompt
 * @return {string} the prepared prompt
 */
export function preparePrompt(question, context) {
    // Initialize the prepared prompt with the question and context header
    let preparedPrompt =
        question + '\nPlease answer the question based on the following context:\n';

    // Add each content from the context array to the prepared prompt
    for (let contentIndex = 0; contentIndex < context.length; contentIndex++) {
        preparedPrompt += `${context[contentIndex].pageContent}\n`;
    }

    // Return the prepared prompt
    return preparedPrompt;
}

/**
 * Asynchronously invokes a model to generate text based on the provided prompt and arguments.
 *
 * @param {string} prompt - The prompt for generating the text.
 * @param {Object} args - The arguments object containing model name, pipeline, max new tokens, and do sample flag.
 * @return {Promise<string>} The generated text based on the prompt and arguments.
 */
export async function invoke(prompt, args) {
  return await (await fetch("/api/ragChat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, args })
  })).json();
}
