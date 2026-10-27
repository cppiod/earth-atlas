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
 climate:{title:'CLIMATE ZONES',features:climateBands(),note:'Five broad latitude belts, not a Köppen climate map. Local climate also depends on altitude, rainfall and circulation. 按纬度划分的五带示意。',legend:'Blue: polar · Green: temperate · Gold: tropical'},
};
