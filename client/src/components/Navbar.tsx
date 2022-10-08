import { useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Stack, Center } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons';
import ThemeSwitch from './ThemeSwitch';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.colors.pink[3] }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },

];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar width={{ base: 55 }}>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={5}>
          
          <NavbarLink icon={ThemeSwitch} label={'Change colours'}/>
          <NavbarLink icon={IconUser} label={'Profile'}/>
          <NavbarLink icon={IconSettings} label={'Settings'}/>
          {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" /> */}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}