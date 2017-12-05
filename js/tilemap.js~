export let findObjectsFromLayer = (type, map, layer) =>{
//    Debug.log("finding new stuff");
    let result = new Array();
    let layers = map.objects[layer];
    map.objects[layer].forEach((element) => {
	if(element.type === type) {
	    console.log(element.x, element.y);
	    element.y += map.tileHeight;
	    result.push(element);
	}
    });
    return result;
}
