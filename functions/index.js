const functions = require('firebase-functions');


const dialogflow = require('dialogflow');
const uuid = require('uuid');

exports.helloWorld = functions.https.onRequest((req, res) => {
    async function runSample(projectId = 'iansbirthdaycard') { //replace iansbirthdaycard with your projectId (you can find this on the firebase project)
        // A unique identifier for the given session
        const sessionId = uuid.v4();
        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
      
        // The text query request.
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              // The query to send to the dialogflow agent
              text: 'hello',
              // The language used by the client (en-US)
              languageCode: 'en-US',
            },
          },
        };
      
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        if (result.intent) {
            res.send(result.fulfillmentText) //this is where you send the text response
        } else {
            res.send("There is no matching request")
          console.log(`  No intent matched.`);
        }
      }
      runSample().catch(console.error);
});
