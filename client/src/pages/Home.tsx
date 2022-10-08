import {
  Center,
  Container,
  Title,
  Image,
  Paper,
  BackgroundImage,
} from "@mantine/core";
import AppShellHome from "../components/Appshell";
import { CardsCarousel } from "../components/CardCarousel";

const homeStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage:
    "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  objectFit: "contain",
  boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.3)",
};

const Home = () => {
  return (
    <div className="Home">
      <AppShellHome
        children={
          <BackgroundImage
            component="a"
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          >
            <Container>
              <Center>
                <Title>Random Visual Novels</Title>
              </Center>
              <CardsCarousel />
            </Container>
          </BackgroundImage>
        }
      />
    </div>
  );
};

export default Home;
