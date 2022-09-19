import { Paper, Title, Text } from "@mantine/core";
import ThemeSwitch from "../components/ThemeSwitch";

const Home = () => {
  return (
    <div className="Home" >
      <Paper radius={0} style={{ minHeight: "100vh" }}>
        <Title order={1} align="center">
          🌸 Welcome to SakuRa VN 🌸
        </Title>
        <Text size="md" align="center">
          Test
        </Text>
        <ThemeSwitch />
      </Paper>
    </div>
  );
};

export default Home;
