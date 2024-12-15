document.getElementById("generateScriptButton").addEventListener("click", async () => {
    const scriptType = document.getElementById("scriptType").value;

    if (!scriptType) {
        alert("Por favor, insira o tipo de roteiro!");
        return;
    }

    // Exibe a mensagem enquanto o script está sendo gerado
    document.getElementById("generatedScript").textContent = "Gerando roteiro... Aguarde um momento!";
    document.getElementById("scriptResult").style.display = "block";

    try {
        // CORS Proxy
        const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = "https://api.openai.com/v1/completions";
        const apiKey = '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';

        const response = await fetch(corsProxyUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Escreva um roteiro para um vídeo do tipo: ${scriptType}`,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            document.getElementById("generatedScript").textContent = data.choices[0].text.trim();
        } else {
            document.getElementById("generatedScript").textContent = "Não foi possível gerar o roteiro. Tente novamente!";
        }
    } catch (error) {
        document.getElementById("generatedScript").textContent = "Erro ao gerar o roteiro. Tente novamente!";
    }
});
