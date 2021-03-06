import nodemailer from 'nodemailer'
import {google} from "googleapis"



const client_id="";
const client_secret=process.env.secret;
const redirect_uri="https://developers.google.com/oauthplayground";
const refresh_token="";

const oAuth2Client= new google.auth.OAuth2(client_id,client_secret,redirect_uri)

oAuth2Client.setCredentials({refresh_token:refresh_token});

const access_token= oAuth2Client.getAccessToken();

export var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type:"OAuth2",
    user: '',
    clientId:client_id,
    clientSecret:client_secret,
    refreshToken:refresh_token,
    accessToken:access_token
  },
  tls: {
    rejectUnauthorized: false
  }
});
