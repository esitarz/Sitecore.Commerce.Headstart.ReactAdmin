import {Link} from "@chakra-ui/next-js"
import {Container, Flex, Text, Heading, Icon, VStack, Box} from "@chakra-ui/react"
import {MdCancel, MdOutlineCancel, MdOutlineShoppingBasket, MdShoppingBasket} from "react-icons/md"

const Cart = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" as="h1">
        Basket
      </Heading>
      <VStack minH="50vh" alignItems="center" justifyContent="center">
        <Box position="relative">
          <Icon
            position="absolute"
            left="-4"
            top="-3"
            fontSize="6rem"
            opacity="1"
            color="blue.500"
            as={MdOutlineCancel}
          />
          <Icon fontSize="4rem" as={MdOutlineShoppingBasket} />
        </Box>
        <Heading color="chakra-subtle-text">The basket is empty </Heading>
        <Link href="/parking">Book a parking space, a fast track, or other services</Link>
      </VStack>
    </Container>
  )
}

export default Cart
