import { ProxyAgent, setGlobalDispatcher } from 'undici'
setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
import OpenAI from 'openai'

export const openai = new OpenAI()

export const chat = async prompt => {
  const res = await openai.responses.create({
    model: 'gpt-5-nano',
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
  return res.output_text
}

export const getEmbedding = async content => {
  const input = content.replaceAll('\n', ' ')
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input
  })
  return res.data[0].embedding
}

export const generatePost = async ({ prompt }) => {
  const res = await openai.responses.create({
    model: 'gpt-5-nano',
    input: [
      {
        role: 'system',
        content:
          '你现在是一个社交平台的大V，需要你围绕以下关键词，写一个300至500字左右的post，可以插入一些实时新闻参考案例，避免内容空洞'
      },
      {
        role: 'user',
        content: [{ type: 'input_text', text: prompt }]
      }
    ]
  })
  return res.output_text
}
