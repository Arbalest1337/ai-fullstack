import { ProxyAgent, setGlobalDispatcher } from 'undici'
setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
import OpenAI from 'openai'

export const openai = new OpenAI()

export const chat = async prompt => {
  const res = await openai.responses.create({
    model: 'gpt-4.1-nano',
    input: [
      {
        role: 'system',
        content: ''
      },
      {
        role: 'user',
        content: [{ type: 'input_text', text: prompt }]
      }
    ]
  })
  return res
}
