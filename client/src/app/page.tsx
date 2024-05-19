import { MantineProvider } from "@mantine/core";
import App from "./(main)/layout";

export default function Home() {
  return (
    <>
      <MantineProvider>
        <App />
      </MantineProvider>
    </>
  );
}
