async function sendToChatGPT(userInput) {
    console.log("userInput: ", userInput)
  
    const modifiedUserInput = "Based on the following user input, return the 6 character color hex code (without '#') that you think matches the input the best. Your response should not be longer than 6 characters long. For example, 'sunset' might give warm colors such as 'eeaf61' or 'fb9062'. Here is the user input: " + userInput
  
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ${OPENAI_API_KEY}",
          },
          method: "POST",
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are ChatGPT, a large language model trained by OpenAI.",
              },
              {
                role: "user",
                content: modifiedUserInput
              },
            ],
            stop: ["\n\n"],
          }),
        });
  
        const result = await response.json();
        const newColorHex = "#" + result.choices[0].message.content;
        console.log("newColorHex:", newColorHex);
  
        resolve(newColorHex);
      } catch (error) {
        console.error("Error fetching data:", error);
        reject(error);
      }
    });
  }
  
