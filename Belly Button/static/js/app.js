// Belly Button Biodiversity - Plotly.js


function getPlots(id) {
    //Read samples.json
        d3.json("static/js/samples.json").then (sampledata =>{
  
          var wfreq;
          var sampleValues;
          var labels;
          var OTU_top;
          var OTU_id;
          var OTU_ids;
          var sampleValuesAll;
          var labelsAll;
          
          console.log(id);
  
          var sams = sampledata.samples
  
          for ( i in sampledata.samples) {
                sample = sampledata.samples[i];
                if (sample.id == id){
                    sampleValues =  sample.sample_values.slice(0,10).reverse();
                    console.log(sampleValues);
                    sampleValuesAll = sample.sample_values;
                    labels =  sample.otu_labels.slice(0,10);
                    console.log(labels);
                    labelsAll = sample.otu_labels;
                    OTU_top = (sample.otu_ids.slice(0, 10)).reverse();
                    console.log(OTU_top);
                    OTU_ids = sample.otu_ids
                    OTU_id = OTU_top.map(d => "OTU " + d);
                    console.log(OTU_id);
                }
            }
          
            console.log(sampledata.metadata);
            for (i in sampledata.metadata){
                metasample = sampledata.metadata[i];
                if (metasample.id == id){
                  wfreq = metasample.wfreq;
                  console.log("WFREQ: " +wfreq);
                }
            }
  
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'rgba(43,135,166,1)'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // create the bar plot
        Plotly.newPlot("bar", data, layout);
            // The bubble chart
            var trace1 = {
                x: OTU_ids,
                y: sampleValuesAll,
                mode: "markers",
                marker: {
                    size: sampleValuesAll,
                    color: OTU_ids
                },
                text:  labelsAll
    
            };
    
            // set the layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        buildGauge(wfreq);
  
        });
    }  
    // create the function to get the necessary data
    function getDemoInfo(id) {
    // read the json file to get data
        d3.json("static/js/samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("static/js/samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();