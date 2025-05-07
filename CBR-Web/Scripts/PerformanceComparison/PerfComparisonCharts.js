FusionCharts.ready(function () {
    var chartContainer = $('#chart-container');
    if (chartContainer != null) {
        var revenueChart = new FusionCharts({
            type: 'column2d',
            renderAt: 'chart-container',
            width: '100%',
            height: '250',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "Asset Growth Rate (%)",
                    "subCaption": "",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#173967",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "placevaluesInside": "1",
                    "rotatevalues": "1",
                    "valueFontColor": "#ffffff",
                    "showXAxisLine": "1",
                    "xAxisLineColor": "#999999",
                    "divlineColor": "#999999",
                    "divLineIsDashed": "1",
                    "showAlternateHGridColor": "0",
                    "subcaptionFontBold": "0",
                    "subcaptionFontSize": "14"
                },
                "data": [
                    {
                        "label": "First Choice Bank",
                        "value": "29.11"
                    },
                    {
                        "label": "Peer Group 1",
                        "value": "27.96"
                    },
                    {
                        "label": "Peer Group 2",
                        "value": "8.51"
                    }
                ],
                "trendlines": [
                    {
                        "line": [
                            {
                                "startvalue": "10",
                                "color": "#173967",
                                "valueOnRight": "1",
                                "displayvalue": "Target"
                            }
                        ]
                    }
                ]
            }
        }).render();
    }
});