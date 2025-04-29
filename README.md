# TANGO-CC PWA

![Zenodo Badge](https://zenodo.org/badge/710196381.svg?sanitize=true)

The TANGO–CC captures individual- and community-level variation in gaze following. Minimal language demands and the web-app implementation allow fast and easy contextual adaptations to each community. Psychometric properties were asssessed by analyzing a data set from 2.5- to 11-year-old children from 17 diverse communities. We found good internal consistency across all ages and communities. Three different trial types familiarize participants with the task to locate a balloon and use an agent's gaze as a cue.

![TANGO-CC Trials](/src/images/tango-cc-procedure.png)

### Citation

Prein, J.C., Bednarski, F. M., Dzabatou, A., Frank, M. C., Henderson, A. M. E., Kalbitz, J., Kanngiesser, P., Keşşafoğlu, D., Köymen, B., Manrique-Hernandez, M. V., Magazi, S., Mújica-Manrique, L., Ohlendorf, J., Olaoba, D., Pieters, W. R., Pope-Caldwell, S., Sen, U., Slocombe, K., Sparks, R. Z., Stengelin, R., Sunderarajan, J., Sutherland, K., Tusiime, F., Vieira, W., Zhang, Z., Zong, Y., Haun, D. B. M.\*, Bohn, M.\*(2025). Measuring Variation in Gaze Following Across Communities, Ages, and Individuals: A Showcase of TANGO-CC (Task for Assessing iNdividual differences in Gaze understanding-Open-Cross-Cultural). _Advances in Methods and Practices in Psychological Science, 8_(1), Article 25152459241308170. https://doi.org/10.1177/25152459241308170

### Usage

Link to task: [TANGO-PWA](https://devpsy.web.leuphana.de/tango-pwa/)

This website allows the TANGO-CC to be installed as a Progressive Web App. This means you can pre-cache the study content and then let the study run offline. The TANGO-CC can be installed like a native app on your device. For further information, check the [manual](https://devpsy.web.leuphana.de/tango-pwa/manual.html).

### Structure

```
.
├── dist                        <-- folder to host on server
├── public
│   ├── images                  <-- images used to display study customization options
│   ├──logos
│   └──  sounds                 <-- audio instructions in different languages
├── src                         <-- folder containing all CSS and JavaScript for functionality
│   ├── css
│   ├── images                  <-- pic on intro slide + study svg
│   ├── js                      <-- all javascript functions to run online study
│   ├── service-worker          <-- all javascript functions to enable PWA
│   └── html pages
└── ...some more config files

```

### Study Choices and Default Values

- participant identifier `subjID`: 'testID',
- language `lang`: 'eng-uk',
- webcam recording `webcam`: 'false',
- number of training trials 1 `touch`: '1',
- number of training trials 2 `fam`: '1',
- number of test trials `test`: '2',
- background scene `bg`: '04',
- agent faces `agents`: 'f01-f02-f03-f04-m04-m05-m06-m07-m08',

### Development

Development requires [Bun](https://bun.sh)

#### Local Development

1. `git clone git@github.com:jprein/tango-pwa.git`
1. `bun install`
1. `bun run dev`

#### Deploy Application To A Server

1. `git clone git@github.com:jprein/tango-pwa.git`
1. `bun install`
1. `bun run build`
1. Upload the contents within the `dist` folder to your web hoster. You can create a script in the package.json file, for example: "deploy": "vite build && rsync -avuh --chmod=D2775,F644 dist/ username@servername:/path/to/website/tango-pwa"
