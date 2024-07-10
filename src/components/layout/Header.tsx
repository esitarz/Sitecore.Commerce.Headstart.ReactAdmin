import {useRouter} from "@/hooks/useRouter"
import {
  Button,
  Container,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Show,
  useColorModeValue
} from "@chakra-ui/react"
import NextLink from "next/link"
import AcountNavigation from "components/navigation/AcountNavigation"
import {MdOutlineSearch, MdShoppingBasket} from "react-icons/md"
import {HeaderLogo} from "../branding/HeaderLogo"
import {NavMenuDrawer} from "../navigation/NavMenuDrawer"

const Header = () => {
  const router = useRouter()
  return (
    <>
      <Container
        as="header"
        backgroundColor={useColorModeValue("white", "gray.800")}
        boxShadow="sm"
        maxW="full"
        position="sticky"
        top="0px"
        zIndex="10"
        borderBottom={".5px solid"}
        borderColor="chakra-border-color"
      >
        <HStack justifyContent="space-between" alignItems={"center"} h="headerHeight" px={[0, 4]}>
          {router.asPath !== "/parking" && router.asPath !== "/cart" ? (
            <>
              <Show below="sm">
                <NavMenuDrawer />
              </Show>
              <HeaderLogo width={["150px", "auto"]} />
              <AcountNavigation />
            </>
          ) : (
            <>
              <HeaderLogo width={["150px", "auto"]} />
              <HStack gap={4}>
                <InputGroup size="sm" w="150px">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MdOutlineSearch} />
                  </InputLeftElement>
                  <Input placeholder="Search" variant="flushed" />
                </InputGroup>

                <AcountNavigation />

                <Select size="sm" w="fit-content" variant="outline">
                  <option>English</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                </Select>
                <Button
                  as={NextLink}
                  href="/cart"
                  colorScheme="blue"
                  rounded="none"
                  size="sm"
                  fontWeight="normal"
                  rightIcon={<MdShoppingBasket />}
                  aria-label="Cart"
                >
                  Basket
                </Button>
              </HStack>
            </>
          )}
        </HStack>
      </Container>
    </>
  )
}

export default Header
