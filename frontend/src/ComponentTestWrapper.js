import { Suspense } from "react"
import { RecoilRoot } from "recoil"
import { createClient, Provider } from "urql"
import { Router } from "react-router-dom"

// import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from "history"

const client = createClient({
  url: "/api/graphql",
})

export default function ComponentTestWrapper({ component, location }) {
  const history = createMemoryHistory()

  return (
    <Provider value={client}>
      <RecoilRoot>
        <Suspense fallback="...loading">
          <Router navigator={history} location={location}>
            {component}
          </Router>
        </Suspense>
      </RecoilRoot>
    </Provider>
  )
}
