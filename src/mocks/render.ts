import { render } from '@testing-library/react'
import { GraphQLHandler, GraphQLRequest } from 'msw'
import {server} from './server'
import { createClient, Provider } from "urql"
const client = createClient({
    url: "/api/graphql",
  })
  
// export const testRenderer =
//   (children: React.ReactNode) =>
//   (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
//     if (responseOverride) {
//       server.use(responseOverride)
//     }
//     render(<Provider value={client}>{children}</Provider>)
//   }