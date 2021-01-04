import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "src/assets/canvasjs.min";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

    totalOrder:number =24;
    totalNotConfirm:number=4;
    totalDelivering:number=10;
    totalComplete:number=10;

    constructor() {}

    ngOnInit(): void {
        let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title:{
                text: "This Monthly"
            },
            axisY: {
                title: "Order",
                valueFormatString: "#0,,.",
                stripLines: [{
                    value: 4366500,
                    label: "Average"
                }]
            },
            data: [{
                yValueFormatString: "#,### Units",
                xValueFormatString: "YYYY",
                type: "spline",
                dataPoints: [
                    {x: new Date(2002, 0), y: 2506000},
                    {x: new Date(2003, 0), y: 2798000},
                    {x: new Date(2004, 0), y: 3386000},
                    {x: new Date(2005, 0), y: 544000},
                    {x: new Date(2006, 0), y: 6026000},
                    {x: new Date(2007, 0), y: 2394000},
                    {x: new Date(2008, 0), y: 1872000},
                    {x: new Date(2009, 0), y: 2140000},
                ]
            }]
        });

        chart.render();
    }
}
