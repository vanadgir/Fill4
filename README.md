# Fill 4

Fill4 is a browser game that generates a blank Voronoi diagram for the player to fill in. Difficulty settings allow for 4 - 6 color options and 15, 30, or 45 starting Voronoi cells. Compatible with most devices, but best experience is on a desktop browser. It is currently hosted through Github Pages and can be played [here](https://www.varun.pro/fill4/).

## Motivation

Inspired by the [four color theorem](https://en.wikipedia.org/wiki/Four_color_theorem) in graph theory, this game challenges the player to four-color a randomly generated Voronoi diagram, i.e. two cells that share a side cannot be the same color.  Coming from a math background, this project was a great way to work with a familiar concept while learning React. Here's an interesting question to consider - can all Voronoi diagrams be represented as planar graphs?

## Game Options

There are a few alternate color sets to hopefully account for varying types of colorblindness. If you would like to suggest another color set, simply send me a message or submit an issue with the 6 hex codes and I will try and get it added!

## Contributing

If you are interested in tinkering with the app on your local machine, feel free to download the source code. To get started, you will need to:

```javascript
npm install
npm start
```

Since I am using an OpenWeather API Key for this project, you may choose to ignore that or may want to insert your own. If you would like to ignore it, simply edit the file "/src/components/DateTime.js" and remove any references to the API key. If you have your own API key you would like to use, you will need to create "/src/modules/weatherApiKey.js" and export the variable. 
