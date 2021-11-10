# Merged the branches as it's no longer necessary to go on with another branch 
## I should definitely consider the design, colours and the overall structure before I jump in, I wasted so much time 
* Gonna work on the custom map where users will be able to add custom markers to the map, never done something like this before so doing some reading for now
* Created Testing-map.tsx component to test some features, mostly react-map-gl stuff
* Working on database call now to use my data for markers
* The icons are there, there are couple of issues: Adding an Icon doesn't re-render the map to show the change, I need to prevent users from being able to create multiple icons in the same spot (as adding an icon doesn't cause a re-render, it appears as if it wasn't added)
* Gonna add info boxes for the markers that are added by users and when it's done gonna move on the posts page
* Instead of info appearing on the map it will appear in a div just below the map to avoid further cluttering the already small map
* Working on typescript errors I had been ignoring "successfully" for a while now, tired of seeing red 