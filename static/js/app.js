const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const dataPromise = d3.json(url);

// If a new sample is selected just call the barChart method with the new value
function optionChanged(newSample)
{
    charts(newSample);
}

function charts(sample)
{
    panel = d3.select('#sample-metadata')
    d3.json(url).then(function(data)
    {   
        // Read in data and assign to variable
        let samples = data.samples;
        let metaData = data.metadata
        // Filter to find the sample that was selected
        let findSample = samples.filter(s => s.id == sample);
        let findMeta = metaData.filter(m => m.id == sample);
        // Store the data that matches the selected sample
        let selectedSample = findSample[0];
        let selectedMeta = findMeta[0];
        // Get the top 10 otu_id, labels, and sample values
        let top10_otu_ids = selectedSample.otu_ids.slice(0,10).reverse();
        let top10_otu_labels = selectedSample.otu_labels.slice(0,10).reverse();
        let top10_sample_values = selectedSample.sample_values.slice(0,10).reverse();
        let otu_ids = selectedSample.otu_ids;
        let otu_labels = selectedSample.otu_labels;
        let sample_values = selectedSample.sample_values;

        
          
        // clear the panel or it just keeps adding info for each selection
        panel.html("")
        // convert the selectedMeta object into key-value pairs and add the pairs to the panel
        Object.entries(selectedMeta).forEach(([key, value])=>
        {
            panel.append("p").text(`${key}:${value}`);
        });

        // Setup variables for the chart
        let barTrace=
        {
            x:top10_sample_values,
            y:top10_otu_ids.map(id => `OTU ${id}`),
            text: top10_otu_labels,
            type: "bar",
            orientation: "h"
        };
        let bubbleTrace=
        {
            x:otu_ids,
            y:sample_values,
            text: otu_labels,
            type: "scatter",
            mode: 'markers',
            marker:
            {
                size:sample_values,
                color:otu_ids,
                colorscale: "Rainbow"
            }
        };

        let barData = [barTrace];
        let bubbleData = [bubbleTrace];
        let gaugeData = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: selectedMeta.wfreq,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              gauge: 
              { 
                steps: [
                    { range: [0, 1], color: "DarkRed" },
                    { range: [1, 2], color: "Red" },
                    { range: [2, 3], color: "OrangeRed" },
                    { range: [3, 4], color: "DarkOrange" },
                    { range: [4, 5], color: "Gold" },
                    { range: [5, 6], color: "Yellow" },
                    { range: [6, 7], color: "Green" },
                    { range: [7, 8], color: "LimeGreen" },
                    { range: [8, 9], color: "LawnGreen" },
                  ],
                axis: 
                { 
                    range: [null, 9] 
                } 
              }
            }
          ];
        let barLayout =
        {
            title: `Top 10 OTUs found in subject ${sample}`
        };

        let bubbleLayout = 
        {
            title: `Bubble chart for ${sample}`
        };
        let gaugeLayout ={ width: 600, height: 400 };
        // Plot the chart
        Plotly.newPlot("bar",barData,barLayout);
        Plotly.newPlot("bubble",bubbleData,bubbleLayout);
        Plotly.newPlot("gauge",gaugeData,gaugeLayout);
    });
}

/*function setMetaData(sample)
{
    panel = d3.select('#sample-metadata')
    d3.json(url).then(function(data)
    {
        let metaData = data.metadata;
        metaData.forEach(function(sample)
        {
            panel.append("row")
        })

    });
}*/
// function to setup the website so it's not blank
function setup()
{
    // grab the <div> that controls selecting data
    let selector = d3.select('#selDataset');
    d3.json(url).then(function(data)
    {
        let names = data.names;
        // loop through the data.names array and append the test subjects to the list
        names.forEach(function(name)
        {
            selector.append("option").text(name).property("value",name);
        });
        // use the first value in names to populate the charts
        let startSample = names[0];
        charts(startSample);
    });
}


setup();
/*
d3.json(url).then(function(data) 
{
    console.log(data);

    let names = data.names;
    let samples = data.samples;
    let metadata = data.metadata;

    let trace1 = 
    {
        x:samples.map(item => item.sample_values),
        y:samples.map(item => item.otu_ids),
        type:"bar",
        orientation:"h"
    };

    let traceData = [trace1];

    let layout =
    {
        title:"test"
    };

    Plotly.newPlot("bar",traceData,layout);


});
*/
