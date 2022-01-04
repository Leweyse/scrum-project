import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from "recharts";

export default function StatsChart (props) {

    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={props.data} margin={{right: 50}}>
                <Line type={"monotone"} dataKey={"price"} stroke={"#8884d8"} />
                <CartesianGrid stroke={"#ccc"} />
                <XAxis id={"xAxis"} dataKey={"name"}/>
                <YAxis name={"Price"}/>
            </LineChart>
        </ResponsiveContainer>
    );

}