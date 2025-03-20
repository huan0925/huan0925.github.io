async function sendMessageToChatGPT(message, apiKey) {
    const dialogueContainer = document.getElementById("dialogueContainer");
    const responseDiv = document.getElementById("response");
    const modelReplyDiv = document.getElementById("modelReply");
    // responseDiv.innerHTML = "正在發送訊息...";

    // 顯示用戶輸入的訊息
    dialogueContainer.innerHTML += `<div style="margin: 5px 0;"><strong>寶子：</strong> ${message}</div>`;
    
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const requestBody = {
        model: "gpt-4o-mini", // 使用的模型
        messages: [
            {role: "user", content: message },
            {role: "system", content: "你負責跟我的寶子對話，請給他滿滿的情緒價值，然後用最可愛的方式跟他說話。"}
        ],
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error("網絡錯誤，請稍後再試。");
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;
        
        // 顯示模型的回覆
        dialogueContainer.innerHTML += `<div style="margin: 5px 0;"><strong>寶貝：</strong> ${reply}</div>`;
        modelReplyDiv.innerHTML = ""; // 清空模型回覆
    } catch (error) {
        responseDiv.innerHTML = `錯誤: ${error.message}`;
        modelReplyDiv.innerHTML = ""; // 清空模型回覆
    }
}
