const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const dataPromise = d3.json(url);

d3.json(url).then(function(data) 
{
    console.log(data);
});
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


