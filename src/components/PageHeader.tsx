import React, { useState } from 'react';

import Image from 'next/future/image';
import { COLORS, MQ, fontAvenirRoman } from 'src/theme';

import useNewsBanner from 'src/context/newsBannerContext';

import { AppBar, Drawer, IconButton, Toolbar, Box, SxProps, useMediaQuery } from '@mui/material';

import * as routes from 'src/routes';

import Link from 'src/elements/Link';
import Button from 'src/elements/Button';
import NewsBanner from 'src/components/NewsBanner';

import GitHubIcon from '@mui/icons-material/GitHub';
import logo from 'public/crossplane-logo.svg';
import closeIcon from 'public/icons/close-icon.svg';
import hamburgerIcon from 'public/icons/hamburger-white.svg';

const root: SxProps = {
  position: 'relative',
  '& nav': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
    minHeight: '80px',
  },
};

const navLinks: SxProps = {
  '& a': {
    fontSize: '20px',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
    opacity: '.85',
    px: 2,
    py: 3,

    '&:hover': {
      opacity: '1',
    },

    '@media screen and (min-width: 1170px)': {
      fontSize: '17px',
      mb: 0,
    },
  },
};

const getStartedLink: SxProps = {
  fontSize: '20px',
  fontWeight: '400',
  textAlign: 'center',
  color: '#fff',
  opacity: '.85',

  '&:hover': {
    opacity: '1',
  },

  '@media screen and (min-width: 1170px)': {
    fontSize: '17px',
    mb: 0,
  },
};

const mobileSignUpBtn: SxProps = {
  textAlign: 'center',
  // mt: 5,
  '& .MuiButton-root': {
    ...fontAvenirRoman,
  },
};

const mobileNav: SxProps = {
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: '100%',
    p: 3,
    backgroundColor: COLORS.nileBlue,
  },
};

const maxWidth: SxProps = {
  '@media screen and (min-width: 1400px)': {
    width: '100%',
    maxWidth: '375px',
  },
};

const navItems = [
  {
    href: '/why-control-planes',
    text: 'Why Control Planes?',
    target: '_self',
  },
  {
    href: routes.docsUrl,
    text: 'Documentation',
    target: '_blank',
  },
  {
    href: '/community',
    text: 'Community',
    target: '_self',
  },
  {
    href: routes.blogUrl,
    text: 'Blog',
    target: '_blank',
  },
];

const PageHeader = () => {
  const matchesXL = useMediaQuery(MQ.xl);
  const { newsBannerData } = useNewsBanner();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newsBannerClosed, setNewsBannerClosed] = useState(true);
  const [newsBannerHeight, setNewsBannerHeight] = useState<number>(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Link href={routes.home}>
            <Box>
              <Image
                src={logo}
                alt="company logo"
                style={{ width: '100%', maxWidth: 152, height: 'auto' }}
              />
            </Box>
          </Link>
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ p: 0, display: { xl: 'none' } }}
        >
          <Image src={closeIcon} alt="menu icon" style={{ width: 24, height: 'auto' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 10,
          ...navLinks,
        }}
      >
        {navItems.map((navItem) => (
          <Link key={navItem.text} href={navItem.href} muiProps={{ target: navItem.target }}>
            {navItem.text}
          </Link>
        ))}
      </Box>
      <Box sx={mobileSignUpBtn}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, py: 3 }}>
          <Link
            href={routes.githubUrl}
            muiProps={{
              target: '_blank',
              sx: {
                ...getStartedLink,
              },
            }}
          >
            <Box mr={1.5} display="flex">
              <GitHubIcon fontSize="medium" />
            </Box>
          </Link>
          <Link
            href={routes.docsGetStartedUrl}
            muiProps={{
              target: '_blank',
              sx: {
                ...getStartedLink,
              },
            }}
          >
            Get Started
          </Link>
        </Box>
        <Button styleType="whiteContained" sizeType="normal" href={routes.slackUrl} target="_blank">
          Join Our Slack Channel
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {newsBannerData && (
        <NewsBanner
          newsBannerClosed={newsBannerClosed}
          setNewsBannerClosed={setNewsBannerClosed}
          setNewsBannerHeight={setNewsBannerHeight}
        />
      )}

      <Box sx={root}>
        <AppBar
          component="nav"
          position="absolute"
          sx={{ top: { md: !newsBannerClosed ? newsBannerHeight : 0 }, transition: 'all 1s' }}
        >
          <Toolbar>
            <Box sx={{ display: 'flex', ...maxWidth }}>
              <Link href={routes.home}>
                <Box>
                  <Image
                    src={logo}
                    alt="company logo"
                    style={{ width: '100%', maxWidth: 152, height: 'auto' }}
                  />
                </Box>
              </Link>
            </Box>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ p: 0, display: { xl: 'none' } }}
            >
              <Image src={hamburgerIcon} alt="menu icon" style={{ width: 24, height: 'auto' }} />
            </IconButton>
            <Box sx={{ display: { _: 'none', xl: 'block' }, ...navLinks }}>
              {navItems.map((navItem) => (
                <Link key={navItem.text} href={navItem.href} muiProps={{ target: navItem.target }}>
                  {navItem.text}
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                display: { _: 'none', xl: 'flex' },
                alignItems: 'center',
                ...maxWidth,
              }}
            >
              <Link
                href={routes.githubUrl}
                muiProps={{ target: '_blank', sx: { ...getStartedLink } }}
              >
                <Box mr={1.5} display="flex">
                  <GitHubIcon fontSize="small" />
                </Box>
              </Link>
              <Link
                href={routes.docsGetStartedUrl}
                muiProps={{ target: '_blank', sx: { ...getStartedLink } }}
              >
                Get Started
              </Link>
              <Button
                styleType="whiteContained"
                sizeType="small"
                href={routes.slackUrl}
                target="_blank"
                sx={{ ml: 4 }}
              >
                Join Our Slack Channel
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {!matchesXL && (
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={mobileNav}
            >
              {drawer}
            </Drawer>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PageHeader;
