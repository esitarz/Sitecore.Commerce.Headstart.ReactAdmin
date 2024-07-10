import {IconProps, Image, ImageProps} from "@chakra-ui/react"
import {Link} from "@chakra-ui/next-js"
import {GeneveLogo, MyCommerceIcon} from "../icons/Icons"
import {appSettings} from "config/app-settings"
import logo from "../../../public/geneve-aeroport.svg"

type HeaderLogoProps = IconProps & ImageProps

export function HeaderLogo({...headerLogoProps}: HeaderLogoProps) {
  return (
    <Link href="/" display="flex" alignItems="center" height="100%" w="150px">
      <GeneveLogo {...headerLogoProps} />
      {/* {appSettings.themeLogoUrl ? (
        <Image src={appSettings.themeLogoUrl} alt="Logo" {...headerLogoProps} height="80%" width="auto" padding={2} />
      ) : (
        <MyCommerceIcon {...headerLogoProps} />
      )} */}
    </Link>
  )
}
