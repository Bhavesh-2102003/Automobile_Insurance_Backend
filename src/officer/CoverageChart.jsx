import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";

function CoverageChart() {
    const [chartData, setChartData] = useState({});
   

    useEffect(() => {
        const getCoverageTypeData = async () => {
            try {
                // Fetch data from the backend for the coverage counts 
                const response = await axios.get('http://localhost:8087/api/policy/coverage-counts');
                
                // Extract the labels (coverage types) and data (counts)
                const coverageTypes = Object.keys(response.data); // ['A', 'B', 'C']
                const counts = Object.values(response.data); // [540, 325, 702]

                // Prepare the data for the bar chart
                const data = {
                    labels: coverageTypes,
                    datasets: [
                        {
                            label: "Policy Sold",
                            data: counts,
                            backgroundColor: [
                                "rgba(172, 167, 162, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                            ],
                            borderColor: [
                                "rgb(172, 167, 162)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                // Chart options (you can customize these)
                const options = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `${context.label}: ${context.raw}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Policy Sold",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Count",
                            },
                            beginAtZero: true,
                        },
                    },
                };

                // Update state
                setChartData(data);
                

            } catch (error) {
                console.error("Error fetching coverage type counts:", error);
            }
        };

        getCoverageTypeData();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Coverage Type Counts
                </div>
                <div className="card-body">
                    <Chart type="bar" data={chartData}  className="w-full md:w-20rem" />
                </div>
            </div>
        </div>
    );
}

export default CoverageChart;
