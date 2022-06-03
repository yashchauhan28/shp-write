module.exports.point = justType('Point', 'POINT');
module.exports.line = justType('LineString', 'POLYLINE');
module.exports.polygon = justType('Polygon', 'POLYGON');

function justType(type, TYPE) {
    return function(gj) {
//         var oftype = gj.features.filter(isType(type));
//         return {
//             geometries: (TYPE === 'POLYGON' || TYPE === 'POLYLINE') ? [oftype.map(justCoords)] : oftype.map(justCoords),
//             geometries: (TYPE === 'POLYGON' || TYPE === 'POLYLINE') ? oftype.map(justCoords) : oftype.map(justCoords),
//             properties: oftype.map(justProps),
//             type: TYPE
//         };
        
        var oftype = gj.features.filter(isType(type));
        var geometries;
        if (TYPE === 'POLYGON') {
            geometries = [oftype.map(justCoords)];
        } else if (TYPE === 'POLYLINE') {
            geometries = oftype.map(function(t) { return [justCoords(t)]; });
        } else {
            geometries = oftype.map(justCoords);
        }
        
        return {
            geometries: geometries,
            properties: oftype.map(justProps),
            type: TYPE
        };
    };
}

function justCoords(t) {
    if (t.geometry.coordinates[0] !== undefined &&
        t.geometry.coordinates[0][0] !== undefined &&
        t.geometry.coordinates[0][0][0] !== undefined) {
        return t.geometry.coordinates[0];
    } else {
        return t.geometry.coordinates;
    }
}

function justProps(t) {
    return t.properties;
}

function isType(t) {
    return function(f) { return f.geometry.type === t; };
}
