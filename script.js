const form = document.getElementById('chat-form');
const questionInput = document.getElementById('question');
const answerDiv = document.getElementById('answer');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const question = questionInput.value;
  sendQuestion(question);
});

async function sendQuestion(question) {
  try {
    const response = await fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question })
    });

    // Check if the response is in JSON format
    if (response.headers.get('Content-Type').includes('application/json')) {
      const data = await response.json();
      answerDiv.textContent = data.answer;
    } else {
      console.error('The server did not return a JSON response.');
    }
  } catch (error) {
    console.error(error);
  }
}
