import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Navigate, RouteObject, useRoutes } from "react-router-dom";

import { DARK_STOCK_ORDER_THEME } from "@App/theme/theme";
import LoadingSpinner from "@Ui/loadingSpinner";
import { ModalProvider } from "@Ui/modal/modal";
import ThemedToastContainer from "@Ui/toast";

const StockOrderView = React.lazy(() => import("@Pages/stock-order"));

const routes: RouteObject[] = [
  {
    path: "/stock-order",
    element: (
      <React.Suspense fallback={<LoadingSpinner />}>
        <StockOrderView />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/stock-order" replace />,
  },
];

const Router = () => {
  const element = useRoutes(routes);
  return element;
};

const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={QUERY_CLIENT}>
    <ThemeProvider theme={DARK_STOCK_ORDER_THEME}>
      <CssBaseline enableColorScheme />
      <ModalProvider>
        <BrowserRouter>
          <ThemedToastContainer />
          <Router />
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
