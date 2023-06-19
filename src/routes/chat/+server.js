import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_KEY } from '$env/static/private';

const config = new Configuration({
  apiKey: OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export const POST = async ({ request }) => {

  const { messages } = await request.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}