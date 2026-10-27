# Earth Atlas

A public, static geography explorer inspired by the supplied hand-drawn layout.

- Center: draggable orthographic globe or Natural Earth world map.
- Right: view and geography dropdowns.
- Left: searchable continents/oceans or countries/areas directory.
- Hovering the map highlights the corresponding geometry and directory entry. Directory hover and keyboard focus highlight geometry; clicking a name turns the globe toward it.
- Wheel and buttons zoom; drag rotates the globe or pans the map. Responsive layout supports smaller screens.

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

Natural Earth 1:50m countries and areas; 1:110m marine polygons. Seven continent categories follow Natural Earth's classification. North/South Atlantic and Pacific marine features are combined into five ocean entries. Ocean boundaries follow this dataset and are generalized; some marginal seas are outside its main ocean polygons. Boundaries, names and continent assignments are educational representations, not a statement on sovereignty. Small islands may be difficult to point at; use the searchable directory to find them.

D3 copyright and ISC license: [vendor/D3-LICENSE](vendor/D3-LICENSE). Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/ . Application code is MIT licensed.
