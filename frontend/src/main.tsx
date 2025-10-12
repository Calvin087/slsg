import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

const queryClient = new QueryClient();

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authenticator>
        <App />
      </Authenticator>
    </QueryClientProvider>
  </StrictMode>,
);
