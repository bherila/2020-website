'use client'

import DataGrid, { Column } from 'devextreme-react/data-grid'

import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.material.purple.dark.compact.css'

const columns = [
  'Date Unveiled',
  'Expected Release',
  'Release Date',
  'Discontinued',
  'YoM',
  'Planned',
  'Released',
  'Model Year',
  'Brand',
  'Model Name',
  'Trim',
  'Vehicle Name',
  'Powertrain',
  'Motors',
  'Class',
  'Style',
  'EV Type',
  'Seating',
  'US MSRP',
  'Global MSRP',
  '$/mi EVR',
  '$/kwh',
  'wh/mi',
  'mi/kWh',
  'kWh/100mi',
  'Batt kWh',
  'EVR (mi)',
  'Comb. Range',
  'ICER (mi)',
  'EVR (km)',
  'L2 MCR',
  'Max DCFC',
  'Motor (kW)',
  'Mfr Country',
  'Market Availability',
  'Source',
  'Comments',
]

const keyCols = ['Model Year', 'Brand', 'Model Name', 'Trim']

export default function EvDatabaseClient({ json }: { json: string }) {
  const data = JSON.parse(json)
  return (
    <DataGrid
      rowHeight={25}
      autoHeight={false}
      keyExpr={keyCols}
      dataSource={data}
    >
      {columns.map((col) => (
        <Column
          dataField={col}
          dataType="string"
          allowSorting={true}
          key={col}
        />
      ))}
    </DataGrid>
  )
}
