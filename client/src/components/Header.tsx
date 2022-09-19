import { useState } from "react";

import {
  createStyles,
  Container,
  Group,
  Tabs,
  Burger,
  Title,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons";
import ThemeSwitch from "./ThemeSwitch";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: 60,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
    float: "left",
  },

  themeSwitch: {
    float: "right"
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

interface HeaderTabsProps {
  tabs: string[];
}

export function HeaderTabs({ tabs }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="md"
        />

          <Title order={1} align="center">
            🌸 SakuRa VN 🌸
          </Title>

          <Container className={classes.themeSwitch}><ThemeSwitch /> </Container>

      </Container>

      <Group position="center">
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Group>
    </div>
  );
}

export default HeaderTabs;
