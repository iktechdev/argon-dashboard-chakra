/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Link
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderView,
} from "components/Scrollbar/Scrollbar";
import { HSeparator } from "components/Separator/Separator";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";



// FUNCTIONS

function Sidebar ( props ) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const { colorMode } = useColorMode;
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const { sidebarVariant } = props;
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "navy.700");
    const inactiveBg = useColorModeValue("white", "navy.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              display={sidebarOpen ? "block": "none"}
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </>
        );
      }
      return (
        <Link href={prop.layout + prop.path} key={key} w={sidebarOpen ? '100%' : 'auto'}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={variantChange}
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              _hover="none" 
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Flex justifyContent={sidebarOpen ? "start": "center"}>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="blue.500"
                    color="white"
                    h="30px"
                    w="30px"
                    me={sidebarOpen ? "12px": 0}
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text display={sidebarOpen ? "block": "none"} color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex justifyContent={sidebarOpen ? "start": "center"}>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color="blue.500"
                    h="30px"
                    w="30px"
                    me={sidebarOpen ? "12px": 0}
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text display={sidebarOpen ? "block": "none"} color={inactiveColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </Link>
      );
    });
  };
  const { logo, routes, sidebarOpen, setSidebarOpen } = props;
  var links = <>{createLinks(routes)}</>;
  //  BRAND
  //  Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "20px";
  let sidebarMargins = "0px";
  var brand = (
    <Box pt={"25px"} mb="12px">
      {sidebarOpen ?
        logo : 
        <Flex justifyContent="center">
          <Text>IK</Text>
        </Flex>
      }
      <HSeparator my="26px" />
    </Box>
  );

  const [mouseEventFlag, setMouseEventFlag] = React.useState(false)

  const mouseEventHandler = {
    onEnter: () => {
      if ( !sidebarOpen ) {
        setSidebarOpen( true )
        setMouseEventFlag(true)
      }
    },
    onLeave: () => {
      if ( mouseEventFlag ) {
        setSidebarOpen( false )
        setMouseEventFlag(false)
      }
    }
  }
  // SIDEBAR
  return (
    <Box
      ref={mainPanel}
      onMouseEnter={mouseEventHandler.onEnter}
      onMouseLeave={mouseEventHandler.onLeave}
    >
      <Box display={{ sm: "none", lg: "flex" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w={sidebarOpen ? "260px" : "120px"}
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius={sidebarRadius}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={renderTrack}
            renderThumbVertical={useColorModeValue(
              renderThumbLight,
              renderThumbDark
            )}
            renderView={renderView}
          >
            <Box>{brand}</Box>
            <Stack direction="column" mb="40px" >
              <Stack alignItems={sidebarOpen ? "start": "center"} >{links}</Stack>
            </Stack>
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
}

// FUNCTIONS

export function SidebarResponsive(props) {
  
  // to check for active links and opened collapses
  let location = useLocation();
  const { logo, routes, colorMode, hamburgerColor, ...rest } = props;

  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // Chakra Color Mode
  const activeBg = useColorModeValue("white", "navy.700");
  const inactiveBg = useColorModeValue("white", "navy.700");
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "white");
  const sidebarActiveShadow = useColorModeValue(
    "0px 7px 11px rgba(0, 0, 0, 0.04)",
    "none"
  );
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </>
        );
      }
      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              boxShadow={sidebarActiveShadow}
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="blue.500"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "6px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color="blue.500"
                    h="30px"
                    w="30px"
                    me="12px"
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  var links = <>{createLinks(routes)}</>;

  //  BRAND

  var brand = (
    <Box pt={"35px"} mb="8px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", lg: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={hamburgerColor}
        w="18px"
        h="18px"
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="calc(100vh - 50px)">
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                <Box>{links}</Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
