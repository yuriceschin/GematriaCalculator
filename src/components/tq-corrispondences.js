import React from 'react';
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allLettersCsv {
          edges {
            node {
              word
              value
            }
          }
        }
      }
    `}
    render={data => (
        <div>
        <table>
          <thead>
            <tr>
              <th>Letter</th>
              <th>ASCII Value</th>
            </tr>
          </thead>
          <tbody>
            {data.allLettersCsv.edges.map((row, i) => (
              <tr key={`${row.node.value} ${i}`}>
                <td>{row.node.word}</td>
                <td>{row.node.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
    }
  />

)