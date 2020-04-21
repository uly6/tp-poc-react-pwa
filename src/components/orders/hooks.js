import { useState, useEffect } from 'react';
import {
  getOrders,
  getOrderById,
  getImagesByOrderId,
  getVideosByOrderId,
  getTasksByOrderId,
} from '../../api/db';

export const useGetOrders = (initialValue) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [shouldReload, setShouldReload] = useState(0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsError(false);
      try {
        setData(await getOrders());
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
      setIsLoading(false);
    }

    loadData();
  }, [shouldReload]);

  function reload() {
    setShouldReload(Date.now().valueOf());
  }

  return [data, isLoading, isError, reload];
};

export const useGetOrderById = (id, initialValue) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [shouldReload, setShouldReload] = useState(0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsError(false);
      try {
        setData(await getOrderById(id));
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
      setIsLoading(false);
    }

    loadData();
  }, [id, shouldReload]);

  function reload() {
    setShouldReload(Date.now().valueOf());
  }

  return [data, isLoading, isError, reload];
};

export const useGetTasksByOrderId = (orderId, initialValue) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [shouldReload, setShouldReload] = useState(0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsError(false);
      try {
        setData(await getTasksByOrderId(orderId));
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
      setIsLoading(false);
    }

    loadData();
  }, [orderId, shouldReload]);

  function reload() {
    setShouldReload(Date.now().valueOf());
  }

  return [data, isLoading, isError, reload];
};

export const useGetImagesByOrderId = (orderId, initialValue) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [shouldReload, setShouldReload] = useState(0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsError(false);
      try {
        setData(await getImagesByOrderId(orderId));
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
      setIsLoading(false);
    }

    loadData();
  }, [orderId, shouldReload]);

  function reload() {
    setShouldReload(Date.now().valueOf());
  }

  return [data, isLoading, isError, reload];
};

export const useGetVideosByOrderId = (orderId, initialValue) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);
  const [shouldReload, setShouldReload] = useState(0);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setIsError(false);
      try {
        setData(await getVideosByOrderId(orderId));
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
      setIsLoading(false);
    }

    loadData();
  }, [orderId, shouldReload]);

  function reload() {
    setShouldReload(Date.now().valueOf());
  }

  return [data, isLoading, isError, reload];
};
