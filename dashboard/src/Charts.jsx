import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const Charts = ({ breweries }) => {
  const stateCounts = breweries.reduce((acc, b) => {
    acc[b.state] = (acc[b.state] || 0) + 1
    return acc
  }, {})

  const typeCounts = breweries.reduce((acc, b) => {
    acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1
    return acc
  }, {})

  const stateData = Object.entries(stateCounts).map(([state, count]) => ({ name: state, value: count }))
  const typeData = Object.entries(typeCounts).map(([type, count]) => ({ name: type, value: count }))

  const COLORS = ['#f0c14b', '#4dabf7', '#82ca9d', '#d291bc', '#ffbb28']

  return (
    <div className="charts">
      <h2>Breweries by State</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stateData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#f0c14b" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Breweries by Type</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={typeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {typeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Charts
