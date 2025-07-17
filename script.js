let prompt = document.querySelector("#prompt")
let chatContainer = document.querySelector(".chat-container")

// const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

let user = {
    data: null,
}

async function generateResponse(aiChatBox) {

    let text = aiChatBox.querySelector(".aichat-area")
    let RequestOption = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': 'AIzaSyA_5zqYqec8mwagp3B2KJkZo59aYnw00PI'
        },
        body: JSON.stringify({

            "contents": [
                {
                    "parts": [
                        {
                            "text": user.data
                        }
                    ]
                }
            ]
        })
    }

    try {
        let response = await fetch(Api_Url, RequestOption)
        let data = await response.json()
        console.log(data);
        let apiResponse = data.candidates[0].content.parts[0].text.replace().trim();
        console.log(apiResponse);
        text.innerHTML = apiResponse;
    }
    // /\*\*(.*?)\8\*/g,"$1"
    catch {
        // console.log(error);
    }
    finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" })

    }
}

function createChatBox(html, classes) {
    let div = document.createElement("div")
    div.innerHTML = html
    div.classList.add(classes)
    return div

}

function handlechatResponse(message) {
    user.data = message
    let html = `<img src="user.jpg" alt="" id="userImage" width="40">
             <div class="userchat-area">
                ${user.data}
               </div>`
    prompt.value = ""
    let userChatBox = createChatBox(html, "user-chatBox")
    chatContainer.appendChild(userChatBox)

    ///automatic scroll bar
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" })


    setTimeout(() => {
        let html = ` <img src="aibot.jpg" alt="" id="aiImage" width="40">
         <div class="aichat-area">
               
             </div>`
        let aiChatBox = createChatBox(html, "ai-chatBox")
        // aiChatBox = "Loading..."
        chatContainer.appendChild(aiChatBox)
        generateResponse(aiChatBox)

    }, 200)

}


prompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handlechatResponse(prompt.value)
    }
})
