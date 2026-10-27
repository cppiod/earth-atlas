/* Earth Atlas: self-hosted D3 and Natural Earth, no API keys or backend. */
const $ = id => document.getElementById(id);
const svg = d3.select('#earth'), sphere = {type:'Sphere'};
let countries=[], oceans=[], regions=[], active=null, rotation=[-15,-12,0], zoom=1, projection, path, width=600,height=500, dragging=false;
const oceanName = name => /Atlantic/i.test(name)?'Atlantic Ocean':/Pacific/i.test(name)?'Pacific Ocean':/Indian/i.test(name)?'Indian Ocean':/Arctic/i.test(name)?'Arctic Ocean':'Southern Ocean';
const countryName = f => f.properties.NAME_EN || f.properties.ADMIN;
const mode = () => $('layer').value;
const globe = () => $('view').value==='globe';
const key = f => f.properties.atlasName;
const chineseNames = {'Africa':'非洲','Antarctica':'南极洲','Asia':'亚洲','Europe':'欧洲','North America':'北美洲','South America':'南美洲','Oceania':'大洋洲','Arctic Ocean':'北冰洋','Atlantic Ocean':'大西洋','Indian Ocean':'印度洋','Pacific Ocean':'太平洋','Southern Ocean':'南冰洋'};
const chineseName = f => key(f)==="People's Republic of China"?'中国':f.properties.NAME_ZH || chineseNames[key(f)] || '';
const displayName = f => `${key(f)}${chineseName(f) ? ' · ' + chineseName(f) : ''}`;
const group = (features,name,type) => ({type:'Feature',properties:{atlasName:name,atlasType:type},geometry:{type:'GeometryCollection',geometries:features.map(f=>f.geometry)}});
const theme = () => thematicLayers[mode()];
const entries = () => mode()==='countries'?countries:mode()==='regions'?regions:theme().features.filter(f=>!f.properties.season||f.properties.season==='all'||f.properties.season===$('season').value);
function choosePlace(f){
 if(globe()){const center=f.properties.anchor||d3.geoCentroid(f);rotation=[-center[0],-center[1],0];render();}
 select(null);select(key(f));
}
function visiblePoint(coords){return !globe()||d3.geoDistance(coords,[-rotation[0],-rotation[1]])<Math.PI/2;}
function drawTheme(){
 svg.selectAll('.theme-overlay').remove();
 if(!theme())return;
 const layer=svg.append('g').attr('class','theme-overlay');
 const features=entries();
 if(mode()==='climate'){
  layer.selectAll('path').data(features).join('path').attr('class','theme-feature climate-band').attr('data-name',key).attr('d',path).attr('fill',f=>f.properties.color).append('title').text(displayName);
 }else if(mode()==='currents'){
  const defs=layer.append('defs');
  for(const kind of ['warm','cold','monsoon'])defs.append('marker').attr('id',`arrow-${kind}`).attr('viewBox','0 -4 8 8').attr('refX',7).attr('refY',0).attr('markerWidth',7).attr('markerHeight',7).attr('orient','auto').append('path').attr('d','M0,-3L7,0L0,3Z').attr('fill',kind==='warm'?'#d56849':kind==='cold'?'#3688b5':'#9a63b2');
  const groups=layer.selectAll('.flow-group').data(features).join('g').attr('class','flow-group theme-feature').attr('data-name',key);
  groups.append('path').attr('class','flow-hit').attr('d',path);
  groups.append('path').attr('class',f=>`flow-line ${f.properties.kind}`).attr('d',path).attr('stroke',f=>f.properties.color);
  // Separate arrowheads avoid false arrows at the globe's clipped horizon.
  groups.each(function(f){const points=f.geometry.coordinates,end=points[points.length-1],prior=points[points.length-2];if(visiblePoint(end)&&visiblePoint(prior))d3.select(this).append('path').datum({type:'LineString',coordinates:[d3.geoInterpolate(prior,end)(.85),end]}).attr('class','flow-arrow').attr('d',path).attr('stroke',f.properties.color).attr('marker-end',`url(#arrow-${f.properties.kind})`);});
  groups.append('title').text(displayName);
 }else{
  const markers=layer.selectAll('g').data(features.filter(f=>visiblePoint(f.geometry.coordinates))).join('g').attr('class','theme-feature theme-marker').attr('data-name',key).attr('transform',f=>`translate(${projection(f.geometry.coordinates)})`);
  markers.append('circle').attr('r',15).attr('fill','#fffdf4').attr('stroke',f=>f.properties.color);
  markers.append('text').attr('text-anchor','middle').attr('dy','.35em').text(f=>f.properties.icon);
  markers.append('title').text(displayName);
 }
 layer.selectAll('.theme-feature').on('pointerenter',(event,f)=>select(key(f),true)).on('pointerleave',()=>select(null)).on('click',(event,f)=>{event.stopPropagation();choosePlace(f);});
 layer.selectAll('.theme-feature').classed('active',f=>key(f)===active);
}

