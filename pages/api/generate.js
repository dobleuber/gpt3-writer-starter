import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const opentai = new OpenAIApi(configuration);

const basePromptPrefix = `Translate this song into `;
const generateAction = async (req, res) => {
    // Run first prompt
  const spanishPrompt = `${basePromptPrefix} Spanish:\n${req.body.userInput}\n\nSpanish:\n`;
  const portuguesePrompt = `${basePromptPrefix} Portuguese:\n${req.body.userInput}\n\nPortuguese:\n`;

  const spanishCompletion = await opentai.createCompletion({
    model: 'text-davinci-003',
    prompt: spanishPrompt,
    temperature: 0.5,
    max_tokens: 600,
  });

  const spanish = spanishCompletion.data.choices.pop();

  const portugueseCompletion = await opentai.createCompletion({
    model: 'text-davinci-003',
    prompt: portuguesePrompt,
    temperature: 0.5,
    max_tokens: 600,
  });

  const portuguese = portugueseCompletion.data.choices.pop();

  res.status(200).json({spanish, portuguese});
}

export default generateAction;