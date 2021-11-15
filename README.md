# Merged the branches as it's no longer necessary to go on with another branch 
## I should definitely consider the design, colours and the overall structure before I jump in, I wasted so much time 
* Gonna work on the custom map where users will be able to add custom markers to the map, never done something like this before so doing some reading for now
* Created Testing-map.tsx component to test some features, mostly react-map-gl stuff
* Working on database call now to use my data for markers
* The icons are there, there are couple of issues: Adding an Icon doesn't re-render the map to show the change, I need to prevent users from being able to create multiple icons in the same spot (as adding an icon doesn't cause a re-render, it appears as if it wasn't added)
* Explore the rich text options further to be able to style the texts better