import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Show,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import {BsMoonStarsFill, BsSun} from "react-icons/bs"
import {TbDoorExit, TbInbox, TbMoon, TbPalette, TbSun, TbUserCircle} from "react-icons/tb"
import React, {useState} from "react"
import {ChevronDownIcon} from "@chakra-ui/icons"
import Cookies from "universal-cookie"
import {ItemContent} from "../generic/ItemContent"
import ProtectedContent from "../auth/ProtectedContent"
import {appPermissions} from "constants/app-permissions.config"
import {useAuth} from "hooks/useAuth"
import {Link} from "./Link"
import {ColorPicker} from "../branding/ColorPicker"
import {LogoUploader} from "../branding/LogoUploader"
import {FontUploader} from "../branding/FontUploader"
import {ThemeDrawer} from "./ThemeDrawer"

const MobileNavigation = () => {
  const {Logout} = useAuth()
  let usersToken = typeof window !== "undefined" ? localStorage.getItem("usersToken") : ""
  let menuBg = useColorModeValue("white", "navy.800")
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()
  const {colorMode, toggleColorMode} = useColorMode()
  const color = useColorModeValue("textColor.900", "textColor.100")
  const borderColor = useColorModeValue("white", "gray.700")
  const [selectedOption, setSelectedOption] = useState<String>()
  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedOption(value)
    const cookies = new Cookies()
    cookies.set("currenttheme", value, {
      path: "/"
    })
    //Reload page so the theme takes affect
    window.location.reload()
  }
  const cookies = new Cookies()
  let currenttheme
  let currentthemename
  if (cookies.get("currenttheme") !== null) {
    currenttheme = cookies.get("currenttheme")
  }
  return (
    <HStack alignItems="center">
      <Menu>
        <MenuButton pos={"relative"}>
          <Icon as={TbInbox} strokeWidth="1.5" fontSize="2xl" />
          <Badge
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            border={"2px solid"}
            borderColor={borderColor}
            color="white"
            h={"1em"}
            w={"1em"}
            borderRadius={"full"}
            pos={"absolute"}
            bgColor="red.500"
            fontSize={"xxs"}
            p={2}
            top={"-9px"}
            left="12px"
          >
            3
          </Badge>
        </MenuButton>
        <MenuList borderRadius="lg" p={3} display="flex" flexDirection="column" gap={1}>
          <MenuItem borderRadius="lg">
            <ItemContent
              time="13 minutes ago"
              info="by AliciaAdmin01"
              boldInfo="New User Created"
              aName="Alicia"
              aSrc="/images/avatars/avatar1.png"
            />
          </MenuItem>
          <MenuItem borderRadius="lg">
            <ItemContent
              time="2 days ago"
              info="PSPOTG10CSWSB"
              boldInfo="Product Deleted"
              aName="Josh Henry"
              aSrc="/images/avatars/avatar2.png"
            />
          </MenuItem>
          <MenuItem borderRadius="lg">
            <ItemContent
              time="3 days ago"
              info="Payment succesfully completed!"
              boldInfo=""
              aName="Kara"
              aSrc="/images/avatars/avatar3.png"
            />
          </MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton>
          <HStack>
            <Avatar
              name={usersToken}
              src={`https://source.unsplash.com/random/?landscape`}
              borderRadius="50%"
              mr="0"
              ml="15px"
              size="sm"
              border=".5px solid #ccc"
            />
            <Show above="md">
              <Text>{usersToken}</Text>
              <ChevronDownIcon />
            </Show>
          </HStack>
        </MenuButton>
        <MenuList>
          <ProtectedContent hasAccess={appPermissions.MeManager}>
            <MenuItem icon={<Icon as={TbUserCircle} strokeWidth="1.25" fontSize="1.5em" />} lineHeight="0">
              Manage Profile
            </MenuItem>
          </ProtectedContent>
          <ProtectedContent hasAccess={appPermissions.MeManager}>
            <MenuItem icon={<Icon as={TbInbox} strokeWidth="1.25" fontSize="1.5em" />} lineHeight="0">
              Notifications
            </MenuItem>
          </ProtectedContent>
          <ProtectedContent hasAccess={appPermissions.MeManager}>
            <MenuItem
              ref={btnRef}
              onClick={onOpen}
              _hover={{textDecoration: "none"}}
              lineHeight="0"
              icon={<Icon as={TbPalette} strokeWidth="1.25" fontSize="1.5em" />}
            >
              Theming
            </MenuItem>
          </ProtectedContent>
          <MenuDivider />
          <MenuItem
            color="danger.500"
            onClick={() => Logout()}
            lineHeight="0"
            icon={<Icon as={TbDoorExit} display="inline-flex" lineHeight="0" strokeWidth="1.25" fontSize="1.5em" />}
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <ThemeDrawer />
      </Drawer>
    </HStack>
  )
}

export default MobileNavigation
