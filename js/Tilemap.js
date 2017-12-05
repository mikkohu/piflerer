export let findObjectsFromLayer = (type, map, layer) =>{
    let result = new Array();
    map.objects[layer].forEach((element) => {
	if(element.properties.type === type) {
	    element.y -= map.tileHeight;
	    result.push(element);
	}
    });
    return result;
}
