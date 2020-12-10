'use strict';

const firebase = require("firebase");

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} = process.env;

const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
}

firebase.initializeApp(config);
const db = firebase.database();

exports.handler = function(event, context, callback) {
    // Hack for avoiding timeouts. More info: https://stackoverflow.com/a/39374299/1762002
    context.callbackWaitsForEmptyEventLoop = false;
    if(firebase.apps.length === 0) {
        firebase.initializeApp(config);
    }
    const body = JSON.parse(event.body).payload
    const newPostKey = db.ref().child(`submissions`).push().key;
    db.ref(`submissions/${newPostKey}`).set({
        body
    }, function(error) {
        if (error) {
            console.log('failed :(')
            return callback(null, {
                statusCode: error.status,
                body: JSON.stringify({
                    message: error.message,
                    error: error,
                })
            })
        }
        console.log('saved')
        return callback(null, {
            statusCode: 200,
            body: "Success :D"
        })
    })
}
