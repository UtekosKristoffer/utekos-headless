import { streamText, convertToModelMessages } from 'ai'
import { createHuggingFace } from '@ai-sdk/huggingface'

export const maxDuration = 30

export async function POST(req: Request) {
  const apiKey = process.env.HUGGING_FACE_API_KEY

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API-nøkkel mangler' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const { messages } = await req.json()

    // Bruk Hugging Face med provider parameteren
    const huggingface = createHuggingFace({
      apiKey
    })

    const result = streamText({
      // Prøv Qwen modellen som fungerer godt med Inference Providers
      model: huggingface('Qwen/Qwen2.5-72B-Instruct'),
      system: `Du er en vennlig og hjelpsom kundeveileder for Utekos.no, en nettbutikk som selger utstyr for friluftsliv og utendørsaktiviteter. 
      
      Din oppgave er å:
      - Hjelpe kunder med å finne produkter
      - Svare på spørsmål om produkter, priser og levering
      - Være vennlig, profesjonell og konsis
      - Svare på norsk
      
      Hvis du ikke vet svaret på noe, vær ærlig om det og foreslå at kunden kontakter kundeservice.`,
      messages: convertToModelMessages(messages),
      temperature: 0.7
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({
        error: 'En feil oppstod',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
