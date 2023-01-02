import { Card, CardContent } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import { Title, useGetList, useGetMany, useGetOne } from 'react-admin';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useAxios } from '~/utils/httpRequest';

const Report = () => {
    const { data, isLoading, error } = useAxios({
        url: 'admin/statistic?year=2023&type=MONTH',
        isAuthen: true,
    });
    console.log(data);

    return (
        <Card sx={{ mt: 4 }}>
            <Title title="Report" />
            <CardContent>
                <Stack direction="column" spacing={4} bgcolor="background.default">
                    <Grid2>
                        <BarChart width={730} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timeUnit" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="income" fill="#8884d8" />
                            <Bar dataKey="norder" fill="#82ca9d" />
                        </BarChart>
                    </Grid2>

                    <Grid2>
                        <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="timeUnit" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </Grid2>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Report;
