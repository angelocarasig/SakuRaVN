import { Paper, Title, Text } from "@mantine/core";
import {HeaderTabs} from "../components/Header";

const Home = () => {
  return (
    <div className="Home" >
      <Paper radius={0} style={{ minHeight: "100vh" }}>
        <HeaderTabs tabs={["Home", "Profile", "About", "Source"]} />
        <Title order={1} align="center">
          Home Page
        </Title>
        <Text size="md" align="center">
          Test
        </Text>
      </Paper>
    </div>
  );
};

export default Home;
