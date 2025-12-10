import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import * as c3 from "c3";
import axios from "axios";

const DashBoard = () => {
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