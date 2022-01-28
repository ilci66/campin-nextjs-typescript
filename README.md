# Merged the branches as it's no longer necessary to go on with another branch 
## I should definitely consider the design, colours and the overall structure before I jump in, I wasted so much time 
* Gonna work on the custom map where users will be able to add custom markers to the map, never done something like this before so doing some reading for now
* Created Testing-map.tsx component to test some features, mostly react-map-gl stuff
* Working on database call now to use my data for markers
* The icons are there, there are couple of issues: Adding an Icon doesn't re-render the map to show the change, I need to prevent users from being able to create multiple icons in the same spot (as adding an icon doesn't cause a re-render, it appears as if it wasn't added)
* Explore the rich text options further to be able to style the texts better
* After struggling for so long trying to select and give classes to my texts, saw that I caould give classes to items in graphcms 
* There's a weird glitch with the navbar on mobile, nothing really major but annnoying, probably because of namings of the classes, be more careful with it in the next project


# Campin'

## Project Description
A website that allows people to mark camping spots or dangerous animal sightings on map. Users have to sign u to be able to interact with the map. There is also a blog page where visitors can read awesome blog posts written by me.

### Motivation


### Technologies Used:
*   HTML, CSS, Javascript
*   Next.js 
*   GraphCMS and graphql, for posting or updating blogs blogs
*   MongoDB Atlas, saving user information and markers positions mostly
*   cookies, crypto, bcrypt and jwt, for handling subscriptions
*   mapbox-gl, for a map that the signed in user can interact with 

### Challanges and Improvements
*   Getting started with Next.js and graphCMS with a project like this 

## 
