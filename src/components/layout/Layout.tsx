import {Flex, Grid, Hide} from "@chakra-ui/react"
import {useEffect, useState} from "react"
import ContentFooter from "./ContentFooter"
import ContentHeader from "./ContentHeader"
import Footer from "./Footer"
import Header from "./Header"
import {useAuth} from "hooks/useAuth"
import SideBarMenu from "../navigation/SideBarMenu"
import {useRouter} from "@/hooks/useRouter"

const Layout = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated)
  }, [auth.isAuthenticated])
  if (!isAuthenticated) {
    return (
      <Flex width="100vw" height="100vh" alignItems="center" justify="center">
        {props.children}
      </Flex>
    )
  }
  return (
    <>
      <Header />
      {router.asPath !== "/parking" && router.asPath !== "/cart" ? (
        <Grid as="main" gridTemplateColumns={["auto", "75px auto", "75px auto", "250px auto"]} flexGrow="1">
          <Hide below="sm">
            <SideBarMenu />
          </Hide>
          <Flex flexFlow={"column nowrap"} overflowX="hidden">
            <ContentHeader />
            {props.children}
            <ContentFooter />
          </Flex>
        </Grid>
      ) : (
        <Flex flexGrow="1">{props.children}</Flex>
      )}
      <Footer />
    </>
  )
}

export default Layout
