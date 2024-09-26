import { Box, Button, Container, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";

import { typedSx } from "@App/theme/sxTheme";
import Input from "@Ui/form/inputs/input";
import MultipleChipArrayInput from "@Ui/form/inputs/multipleChipArrayInput";
import LoadingSpinner from "@Ui/loadingSpinner";
import ConfirmationModal from "@Ui/modal/confirmationModal";
import { useModal } from "@Ui/modal/modal";
import { toastSuccess } from "@Ui/toast";
import { mapToInputProps } from "@Utils/form";
import { useGetGlobalQuoteQuery } from "src/services";

type FormValues = {
  security: string;
  shares: number | null;
  orderType: string;
};

const StockOrderPage = () => {
  const globalQuoteQuery = useGetGlobalQuoteQuery();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const initialValues = useMemo(() => {
    if (globalQuoteQuery.data) {
      return {
        security: globalQuoteQuery.data["Global Quote"]["01. symbol"],
        shares: null,
        orderType: "",
      };
    }
    return {
      security: "",
      shares: null,
      orderType: "",
    };
  }, [globalQuoteQuery.data]);

  const form = useForm<FormValues>({
    values: initialValues,
  });

  const chipOptions = [
    { value: "Market", label: "Market" },
    { value: "Limit", label: "Limit" },
    { value: "Stop", label: "Stop" },
  ];

  const sharesValue = form.watch("shares");
  const securityValue = globalQuoteQuery.data?.["Global Quote"]["01. symbol"];

  const price = useMemo(() => {
    const parsedPrice = Number(globalQuoteQuery.data?.["Global Quote"]["05. price"]);
    return isNaN(parsedPrice) ? null : Math.round(parsedPrice * 100) / 100;
  }, [globalQuoteQuery.data]);

  const totalValue = sharesValue && price ? (sharesValue * price).toFixed(2) : null;

  const { showModal } = useModal();

  const handleFormSubmit = async (data: FormValues) => {
    const { shares, orderType, security } = data;

    if (!orderType || !shares || !security) {
      setErrorMessage("Please select a trade type and input the number of shares");
      return;
    }
    if (!price) {
      setErrorMessage("There was an issue retrieving the current market price. Please try again later.");
      return;
    }

    setErrorMessage("");

    const { action } = await showModal({
      component: ConfirmationModal,
      props: {
        title: "Confirm Order",
        text: `You are about to place a ${orderType} order to buy ${shares} shares of ${securityValue} at the current market price of $${price} per share. Total cost: $${totalValue}. Do you want to proceed?`,
      },
    });

    if (action === "SUBMIT") {
      toastSuccess("Your order has been placed successfully!");
    }
  };

  if (globalQuoteQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (!globalQuoteQuery.data) {
    return (
      <Container sx={styles.container} disableGutters>
        <Typography variant="body1" sx={styles.message}>
          Unable to retrieve the global quote data. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={styles.container} disableGutters>
      <Typography variant="h1" sx={styles.title}>
        Stock Order
      </Typography>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Box sx={styles.stockOrderBody}>
          <Box sx={styles.inputsWrapper}>
            <div>
              <Controller
                control={form.control}
                name="security"
                render={(controllerProps) => <Input {...mapToInputProps(controllerProps)} label="Security" />}
              />
            </div>
            <Box sx={styles.sharesAndOrderTypeWrapper}>
              <Controller
                control={form.control}
                name="shares"
                render={(controllerProps) => (
                  <Input {...mapToInputProps(controllerProps)} label="Shares" type="number" />
                )}
              />
              <Controller
                control={form.control}
                name="orderType"
                render={(controllerProps) => (
                  <MultipleChipArrayInput {...mapToInputProps(controllerProps)} options={chipOptions} />
                )}
              />
            </Box>
          </Box>
          <div>
            <Box sx={styles.symbolAndPriceWrapper}>
              <Typography variant="h2" sx={styles.symbolAndPriceContent}>
                {globalQuoteQuery.data["Global Quote"]["01. symbol"]}
              </Typography>
              <Typography variant="body1" sx={styles.symbolAndPriceContent}>
                {price ? `$${price}` : "Price Unavailable"}
              </Typography>
            </Box>
            {price && totalValue && (
              <Box>
                <Typography variant="body2" sx={styles.estimatedAmount}>
                  Estimated trading amount:
                </Typography>
                <Typography variant="body2" sx={styles.totalAmount}>
                  Buy {sharesValue}x{price} {securityValue} = ${totalValue}
                </Typography>
              </Box>
            )}
          </div>
        </Box>
        <Button sx={styles.button} type="submit">
          Buy {securityValue || "Security"}
        </Button>
      </form>
      {errorMessage && (
        <Typography variant="body1" sx={styles.message}>
          {errorMessage}
        </Typography>
      )}
    </Container>
  );
};

export default StockOrderPage;

const styles = typedSx({
  container: {
    paddingY: 5,
    paddingX: { md: 8, sm: 4, xs: 2 },
  },
  stockOrderBody: {
    width: "100%",
    display: "grid",
    gap: 4,
    gridTemplateColumns: { md: "1fr 1fr", sm: "1fr" },
  },
  title: {
    fontSize: "36px",
    color: (theme) => theme.palette.text.white,
    paddingBottom: 8,
    fontWeight: "500",
  },
  inputsWrapper: {
    display: "grid",
    gap: 2,
  },
  sharesAndOrderTypeWrapper: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  symbolAndPriceWrapper: {
    width: "100%",
    backgroundColor: (theme) => theme.palette.background.grey400,
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    color: (theme) => theme.palette.text.white,
    borderRadius: 1,
  },
  symbolAndPriceContent: {
    fontSize: "28px",
    fontWeight: "500",
  },
  estimatedAmount: {
    color: (theme) => theme.palette.text.grey300,
    paddingTop: 1,
  },
  totalAmount: {
    color: (theme) => theme.palette.text.grey100,
  },
  message: {
    marginTop: 2,
    fontSize: "16px",
    color: (theme) => theme.palette.text.grey200,
  },
  button: {
    marginTop: 5,
    borderRadius: 5,
    color: (theme) => theme.palette.text.white,
    backgroundColor: (theme) => theme.palette.background.purple,
    paddingX: 4,
    "&:hover": {
      opacity: 0.9,
    },
  },
});
