import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function analyzeCode(code) {
    const prompt = `
    Analise o seguinte código e forneça sugestões de melhoria de forma didática e clara.

    ${code}

    Por favor, avalie:
    1. Possíveis bugs ou erros
    2. Melhorias de Performance
    3. Boas práticas de código
    4. Legibilidade e manutenibilidade
    5. Sugestões específicas de otimização

    IMPORTANTE:
    - Forneça a resposta usando markdown
    - Use ### para títulos das seções
    - Use **negrito** para destacar pontos importantes
    - Use \'código\' para trechos de código
    - Use - para listas
    - Seja claro e didático em português

    FORMATO DA RESPOSTA:
    - Use apenas parágrafos normais
    - Seja CONCISO. Retorne apenas:

    ❌ PRINCIPAL PROBLEMA:

    ✅ SOLUÇÃO RÁPIDA:

    Máximo 3 frases. Direto ao ponto.
    `;

    try {
        const model = geminiClient.getGenerativeModel({model: 'gemini-1.5-flash'})

        const result = await model.generateContent(prompt)

        const response = result.response

        return response.text()
    } catch (error) {
        console.error('Erro ao analisar código', error)
        throw new Error("Erro ao conectar a IA. Verifique sua chave de API e tente novamente")
    }
}
