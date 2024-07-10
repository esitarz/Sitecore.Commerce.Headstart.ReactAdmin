import ParkingCard from "@/components/shared/ParkingCard"
import {Box, Container, FormControl, FormLabel, Input, Stack, VStack} from "@chakra-ui/react"
import {useState} from "react"

const Parking = () => {
  const [entryDate, setEntryDate] = useState("")
  const [entryTime, setEntryTime] = useState("")
  const [exitDate, setExitDate] = useState("")
  const [exitTime, setExitTime] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log({entryDate, entryTime, exitDate, exitTime, quantity})
  }

  return (
    <Container maxW="container.xl">
      <Box as="form" onSubmit={handleSubmit} mt={8} p={4} borderWidth={1} borderRadius="lg">
        <Stack spacing={4} direction="row">
          <FormControl id="entryDate" isRequired>
            <FormLabel>Entry Date</FormLabel>
            <Input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
          </FormControl>

          <FormControl id="entryTime" isRequired>
            <FormLabel>Entry Time</FormLabel>
            <Input type="time" value={entryTime} onChange={(e) => setEntryTime(e.target.value)} />
          </FormControl>

          <FormControl id="exitDate" isRequired>
            <FormLabel>Exit Date</FormLabel>
            <Input type="date" value={exitDate} onChange={(e) => setExitDate(e.target.value)} />
          </FormControl>

          <FormControl id="exitTime" isRequired>
            <FormLabel>Exit Time</FormLabel>
            <Input type="time" value={exitTime} onChange={(e) => setExitTime(e.target.value)} />
          </FormControl>

          <FormControl id="quantity" isRequired>
            <FormLabel>Number of cars</FormLabel>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min={1} />
          </FormControl>
        </Stack>
      </Box>
      <VStack mt={8}>
        <ParkingCard />
      </VStack>
    </Container>
  )
}

export default Parking
