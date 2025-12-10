/**
 * Dashboard Page Component
 * 
 * Main dashboard page that displays daily sales data in a bar chart.
 * Fetches sales data from the API and renders it using the c3 charting library.
 */
import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import * as c3 from "c3";
import axios from "axios";

const DashBoard = () => {
    /**
     * Effect hook that loads and renders the sales chart on component mount
     */
    useEffect(() => {
        const loadChart = async () => {
            try {
                const { data } = await axios.get('chart');

                if (!Array.isArray(data) || data.length === 0) {
                    createChart([], []);
                    return;
                }

                const dates = data.map(item => item.date);
                const sales = data.map(item => parseFloat(item.sum));

                createChart(dates, sales);
            } catch (error) {
                console.error('Error loading chart:', error);
                createChart([], []);
            }
        };

        /**
         * Creates and renders a bar chart using c3 library
         * @param dates - Array of date strings for the x-axis
         * @param sales - Array of sales numbers for the y-axis
         */
        const createChart = (dates: string[], sales: number[]) => {
            const columns = [
                ['Sales', ...sales]
            ];

            const chartConfig: any = {
                bindto: '#chart',
                data: {
                    columns: columns,
                    type: 'bar'
                }
            };

            // Only add categories if we have dates
            if (dates.length > 0) {
                chartConfig.axis = {
                    x: {
                        type: 'category',
                        categories: dates
                    }
                };
            }

            c3.generate(chartConfig);
        };

        loadChart();
    }, []);

    return (
        <Wrapper>
            <h2>Daily Sales</h2>
            <div id="chart" style={{ width: '100%', height: '400px' }} />
        </Wrapper>
    );
};

export default DashBoard;