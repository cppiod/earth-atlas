/* Curated educational examples. Coordinates and routes are schematic, not survey data. */
const makePlace=(name,zh,coords,detail,icon,color='#975e35',source='')=>({type:'Feature',properties:{atlasName:name,NAME_ZH:zh,detail,icon,color,source,anchor:coords},geometry:{type:'Point',coordinates:coords}});
const animal=(name,zh,coords,detail,icon)=>makePlace(name,zh,coords,detail,icon,'#407653','https://www.worldwildlife.org/species/');
const animals=[
 animal('Giant panda','大熊猫',[103,31],'China · Bamboo forests in mountain regions. The marker is a representative location, not its full range.','🐼'),
 animal('Polar bear','北极熊',[-95,72],'Arctic · A marine mammal that depends on sea ice for hunting. Marker shows one part of its circumpolar range.','🐻‍❄️'),
 animal('African elephant','非洲象',[24,-19],'Sub-Saharan Africa · Elephants inhabit savannas and forests; this example marks southern Africa.','🐘'),
 animal('African lion','非洲狮',[35,-3],'Africa · Lions are associated with savannas and open woodland. Example location: East Africa.','🦁'),
 animal('Bengal tiger','孟加拉虎',[88,23],'South Asia · Tigers occupy varied habitats including forests and mangroves. Example location: the Bengal region.','🐅'),
 animal('Red kangaroo','红大袋鼠',[134,-25],'Australia · Adapted to dry grasslands and open country in the Australian interior.','🦘'),
 animal('Koala','考拉',[151,-29],'Eastern Australia · A tree-dwelling marsupial associated with eucalyptus woodland.','🐨'),
 animal('Jaguar','美洲豹',[-63,-5],'Central and South America · A large cat found in forests and wetlands. Example location: the Amazon Basin.','🐆'),
 animal('American bison','美洲野牛',[-105,44],'North America · A grazing mammal associated with the Great Plains.','🦬'),
 animal('Emperor penguin','帝企鹅',[35,-70],'Antarctica · Breeds on Antarctic sea ice. This marker represents one part of the Antarctic coast.','🐧'),
 animal('Ring-tailed lemur','环尾狐猴',[46,-23],'Madagascar · Native to the island, especially dry habitats in the south and southwest.','🐒'),
 animal('Bornean orangutan','婆罗洲猩猩',[114,1],'Borneo · A great ape of tropical forests, dependent on healthy forest habitat.','🦧')
];
const terrain=(name,zh,coords,detail,icon='▲')=>makePlace(name,zh,coords,detail,icon,'#975e35','https://www.bgs.ac.uk/discovering-geology/geological-processes/landforms/');
const landforms=[
 terrain('Himalayas','喜马拉雅山脉',[86,29],'Mountain range · South Asia. Formed by the collision of the Indian and Eurasian plates.'),
 terrain('Andes','安第斯山脉',[-70,-20],'Mountain range · Along western South America, associated with plate subduction.'),
 terrain('Rocky Mountains','落基山脉',[-111,43],'Mountain range · A major mountain system in western North America.'),
 terrain('Alps','阿尔卑斯山脉',[10,46.5],'Mountain range · Central Europe, with glacial valleys and high peaks.'),
 terrain('Tibetan Plateau','青藏高原',[88,33],'Plateau · An extensive elevated region north of the Himalayas.','▰'),
 terrain('Sahara dunes','撒哈拉沙丘',[10,24],'Dunes · Wind-shaped sand landforms within the Sahara. Much of the Sahara is rock or gravel rather than dunes.','≋'),
 terrain('Grand Canyon','大峡谷',[-112.2,36.1],'Canyon · Arizona, USA. A deeply incised landscape carved by the Colorado River and erosion.','⋁'),
 terrain('Amazon Basin','亚马孙盆地',[-62,-5],'Basin · A broad drainage region in South America, with extensive lowlands and river floodplains.','∪'),
 terrain('East African Rift','东非大裂谷',[36,-2],'Rift valley system · Eastern Africa, where continental crust is stretching and separating.','⋁'),
 terrain('Ganges–Brahmaputra Delta','恒河—布拉马普特拉河三角洲',[90,22],'Delta · Sediment deposited by rivers creates a low-lying delta beside the Bay of Bengal.','Δ'),
 terrain('Great Barrier Reef','大堡礁',[147,-18],'Coral reef system · Off northeastern Australia. Built by coral organisms in shallow marine waters.','◈'),
 terrain('Deccan Plateau','德干高原',[77,17],'Plateau · Elevated terrain across much of peninsular India, including extensive ancient volcanic rocks.','▰')
];
const flow=(name,zh,coords,detail,kind,season='all')=>({type:'Feature',properties:{atlasName:name,NAME_ZH:zh,detail,kind,season,color:kind==='warm'?'#d56849':kind==='cold'?'#3688b5':'#9a63b2',anchor:coords[Math.floor(coords.length/2)],source:kind==='monsoon'?'https://www.nesdis.noaa.gov/about/k-12-education/severe-weather/what-monsoon':'https://www.noaa.gov/jetstream/ocean/circulations'},geometry:{type:'LineString',coordinates:coords}});
const currents=[
 flow('Gulf Stream','墨西哥湾暖流',[[-80,26],[-78,32],[-72,37],[-60,41],[-49,43]],'Warm ocean current · Flows north along the US East Coast and then northeast into the Atlantic.','warm'),
 flow('Kuroshio Current','黑潮',[[123,20],[125,26],[130,31],[140,35],[150,36]],'Warm ocean current · Flows north past Taiwan and Japan, then east into the Pacific.','warm'),
 flow('Brazil Current','巴西暖流',[[-35,-10],[-39,-17],[-43,-24],[-49,-33]],'Warm ocean current · Flows south along the eastern coast of South America.','warm'),
 flow('East Australian Current','东澳大利亚暖流',[[155,-15],[154,-23],[153,-30],[154,-36]],'Warm ocean current · Carries tropical water south along eastern Australia.','warm'),
 flow('Agulhas Current','厄加勒斯暖流',[[35,-22],[33,-28],[29,-33],[23,-36]],'Warm ocean current · Flows southwest along southeastern Africa.','warm'),
 flow('California Current','加利福尼亚寒流',[[-127,45],[-126,37],[-122,30],[-116,24]],'Cold ocean current · Flows south along the western coast of North America.','cold'),
 flow('Humboldt Current','秘鲁寒流',[[-76,-40],[-77,-29],[-80,-17],[-82,-5]],'Cold ocean current · Flows north along western South America; coastal upwelling supports productive waters.','cold'),
 flow('Canary Current','加那利寒流',[[-15,34],[-18,27],[-20,20],[-20,13]],'Cold ocean current · Flows south along northwestern Africa.','cold'),
 flow('Benguela Current','本格拉寒流',[[15,-34],[11,-28],[10,-21],[10,-15]],'Cold ocean current · Flows north along southwestern Africa.','cold'),
 flow('West Australian Current','西澳大利亚寒流',[[110,-35],[109,-29],[110,-23],[112,-18]],'Cold ocean current · Broad northward flow in the eastern Indian Ocean, offshore of western Australia.','cold'),
 flow('South Asian summer monsoon','南亚夏季风',[[57,-5],[59,5],[66,12],[74,19],[78,23]],'June–September · Schematic southwest-to-northeast wind flow from the Indian Ocean toward South Asia, bringing seasonal moisture.','monsoon','summer'),
 flow('East Asian summer monsoon','东亚夏季风',[[132,15],[125,20],[119,28],[115,35]],'June–September · Schematic moist flow from adjacent seas toward East Asia; actual winds vary by region and time.','monsoon','summer'),
 flow('North American summer monsoon','北美夏季风',[[-110,22],[-111,27],[-110,32]],'Northern summer · Schematic moisture flow from the Gulf of California toward northwestern Mexico and the southwestern USA.','monsoon','summer'),
 flow('South Asian winter monsoon','南亚冬季风',[[83,25],[80,19],[77,12],[72,5]],'December–February · Schematic northeast-to-southwest flow from land toward the Indian Ocean. Usually drier; some coasts still receive rain.','monsoon','winter'),
 flow('East Asian winter monsoon','东亚冬季风',[[117,42],[121,32],[122,23],[117,13]],'December–February · Schematic cold continental winds toward the western Pacific and South China Sea.','monsoon','winter')
];
function climateBands(){
 const cap=(pole,radius)=>d3.geoCircle().center([0,pole]).radius(radius).precision(2)().coordinates[0];
 const band=(name,zh,pole,outer,inner,color,anchor,detail)=>({type:'Feature',properties:{atlasName:name,NAME_ZH:zh,color,anchor,detail,source:'https://education.nationalgeographic.org/resource/zone/'},geometry:{type:'Polygon',coordinates:inner?[cap(pole,outer),cap(pole,inner).reverse()]:[cap(pole,outer)]}});
 return [
  band('North polar zone','北寒带',90,23.44,0,'#9dbfdc',[0,78],'66.56°N–90°N · Low solar angles and strong seasonal daylight changes.'),
  band('North temperate zone','北温带',90,66.56,23.44,'#93b38b',[20,45],'23.44°N–66.56°N · Broad latitude belt with marked seasonal variation.'),
  band('Tropical zone','热带',90,113.44,66.56,'#e7bd67',[15,0],'23.44°S–23.44°N · High solar angles through the year. Includes wet and dry climates.'),
  band('South temperate zone','南温带',-90,66.56,23.44,'#93b38b',[20,-45],'23.44°S–66.56°S · Broad latitude belt with seasons opposite those in the north.'),
  band('South polar zone','南寒带',-90,23.44,0,'#9dbfdc',[0,-78],'66.56°S–90°S · Low solar angles and strong seasonal daylight changes.')
 ];
}
const thematicLayers={
 animals:{title:'TYPICAL ANIMALS',features:animals,note:'Representative wildlife locations, not complete species ranges. 代表性分布地点，并非完整分布范围。',legend:'🐾 Representative location'},
 landforms:{title:'LANDFORMS',features:landforms,note:'Selected landform examples. Markers locate features; they do not draw their full boundaries. 地形示例与代表位置。',legend:'▲ Landform location'},
 climate:{title:'CLIMATE ZONES',features:climateBands(),note:'Five broad latitude belts, not a Köppen climate map. Local climate also depends on altitude, rainfall and circulation. 按纬度划分的五带示意。',legend:'Blue: polar · Green: temperate · Gold: tropical'},
 currents:{title:'CURRENTS & MONSOON',features:currents,note:'Schematic surface-current and seasonal-wind directions, not live observations. Arrowheads show direction. 洋流与季风方向示意。',legend:'Orange: warm · Blue: cold · Purple dashed: monsoon'}
};
