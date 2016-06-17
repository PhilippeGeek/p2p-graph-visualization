'use strict';

// create a network
var container = document.getElementById('mynetwork');

var options = {
       // physics: false,
//        interaction: {
//            dragNodes: false,
//            dragView: false,
//            selectable: false,
//            zoomView: false
//        }
    edges: {
        arrows: {
            middle: true
        },
        smooth: false
    },
    interaction: {
        hideEdgesOnDrag: true
    },
    nodes: {
        mass: 5
    }
};

// provide the data in the vis format

var network;
var nodes = new vis.DataSet();
var edges = new vis.DataSet();

var data = {
    nodes: nodes,
    edges: edges
};

$.getJSON("data.json", function (jsonData) {
    loadNetwork(jsonData);
});

function loadNetwork(jsonData) {
    // initialize your network!
    data.nodes.update(jsonData.nodes);
    data.edges.update(jsonData.edges);

    network = new vis.Network(container, data, options);
    refreshNetworkInterval(500);
}

function refreshNetworkInterval(interval) {
    setInterval(function () {
        $.getJSON("data.json", function (jsonData) {
            updateDataSet(data.nodes, 'nodes', jsonData);
            updateDataSet(data.edges, 'edges', jsonData);
        })
    }, interval);
}

function removeOldNodes(dataSet, currentIdList) {
    dataSet.forEach(function (item) {
        if (currentIdList.indexOf(item.id) == -1) {
            dataSet.remove(item.id);
        }
    });
}

function getIds(dataSet) {
    return dataSet.map(function (item) {
        return item.id;
    });
}

function updateDataSet(dataSet, field, jsonData) {
    dataSet.update(jsonData[field]);
    var jsonIds = getIds(jsonData[field]);
    removeOldNodes(dataSet, jsonIds);
}
