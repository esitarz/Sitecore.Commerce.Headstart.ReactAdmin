import {extendTheme} from "@chakra-ui/react"
import foundations from "./foundations/index"
import components from "./components/index"
import styles from "./styles"
import layerStyles from "./layer-styles"
import semanticTokens from "./semantic-tokens"
import "@fontsource/work-sans"

const fontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`

const schraTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
    cssVarPrefix: "schra"
  },
  fonts: {
    heading: `'Work Sans', ${fontStack}`,
    body: `'Work Sans', ${fontStack}`
  },
  ...foundations,
  components,
  styles,
  layerStyles,
  semanticTokens
})

export default schraTheme
