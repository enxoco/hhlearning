import { Client, createClient, Provider} from 'urql'

const client = new Client({
    url: "/api/graphql",
})

export const UrqlProvider = ({children}) => (
    <Provider value={client}>
    {children}
    </Provider>
)