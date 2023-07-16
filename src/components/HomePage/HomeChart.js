import { useSelector } from "react-redux";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const Chart = () => {
  const weather = useSelector((state) => state.weather.weather.forecast.forecastday);

  const currentHour = new Date().getHours();

  const filteredData = weather[0].hour.filter((hour, index) => {
    const hourNumber = new Date(hour.time).getHours();
    return hourNumber >= currentHour;
  });

  const data = filteredData.map((hour) => ({
    name: hour.time.split(" ")[1],
    Temperature: hour.temp_c,
  }));

  return (
    <AreaChart
      width={500}
      height={200}
      data={data}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Area type="monotone" dataKey="Temperature" stroke="red" fill="orange" />
    </AreaChart>
  );
};

export default Chart;
