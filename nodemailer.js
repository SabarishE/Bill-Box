import nodemailer from 'nodemailer'
import {google} from "googleapis"



const client_id="543519367783-8rthmcbg05l5ue049mstkmb3qjjugk7e.apps.googleusercontent.com";
const client_secret=process.env.secret ||"cxlJsDxELESfrVCyf0BLtk5j";
const redirect_uri="https://developers.google.com/oauthplayground";
const refresh_token="1//04mcLeJKhv3iaCgYIARAAGAQSNwF-L9IrQW8i5B7dVsi-WwCYjOjJSQz7-_y2OZ90zobW53Mkg74dS_7dyqpXKVudX8lu9SNWZk0";

const oAuth2Client= new google.auth.OAuth2(client_id,client_secret,redirect_uri)

oAuth2Client.setCredentials({refresh_token:refresh_token});

const access_token= oAuth2Client.getAccessToken();

export var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type:"OAuth2",
    user: 'one.trial.one.trial@gmail.com',
    clientId:client_id,
    clientSecret:client_secret,
    refreshToken:refresh_token,
    accessToken:access_token
  },
  tls: {
    rejectUnauthorized: false
  }
});