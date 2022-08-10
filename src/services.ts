import { useQuery, useMutation } from "@tanstack/react-query";
import axiosConfig from "./axiosConfig";
import {
  CRYPTO_BTC,
  CURRENCY_USD,
  URL_LIST_FOR_CRYPTO_INFO,
  URL_LIST_FOR_PERSIST,
} from "./constants";

// * functions that communicates with a server or third party apis
const getPrice = async (crypto_ids: string[], currency: string) => {
  const { data } = await axiosConfig.get(URL_LIST_FOR_CRYPTO_INFO.price, {
    params: {
      ids: crypto_ids.join(","),
      vs_currencies: currency,
    },
  });
  return data;
};

const useBtcUsdPrice = (enabled: boolean) => {
  return useQuery(
    [
      "price",
      {
        crypto: CRYPTO_BTC.id,
        currency: CURRENCY_USD.id,
      },
    ],
    () => getPrice([CRYPTO_BTC.id], CURRENCY_USD.id),
    {
      enabled,
      refetchInterval: 5000,
    }
  );
};

// * function that gets the score of userId, or create user if not existing ( for initializing )
const getScore = async (userId: string) => {
  const { data } = await axiosConfig.get(
    `${URL_LIST_FOR_PERSIST.baseUrl}${URL_LIST_FOR_PERSIST.getScore.replace(
      /%s/g,
      userId
    )}`,
    {
      params: {
        username: userId,
      },
    }
  );
  return data;
};

const useScore = (userId: string | undefined) => {
  return useQuery(["score"], () => getScore(userId ?? ""), {
    enabled: userId !== undefined,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

const createAccount = async (userId: string) => {
  const { data } = await axiosConfig.put(
    `${URL_LIST_FOR_PERSIST.baseUrl}${URL_LIST_FOR_PERSIST.createAccount}`,
    {
      username: userId,
    }
  );
  return data;
};

const useCreateAccount = async (userId: string | undefined) => {
  return useQuery(["createAccount"], () => createAccount(userId ?? ""), {
    enabled: userId !== undefined,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

// * function that persists current score to the server
const usePersistScore = (userId: string, callbackFn?: () => void) =>
  useMutation(
    (data: any) =>
      axiosConfig.post(
        `${URL_LIST_FOR_PERSIST.baseUrl}${URL_LIST_FOR_PERSIST.saveScore}`,
        {
          username: userId,
          ...data,
        }
      ),
    {
      onSuccess: async (_) => {
        if (callbackFn) callbackFn();
      },
      onError: async (_) => {},
    }
  );

export { useBtcUsdPrice, useScore, usePersistScore, useCreateAccount };
