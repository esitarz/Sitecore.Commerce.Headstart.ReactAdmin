import {CheckCircleIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, InfoIcon} from "@chakra-ui/icons"
import {
  Box,
  Image,
  Button,
  Text,
  Card,
  Flex,
  Icon,
  VStack,
  Center,
  CardBody,
  CardFooter,
  useDisclosure,
  Collapse,
  Tooltip
} from "@chakra-ui/react"
import {FaParking, FaPlane, FaStar, FaGem, FaClock, FaLock, FaWalking} from "react-icons/fa"

const ParkingCard = () => {
  const {isOpen, onToggle} = useDisclosure()
  return (
    <Card w="full">
      <CardBody display="flex" gap={3}>
        <VStack flex="1" bg="gray.700" color="white" p={4} textAlign="center" maxW="150px">
          <Text fontSize="2xl" fontWeight="bold">
            P1
          </Text>
          <Center border="2px solid" borderColor="whiteAlpha" aspectRatio="1/1" boxSize="75" rounded="full">
            <Text>Full</Text>
          </Center>
        </VStack>

        <Box p={4}>
          <Text fontSize="2xl" fontWeight="light">
            RESAPARK PREMIUM
          </Text>
          <VStack align="start" mt={4} spacing={3}>
            <Flex align="center">
              <Icon as={FaParking} mr={2} color="chakra-placeholder-color" />
              <Text>Parking zone located on level -2 of P1.</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaPlane} mr={2} color="chakra-placeholder-color" />
              <Text>Direct access to the main terminal</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaStar} mr={2} color="chakra-placeholder-color" />
              <Text>Premium parking</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaGem} mr={2} color="chakra-placeholder-color" />
              <Text>Most convenient</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaClock} mr={2} color="chakra-placeholder-color" />
              <Text>Parking open 24/24</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaLock} mr={2} color="chakra-placeholder-color" />
              <Text>Reservation capacity: 459 spots</Text>
            </Flex>
            <Flex align="center">
              <CheckCircleIcon mr={2} color="chakra-placeholder-color" />
              <Text>Free modification and cancellation up until the day before arrival</Text>
            </Flex>
          </VStack>
        </Box>

        <Box flex="1" p={4} textAlign="center" borderInline="1px solid" borderColor="chakra-border-color">
          <Icon as={FaWalking} color="blue.700" bgColor="blue.100" boxSize="80px" p="6" rounded="full" />
          <Text fontWeight="bold" color="blue.700" mt={1}>
            3 min
          </Text>
        </Box>

        <VStack alignItems="flex-start" flex="1" p={4}>
          <Text fontSize="xl" fontWeight="bold">
            20 CHF
          </Text>
          <Text mt={2} color="chakra-subtle-text">
            To be paid today
            <Tooltip label="This amount does not constitute a deposit, and is not deductible from your parking fees.">
              <InfoIcon fontSize="xs" ml={1} />
            </Tooltip>
          </Text>
          <Text mt={2}>
            <Text as="span" color="blue.700">
              +
            </Text>{" "}
            53 CHF
          </Text>
          <Text fontSize="sm" mt={3}>
            To be paid at the automatic cash registers (estimate)
          </Text>
          <Button colorScheme="blue" mt="auto" size="sm" w="full" rounded="none">
            BOOK
          </Button>
        </VStack>
      </CardBody>
      <CardFooter as={VStack} alignItems="flex-start">
        <Button
          variant="ghost"
          fontWeight="normal"
          fontSize="xl"
          w="full"
          onClick={onToggle}
          justifyContent="flex-start"
          rounded="none"
        >
          {isOpen ? <ChevronUpIcon fontSize="3xl" /> : <ChevronDownIcon fontSize="3xl" />}
          Plan and access information
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <VStack alignItems="flex-start" gap={3} fontSize="sm" p={3} color="chakra-subtle-text">
            <Image src="https://www.gva.ch/en/images/Parkings/Plan_acces_ResaPark_P1R" alt="map" shadow="sm" w="full" />
            <Text>
              Access ResaPark is located at level -2 of Parking P1. GPS coordinates: latitude 46.2306 / longitude 6.1101
              Opening Hours :04:00 to 23:30. ​Closing time adjusted if flights are delayed.
            </Text>
            <Text>
              Margins of entry and exit Entry is possible two hours before the selected entry time and up to four hours
              after. Exit is possible four hours before the selected exit time and up to four hours after. In case of
              overstay or early departure, a penalty will be applied.
            </Text>
            <Text>Vehicles’ Height Parking P1 can accommodate vehicles of less than two meters.</Text>
            <Text>Baggage carts Baggage carts are available. They are equipped with token or coin locks.</Text>
          </VStack>
        </Collapse>
      </CardFooter>
    </Card>
  )
}

export default ParkingCard
