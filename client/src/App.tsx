import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routes from "./pages/Routes"
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"
import { Suspense, useEffect } from "react"
import { MainLoader } from "./components/MainLoader"
import moment from "moment"
import "moment/dist/locale/fr"

const App = () => {
  const queryClient = new QueryClient()
  const router = createBrowserRouter(routes)

  useEffect(() => {
    moment.locale("fr")
  }, [])

  return (
    <Suspense fallback={<MainLoader/>}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router}/>
        </RecoilRoot>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App