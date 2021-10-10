<h1>Initial D Visualisation</h1>
This is a visualisation about the anime Initial D using D3.js and React. Works well on desktop in portrait and landscope orientation. Mobile support is a work in progress.

<h2>Demo</h2>
<a href = "https://initial-d-vis.herokuapp.com/">Click here for demo hosted on heroku. </a>
<h2> Build instructions (Docker)</h2>

Download/clone files and run

```bash
>> docker build -t initial-d .
>> docker run -it --rm -p 3954:80
```

Visit https://localhost:3954

<h2> Data Extraction </h2>
Lcoated in other/data_extraction
<h3>extract-subtitles.ipynb</h3>
Get all words from subtitles
<h3>sentiment.ipynb</h3>
Scrape fandom for comment sentiment and car/character details
<h3>scrape_fandom.ipynb</h3>
Scrape Initial D fandom for word data

<h2> Screenshots </h2>
Located in other/screenshots

![Characters](https://raw.githubusercontent.com/fallos1/initial_d_vis/main/other/screenshots/characters_screen_shot.JPG)

![Cars](https://raw.githubusercontent.com/fallos1/initial_d_vis/main/other/screenshots/cars_screen_shot.JPG)

<h2> Video </h2>
Located in other/screenshots

<h2>Drafts</h2>
Located in other/handmade_visualisations

<h2>Worksheet</h2>
Located in other/Worksheet.docx

<h2> Project documentation </h2>
Location in other/Project Documenation.docx

<h2> Work in progress </h2>
Increase graphic size for mobiles