function updateLocator(f){
 svg.selectAll('.small-place-locator').remove();
 if(!f||f.properties.atlasType!=='country'||!path)return;
 const bounds=path.bounds(f),dx=bounds[1][0]-bounds[0][0],dy=bounds[1][1]-bounds[0][1];
 // Use screen size so the marker disappears when the place is already easy to see.
 if(!Number.isFinite(dx)||!Number.isFinite(dy)||Math.max(dx,dy)>80||path.area(f)>80)return;
 const center=d3.geoCentroid(f);
 if(globe()&&d3.geoDistance(center,[-rotation[0],-rotation[1]])>=Math.PI/2)return;
 svg.append('circle').attr('class','small-place-locator')
  .attr('cx',(bounds[0][0]+bounds[1][0])/2).attr('cy',(bounds[0][1]+bounds[1][1])/2)
  .attr('r',Math.max(12,Math.hypot(dx,dy)/2+5))
  .attr('fill','none').attr('stroke','#e13b32').attr('stroke-width',2.5)
  .attr('pointer-events','none').attr('aria-label',`Location of ${displayName(f)}`);
}
function select(name,scroll=false){
 if(active===name)return; active=name;
 svg.selectAll('.land').classed('active',f=>(mode()==='countries'?key(f):f.properties.CONTINENT)===name);
 svg.selectAll('.marine').classed('active',f=>key(f)===name);
 svg.selectAll('.theme-feature').classed('active',f=>key(f)===name);
 document.querySelectorAll('#places button').forEach(b=>{b.classList.toggle('active',b.dataset.name===name);b.setAttribute('aria-pressed',String(b.dataset.name===name));});
 const f=entries().find(f=>key(f)===name);
 updateLocator(f);
 $('selected-name').textContent=f?displayName(f):'Where will you explore?';
 $('selected-detail').textContent=f?.properties.detail|| (f?(f.properties.atlasType==='country'?`${f.properties.CONTINENT} · ${chineseNames[f.properties.CONTINENT] || ''} · Country / area`:f.properties.atlasType==='ocean'?'Ocean · Follow the waters that connect our world.':`${countries.filter(c=>c.properties.CONTINENT===name).length} mapped countries and areas · Continent`):'Move across the Earth or choose a place from the directory.');
 const source=$('feature-source');source.hidden=!f?.properties.source;if(f?.properties.source)source.href=f.properties.source;
 if(scroll&&name){const b=[...document.querySelectorAll('#places button')].find(b=>b.dataset.name===name);if(b)b.scrollIntoView({block:'nearest',behavior:'instant'});}
}
function list(){
 const query=$('search').value.trim().toLowerCase(), data=entries().filter(f=>displayName(f).toLowerCase().includes(query));
 $('count').textContent=data.length; $('list-title').textContent=theme()?.title||(mode()==='countries'?'COUNTRIES & AREAS':'CONTINENTS & OCEANS');
 const nav=$('places');nav.replaceChildren();
 for(const type of theme()?['theme']:mode()==='countries'?['country']:['continent','ocean']){
  const section=data.filter(f=>type==='theme'||f.properties.atlasType===type);if(!section.length)continue;
  if(mode()==='regions'){const h=document.createElement('h4');h.textContent=type==='ocean'?'OCEANS':'CONTINENTS';nav.append(h);}
  for(const f of section){const b=document.createElement('button');const label=document.createElement('span');label.className='place-label';const en=document.createElement('span');en.textContent=key(f);const zh=document.createElement('span');zh.className='chinese-name';zh.lang='zh-Hans';zh.textContent=chineseName(f);label.append(en,zh);b.append(label);b.dataset.name=key(f);b.setAttribute('aria-pressed',String(active===key(f)));b.classList.toggle('active',active===key(f));b.onpointerenter=()=>select(key(f));b.onpointerleave=()=>select(null);b.onfocus=()=>select(key(f));b.onblur=()=>select(null);b.onclick=()=>choosePlace(f);nav.append(b);}
 }if(!data.length){const p=document.createElement('p');p.textContent='No places found.';nav.append(p);}
}
function render(){
 width=$('earth').clientWidth;height=$('earth').clientHeight;svg.attr('viewBox',`0 0 ${width} ${height}`);
 projection=(globe()?d3.geoOrthographic().rotate(rotation):d3.geoNaturalEarth1()).fitExtent([[20,20],[width-20,height-20]],sphere);projection.scale(projection.scale()*zoom);if(!globe())projection.translate([width/2+pan[0],height/2+pan[1]]);path=d3.geoPath(projection);
 svg.selectAll('*').remove();svg.append('path').datum(sphere).attr('class','sphere').attr('d',path);
 if(mode()==='regions')svg.selectAll('.marine').data(oceans).join('path').attr('class','marine').attr('d',path);
 svg.append('path').datum(d3.geoGraticule10()).attr('class','graticule').attr('d',path);
 svg.selectAll('.land').data(countries).join('path').attr('class','land').attr('d',path);
 svg.selectAll('.land,.marine').append('title').text(displayName);
 svg.classed('thematic',!!theme()).classed('climate-view',mode()==='climate');drawTheme();
 const previous=active;active=undefined;select(previous);
 $('view-label').textContent=globe()?'01 / GLOBE':'02 / WORLD MAP';$('hint').textContent=globe()?'Drag to rotate · Scroll to zoom · Hover to discover':'Scroll to zoom · Drag to pan · Hover to discover';
}
let pan=[0,0];
function applyPan(){if(!globe()){projection.translate([width/2+pan[0],height/2+pan[1]]);svg.selectAll('.sphere,.graticule,.land,.marine').attr('d',path);drawTheme();updateLocator(entries().find(f=>key(f)===active));}}
svg.on('pointermove',event=>{if(dragging||!projection)return;const xy=d3.pointer(event), center=projection.translate();if(globe()&&Math.hypot(xy[0]-center[0],xy[1]-center[1])>projection.scale()){select(null);return;}if(theme()&&mode()!=='climate'){const target=event.target.closest('.theme-feature');select(target?.dataset.name||null,true);return;}const coords=projection.invert(xy);if(!coords||!coords.every(Number.isFinite)){select(null);return;}if(mode()==='climate'){select(key(entries().find(f=>d3.geoContains(f,coords))||{properties:{}})||null,true);return;}const country=countries.find(f=>d3.geoContains(f,coords));const found=country?(mode()==='countries'?key(country):country.properties.CONTINENT):mode()==='regions'?key(oceans.find(f=>d3.geoContains(f,coords))||{properties:{}}):null;select(found||null,true);}).on('pointerleave',()=>{if(!dragging)select(null);});
svg.call(d3.drag().on('start',()=>{dragging=true;select(null);}).on('drag',event=>{if(globe()){rotation[0]+=event.dx*.3/zoom;rotation[1]=Math.max(-89,Math.min(89,rotation[1]-event.dy*.3/zoom));render();}else{pan[0]+=event.dx;pan[1]+=event.dy;applyPan();}}).on('end',()=>{dragging=false;}));
svg.on('wheel',event=>{event.preventDefault();zoom=Math.max(.75,Math.min(5,zoom*Math.exp(-event.deltaY*.001)));render();applyPan();},{passive:false});
$('zoom-in').onclick=()=>{zoom=Math.min(5,zoom*1.25);render();applyPan();};$('zoom-out').onclick=()=>{zoom=Math.max(.75,zoom/1.25);render();applyPan();};$('reset').onclick=()=>{rotation=[-15,-12,0];zoom=1;pan=[0,0];select(null);render();};
$('view').onchange=()=>{zoom=1;pan=[0,0];render();};$('layer').onchange=()=>{
 select(null);$('search').value='';$('season-control').hidden=mode()!=='currents';
 $('layer-note').textContent=theme()?.note||'SEVEN CONTINENTS. FIVE OCEANS. ONE SHARED HOME.';
 $('layer-legend').textContent=theme()?.legend||'Land · Ocean · Highlight';
 list();render();applyPan();
};
$('season').onchange=()=>{select(null);list();render();applyPan();};$('search').oninput=list;
Promise.all(['countries','marine'].map(file=>d3.json(`data/${file}.geojson?v=2`))).then(([land,marine])=>{
 countries=land.features.map(f=>({...f,properties:{...f.properties,CONTINENT:f.properties.CONTINENT==='Seven seas (open ocean)'?(f.properties.REGION_UN==='Americas'?'South America':f.properties.REGION_UN):f.properties.CONTINENT,atlasName:countryName(f),atlasType:'country'}})).sort((a,b)=>key(a).localeCompare(key(b)));
 oceans=[...d3.group(marine.features.filter(f=>f.properties.featurecla==='ocean'),f=>oceanName(f.properties.name))].map(([name,features])=>group(features,name,'ocean')).sort((a,b)=>key(a).localeCompare(key(b)));
 regions=[...[...d3.group(countries,f=>f.properties.CONTINENT)].map(([name,features])=>group(features,name,'continent')).sort((a,b)=>key(a).localeCompare(key(b))),...oceans];
 $('status').textContent='';list();render();new ResizeObserver(()=>{render();applyPan();}).observe($('earth'));
}).catch(error=>{$('status').textContent='The map could not load. Please reload the page.';console.error(error);});
