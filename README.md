# Earth Atlas

A public, static geography explorer inspired by the supplied hand-drawn layout.

- Center: draggable orthographic globe or Natural Earth world map.
- Right: view and geography dropdowns.
- Left: searchable continents/oceans or countries/areas directory.
- Hovering the map highlights the corresponding geometry and directory entry. Directory hover and keyboard focus highlight geometry; clicking a name turns the globe toward it.
- Wheel and buttons zoom; drag rotates the globe or pans the map. Responsive layout supports smaller screens.
- Discover also includes Typical Animals (12 representative wildlife locations), Landforms (12 example locations), Climate Zones (five broad latitude belts), and Ocean Currents & Monsoon (10 surface currents plus seasonal monsoon examples).
- All layers have English/Chinese names, searchable lists, linked hover highlighting, and descriptive notes. Monsoon winds have a June–September / December–February selector. Orange and blue arrows show warm and cold currents; dashed purple arrows show winds.

## Educational layers

`layers.js` contains curated examples and schematic coordinates. Animal markers represent one location within a species' habitat, not complete ranges. Landform markers identify representative locations, not surveyed extents. Climate colors depict five latitude-based geographic belts, not a Köppen climate classification or a local-weather map. Current and monsoon arrows are simplified educational directions, not live observations or navigation data. Warm/cold currents are relative to surrounding waters.

Background references and further reading:

- [WWF species directory](https://www.worldwildlife.org/species/), [giant panda](https://www.worldwildlife.org/species/giant-panda/), [jaguar](https://www.worldwildlife.org/species/jaguar).
- [British Geological Survey: landforms](https://www.bgs.ac.uk/discovering-geology/geological-processes/landforms/), [UNESCO: Great Barrier Reef](https://whc.unesco.org/en/list/154).
- [National Geographic: geographic zones](https://education.nationalgeographic.org/resource/zone/), [NOAA: climate types](https://www.nesdis.noaa.gov/about/k-12-education/understanding-our-planet/what-are-the-different-climate-types).
- [NOAA: ocean circulation](https://www.noaa.gov/jetstream/ocean/circulations), [NOAA: monsoons](https://www.nesdis.noaa.gov/about/k-12-education/severe-weather/what-monsoon).

## Run locally

Run `python -m http.server 4173`, then visit http://localhost:4173. No build, API keys, backend, or npm dependencies are needed. D3 and geographic files are served locally. Optional Google Fonts fall back to system sans-serif.

## Publish

Create a public GitHub repository, push this directory to `main`, and enable GitHub Pages with **GitHub Actions** as the source. `.github/workflows/pages.yml` stages only the website assets and deploys them to Pages.

## Open-source research and reuse

Before implementation, reviewed:

| Project | Relevant functionality | Decision |
| --- | --- | --- |
| [kerem37mert/react-world-map](https://github.com/kerem37mert/react-world-map) | Map/globe projections, hover callbacks, zoom and pan | Good React option; a framework is unnecessary for this static experience. |
| [ben-tiki/d3-globe](https://github.com/ben-tiki/d3-globe) | Draggable globe and country hover | Similar interaction; no application code copied. |
| [kud/globetrotter](https://github.com/kud/globetrotter) | Map/globe switching | Broader Next.js/WebGL application than needed. |
| [d3/d3-geo](https://github.com/d3/d3-geo) | Geographic projections, spherical hit testing and SVG paths | Reused through the vendored D3 7.9.0 distribution. |
| [nvkelso/natural-earth-vector](https://github.com/nvkelso/natural-earth-vector) | Country/area polygons, continent classification, marine polygons | Reused public-domain geographic data. |

## Geography and attribution

Natural Earth 1:50m countries and areas; 1:110m marine polygons. Seven continent categories follow Natural Earth's classification, with its "Seven seas" islands assigned using the dataset's UN region (southern Atlantic islands to South America). North/South Atlantic and Pacific marine features are combined into five ocean entries. Ocean boundaries follow this dataset and are generalized; some marginal seas are outside its main ocean polygons. Boundaries, names and continent assignments are educational representations, not a statement on sovereignty. Small islands may be difficult to point at; use the searchable directory to find them.

The North Atlantic polygon is locally corrected to include its Sargasso Sea interior cutout, whose separate feature is absent at this dataset scale. This makes both ocean highlighting and geographic hit testing continuous across that region while preserving island cutouts.

D3 copyright and ISC license: [vendor/D3-LICENSE](vendor/D3-LICENSE). Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/ . Application code is MIT licensed.
