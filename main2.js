function loadCircularHeatMap (dataset, dataset2,dom_element_to_append_to,radial_labels,segment_labels) {
	var width = 1500,
	height = 1200;

/*	var colorScale = d3.scale.quantize()
    .range(colorbrewer.Paired[12])
	    .domain([5, 60]);
*/
	var colorScale = d3.scaleLinear()
   // .range([d3.rgb('#F05C5A'),d3.rgb('#FF7253'),'white',d3.rgb('#FFAD3C'),d3.rgb('#DA772D')])
     //.range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#FFAE12'),d3.rgb('#FC5000')])
     //.range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#FFAE13'),d3.rgb('#FC5000')])
    // .range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#FFD550'),d3.rgb('#FF4100')]) nice
      // .range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#EFD13B'),d3.rgb('#FF4100')]) nice
       //.range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#FFDE00'),d3.rgb('#FC2721')]) //Awesome #F3DB33
     //   .range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#FFDE00'),d3.rgb('#ED68CE')]) //#F4DB43
     .range([d3.rgb('#558BDE'),d3.rgb('#A6EAFF'),'white',d3.rgb('#FFDE00'),d3.rgb('#FC2721')])
       
       // To show Newspaper if colors are not fine we will make it #ffd400 or ffd900 or #FFDE00

	    .domain([17.24,21,23.24,27,30.79]);

	var svgContainer = d3.select("body")
						.append("svg")
						.attr("width",width)
						.attr("height",height);

	var number_of_segments = 13;
	var categories = 2;
	var scale = d3.scaleLinear().domain([1,number_of_segments]).range([0,2*Math.PI])
	var arcs1 = d3.arc().innerRadius(function(d){ return 4*d.type;}).outerRadius(function(d){return 4*d.type + 4;}).startAngle(function(d){return scale(d.month);}).endAngle(function(d){return scale(d.month + 1);});
	var arcs2 = d3.arc().innerRadius(function(d){ return 4*d.type;}).outerRadius(function(d){return 4*d.type + 4;}).startAngle(function(d){return scale(d.month);}).endAngle(function(d){return scale(d.month + 1);});



	//var line = d3.svg.line().x(function(d){return d.x}).y(function(d){return d.y}).interpolate('monotone');
	var f = d3.schemeCategory10;
	var heat_map = svgContainer.append('g').selectAll("path")
								.data(dataset).enter()
								.append("path")
								.attr("d",arcs1)
								.attr("stroke",'none')
								.attr("stroke-width",1)
								.attr("transform", "translate(600,500)")
								.attr('fill',function(d){return colorScale(d.value)})
								.attr("value",function(d){return d.value})
								.attr("class", "bar");




	var heat_map2 = svgContainer.append('g').selectAll("path")
								.data(dataset2).enter()
								.append("path")
								.attr("d",arcs2)
								.attr("stroke",'black')
								.attr("stroke-width",1)
								.attr("transform", "translate(600,500)")
								.attr('fill',"none")
								.attr('stroke',"none")
								.attr("value",function(d){return d.value})
								.attr("id", function(d,i) { return "monthArc_"+i; });


    
    svgContainer.selectAll(".monthText")
			.data(segment_labels)
		    .enter().append("text")
			.attr("class", "monthText")
			.attr("x", 95)   //Move the text from the start angle of the arc
			.attr("dy", 50) //Move the text down
		    .append("textPath")
            .attr("xlink:href",function(d,i){return "#monthArc_"+i;})
        
      //   var textLabels = text
19     //            .attr("x", function(d) { return d.cx; })
20     //            .attr("y", function(d) { return d.cy; })
21     //            .text( function (d) { return "( " + d.cx + ", " + d.cy +" )"; })
22     //            .attr("font-family", "sans-serif")
23     //            .attr("font-size", "20px")
24     //            .attr("fill", "red"); //



	var div = d3.select("body").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);

	    heat_map.on("mouseover", function(d) {      
	            div.transition()        
	                .duration(200)      
	                .style("opacity", .9);      
	            div.html(d.value)  
	                .style("left", 580 + "px")     
	                .style("top", 520 + "px");   
	            }

	            )                  
	        .on("mouseout", function(d) {       
	            div.transition()        
	                .duration(500)      
	                .style("opacity", 0);   
	        });
            var id = 2;
/*
            Radial labels
            var lsa = 0.01; //Label start angle
            var labels = svgContainer.append("g")
                .classed("labels", true)
                .classed("radial", true)
                .attr("transform", "translate(200,100)");

            labels.selectAll("def")
                .data([1,2]).enter()
                .append("def")
                .append("path")
                .attr("id", function(d, i) {return "radial-label-path-"+id+"-"+i;})
                .attr("d", function(d, i) {
                    var r = 20 + ((i + 0.2) * 20);
                    return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) +
                            " a" + r + " " + r + " 0 1 1 -1 0";
                });

            labels.selectAll("text")
                .data([1,2]).enter()
                .append("text")
                .append("textPath")
                .attr("xlink:href", function(d, i) {return "#radial-label-path-"+id+"-"+i;})
                .style("font-size", "16px")
                .text(function(d) {return d;});
*/
	//svgContainer.append("path").attr("d",line(line_coord)).attr('stroke-width',2).attr('stroke','blue').style('fill','none');

// Creating button in D3

}