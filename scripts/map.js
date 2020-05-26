const map_src = "map_data/singapore-map-simplified.json";

let map_container = document.querySelector("#map-container");

let map_width = map_container.offsetWidth,
    map_height = map_container.offsetHeight;

let map_svg = d3.select("#map-container")
    .append("svg")
    .attr("width", map_width)
    .attr("height", map_height);

let g = map_svg.append("g");

let projection = d3.geoEquirectangular()
    .scale(80000)
    .center([103.8536, 1.2789])
    .translate([map_width/2, map_height/2]);

let map;

d3.json(map_src).then((map_data) => {
    let map_feature = topojson.feature(
        map_data,
        map_data.objects["sla-cadastral-land-parcel-geojson"]);

    projection.fitExtent([[0, 0], [map_width, map_height]], map_feature);

    let path = d3.geoPath()
        .projection(projection);
    g.selectAll("path")
        .data(map_feature.features)
        .enter()
        .append("path")
        .attr("fill", "grey")
        .attr("d", path);
});
