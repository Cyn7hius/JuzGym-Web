import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Virtuoso } from 'react-virtuoso'

const App = () => (
  <Virtuoso
    style={{ height: '400px' }}
    totalCount={200}
    itemContent={index => <div>Item {index}</div>}
  />
)

ReactDOM.render(<App />, document.getElementById('root'))
