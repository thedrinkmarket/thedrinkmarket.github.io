import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { header as data } from "../../data.js";

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-lg mx-auto
  lg:pt-4 lg:px-4 xl:px-0
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-palette1-200 will apply the bg-palette1-200 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 text-black
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-palette1-100 hocus:text-palette1-100
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0 border-2 border-palette1-500
  px-8 py-3 rounded text-black
  hocus:bg-palette1-500 hocus:border-palette1-500 hocus:text-white focus:shadow-outline
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 hocus:text-palette1-500 text-2xl! ml-0!`};
  
  /*
  img {
    ${tw`w-10 mr-3`}
  }
  */
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-palette1-100 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-black bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({ roundedHeaderButton = false, background = false,logoLink, links, className, collapseBreakpointClass = "lg" }) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */

  const needBackground = {
    bg : background === true ? tw`lg:bg-palette1-400` : tw``,
  }

  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink href="/soiree-type">{data.party}</NavLink>
      <NavLink href="/about">{data.us}</NavLink>
      <NavLink href="/tarifs">{data.price}</NavLink>
      <NavLink href="/contact">{data.contact}</NavLink>
      <PrimaryLink css={roundedHeaderButton && tw`rounded-2xl`} href="/devis">{data.contract}</PrimaryLink>
    </NavLinks>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      TheDrinkMarket
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header css={needBackground} className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
