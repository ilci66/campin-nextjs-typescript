# Campin'

## Project Description
A website that allows people to mark camping spots or dangerous animal sightings on map.<br> 
Users have to sign u to be able to interact with the map. There is also a blog page where <br>
visitors can read awesome blog posts written by me. Users can delete the markers they added<br> 
in case of an error.

### Motivation
I wanted to create a reliable website for people who want to plan their next camping trip.

### Technologies Used:
*   HTML, CSS, Javascript
*   Next.js 
*   GraphCMS and graphQL, for posting or updating blogs blogs
*   MongoDB Atlas, saving user information and markers positions mostly
*   Next Auth, for sign ins with social media accouts 
*   cookies, crypto, bcrypt and jwt, for handling subscriptions
*   mapbox-gl, for a map that the signed in user can interact with 

### Challanges and Improvements
*   Getting started with Next.js and graphCMS with a project like this 
*   Created Testing-map.tsx component to test some features, mostly react-map-gl stuff
*   Adding a marker triggers a re-render of the map, looks and feels good 
*   Interacting with a headless CMS was a new experince but I got the hang of it thanks to the project
*   Markers need improvement and need a better system for new additions to be as reliable as possible

### How to Install and Run the Project
1.  Clone the git repository
2.  Get the necessary ids, secrets, api keys, access tokens for authentication using social media <br>
accounts and add them in your .env.local file for:

*   NEXT_PUBLIC_GOOGLE_API_KEY
*   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
*   NEXT_PUBLIC_GRAPHCMS_URL
*   NEXT_PUBLIC_GRAPHCMS_AUTH_TOKEN
*   GOOGLE_CLIENT_ID
*   GOOGLE_CLIENT_SECRET
*   FB_ID
*   FB_SECRET

3.  Add your mongoDB Uri in .env.local file:
*   MONGODB_URI
*   MONGODB   

4.  Salt rounds for password hashing to add in .env.local file:
*   SALT_NUM

5.  Add The port you have your website is running (3000) .env.local file:
*   NEXT_PUBLIC_SITE_URL
*   NEXTAUTH_URL

#### Feel free to use the code however you like 