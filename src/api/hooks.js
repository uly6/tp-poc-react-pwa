import { useState, useEffect } from 'react';
import { getOrders, getOrderById } from './db';

// web

const useGetDataWebApi = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(url);
        setData(await response.json());
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export function useGetOrdersWeb() {
  return useGetDataWebApi(
    'https://tp-poc-api.herokuapp.com/api/orders',
    [],
  );
}

export function useGetOrderByIdWeb(id) {
  return useGetDataWebApi(
    `https://tp-poc-api.herokuapp.com/api/orders/${id}`,
    undefined,
  );
}

// pouchdb

export function useGetOrders() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getOrders();
        setData(response);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { data, isLoading, isError };
}

export function useGetOrderById(id) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getOrderById(id);
        setData(response);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { data, isLoading, isError };
}
