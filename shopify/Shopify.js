/* This function takes the form data (text input), sends it to openAI, and returns it.*/
async function query() {

// Gets input data from form.
var inString = document.getElementById('pl').value;
var inKey = 'Bearer ' + document.getElementById('key').value;

const data = {
 prompt: inString,
 temperature: 0.5,
 max_tokens: 64,
 top_p: 1.0,
 frequency_penalty: 0.0,
 presence_penalty: 0.0,
};

// Fetch data from API
response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   Authorization: inKey,
 },
 body: JSON.stringify(data),
});

// Get response object.
responseText = await response.text();

// Parse response from response object/
jsonOut = JSON.parse(responseText);
outString = jsonOut.choices[0].text;

// Add response to output.
document.getElementById('pl2').innerHTML = "Prompt: " + inString + "<br><br>" + "Response: " + outString + "<br>------------------------------------------<br>" + document.getElementById('pl2').innerHTML;
}
