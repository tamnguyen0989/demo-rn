import React from 'react'
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'

class XAxisChart extends React.PureComponent {
  constructor() {
    super()
  }
  render() {
    // const data = [14, 80, 100, 55, 33];
    const dataLabel = ['Vehicle', 'Person', 'Photo', 'Scan', 'Signature']

    return (
      <View style={{ height: 300, padding: 20 }}>
        <BarChart
          style={{ flex: 1 }}
          data={this.props.data || []}
          gridMin={0}
          svg={{ fill: 'rgb(134, 65, 244)' }}
        />
        <XAxis
          style={{ marginTop: 10 }}
          data={this.props.data || []}
          scale={scale.scaleBand}
          formatLabel={(value, index) =>
            `${dataLabel[index]} ${this.props.data[index]}`
          }
          labelStyle={{ color: 'black' }}
        />
      </View>
    )
  }
}

export default XAxisChart
