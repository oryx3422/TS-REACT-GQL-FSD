import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "./app/providers/apollo/client";


import { App } from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
