import {
  useMantineTheme,
  AppShell,
  Header,
  Title,
  Center,
  Container,
  Text,
} from "@mantine/core";
import { CardsCarousel } from "./CardCarousel";
import { NavbarMinimal } from "./Navbar";

const AppShellHome = (props: { children: any; }) => {
  const theme = useMantineTheme();
  console.log(theme.colorScheme);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      header={
        <Header height={70} p="md">
          <Center>
            <Title order={1} color={theme.colors.pink[3]} align="center">
              🌸 SakuRa VN 🌸
            </Title>
          </Center>
        </Header>
      }
      navbar={<NavbarMinimal />}
    >
      {props.children}
    </AppShell>
  );
}

export default AppShellHome;