function displayPoem(response) {
    console.log("Poem is generated");
    if (response.data && response.data.answer) {
      new Typewriter("#poem", {
        strings: response.data.answer,
        autoStart: true,
        delay: 1,
        cursor: "",
      });
    } else {
      console.error("No poem data found in the response.");
    }
  }
  
  function generatePoem(event) {
    event.preventDefault();
  
    let userInstructions = document.querySelector("#user-instructions").value;
    let apiKey = `befe28ed9d48eac93fd074tafa91d7of`;
    let prompt = `Generate a poem in English with no more than 4 lines about ${userInstructions}. Follow the user's instructions exactly.`;
    let context = `You are an AI poet. Follow the user's instructions and write the poem in English. Sign the poem as "SheCodes AI" using <strong> and use <br /> to separate each line.`;
  
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;
    console.log("API URL:", apiUrl);
  
    let poemElement = document.querySelector("#poem");
    poemElement.classList.remove("hidden");
    poemElement.innerHTML = `<div class="blink">Generating poem about ${userInstructions}</div>`;
  
    console.log("Generating poem");
    console.log("Prompt:", prompt);
    console.log("Context:", context);
  
    axios.get(apiUrl)
      .then(displayPoem)
      .catch(error => {
        console.error("Error generating poem:", error);
        poemElement.innerHTML = `<div class="error">There was an error generating the poem. Please try again.</div>`;
      });
  }
  
  let poemFormElement = document.querySelector("#poem-generator-form");
  poemFormElement.addEventListener("submit", generatePoem);
  