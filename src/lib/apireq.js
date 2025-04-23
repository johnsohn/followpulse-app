import { useRef, useEffect } from "react";
import supabase from "./supabase";

// Make an API request to `/api/{path}`
export async function apiRequest(path, method = "GET", data) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session ? session.access_token : undefined;

  return fetch(`/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        if (response.code === "auth/invalid-user-token") {
          supabase.auth.signOut();
        }

        throw new CustomError(response.code, response.message);
      } else {
        return response.data;
      }
    });
}

export async function apiRequestExternalA(path, method = "GET", data,signal = null) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session ? session.access_token : undefined;

  return fetch(`${path}`, {
    method: method,
    signal:signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        if (response.code === "auth/invalid-user-token") {
          supabase.auth.signOut();
        }

        throw new CustomError(response.code, response.message);
      } else {
        return response.data;
      }
    });
}
// Make an API request to `/api/{path}`
export async function apiRequestMultipart(path, data) {
  const formData  = new FormData();

  for(const name in data) {
    formData.append(name, data[name]);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session ? session.access_token : undefined;

  return fetch(`/api/${path}`, {
    method: `POST`,
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        if (response.code === "auth/invalid-user-token") {
          supabase.auth.signOut();
        }

        throw new CustomError(response.code, response.message);
      } else {
        return response.data;
      }
    });
}
// Make an API request to `/api/{path}`
export async function apiRequestStream(path, method = "GET", data) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session ? session.access_token : undefined;

  const response = await fetch(`/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  if (!response.body) throw new Error('No response body')

  return {stream:response.body.getReader(),room:response.headers.get('X-Conversation-ID')};

}
export async function apiRequestStreamExternal(path, method = "GET", data) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session ? session.access_token : undefined;

  const response = await fetch(`${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  if (!response.body) throw new Error('No response body')

  return response.body.getReader();

}
// Make an API request to any external URL
export function apiRequestExternal(url, method = "GET", data) {
  return fetch(url, {
    method: method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json());
}

// Create an Error with custom message and code
export function CustomError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

// Hook that returns previous value of state
export function usePrevious(state) {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}
