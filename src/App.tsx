import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Guess from "./pages/Guess";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Guess />
    </QueryClientProvider>
  );
}

export default App;
