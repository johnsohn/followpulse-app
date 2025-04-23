import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import supabase from "./supabase";

// React Query client
const client = new QueryClient();

/**** USERS ****/

// Fetch user data
// Note: This is called automatically in `auth.js` and data is merged into `auth.user`
export function useUser(uid) {
  // Manage data fetching with React Query: https://react-query.tanstack.com/overview
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["user", { uid }],
    // Query function that fetches data
    () =>
      supabase
        .from("users")
        .select(`*`)
        .eq("id", uid)
        .single()
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: !!uid }
  );
}

// Fetch user data (non-hook)
// Useful if you need to fetch data from outside of a component
export function getUser(uid) {
  return supabase
    .from("users")
    .select(`*, customers ( * )`)
    .eq("id", uid)
    .single()
    .then(handle);
}

// Update an existing user
export async function updateUser(uid, data) {
  const response = await supabase
    .from("users")
    .update(data)
    .eq("id", uid)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
  return response;
}
// Update an existing user
export async function reloadUser(uid) {
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useItem(id) {
  return useQuery(
    ["item", { id }],
    () => supabase.from("items").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}

// Fetch all items by owner
export function useItemsByOwner(owner) {
  return useQuery(
    ["items", { owner }],
    () =>
      supabase
        .from("items")
        .select()
        .eq("owner", owner)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!owner }
  );
}

// Create a new item
export async function createItem(data) {
  const response = await supabase.from("items").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["items"]);
  return response;
}

// Update an item
export async function updateItem(id, data) {
  const response = await supabase
    .from("items")
    .update(data)
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["item", { id }]),
    client.invalidateQueries(["items"]),
  ]);
  return response;
}

// Delete an item
export async function deleteItem(id) {
  const response = await supabase
    .from("items")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["item", { id }]),
    client.invalidateQueries(["items"]),
  ]);
  return response;
}



/**** Projects ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useProject(id) {
  return useQuery(
    ["project", { id }],
    () => supabase.from("sites").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}

// Fetch all items by owner
export function useProjectsByOwner(owner) {
  return useQuery(
    ["projects", { owner }],
    () =>
      supabase
        .from("sites")
        .select()
        .eq("owner", owner)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!owner }
  );
}

// Create a new item
export async function createProject(data) {
  const response = await supabase.from("sites").insert([data]).select().then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["projects"]);
  return response;
}

// Update an item
export async function updateProject(id, data) {
  const response = await supabase
    .from("sites")
    .update(data)
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["project", { id }]),
    client.invalidateQueries(["projects"]),
  ]);
  return response;
}

// Delete an item
export async function deleteProject(id) {
  const response = await supabase
    .from("sites")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["project", { id }]),
    client.invalidateQueries(["projects"]),
  ]);
  return response;
}



/**** Reports ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useReport(id) {
  return useQuery(
    ["report", { id }],
    () => supabase.from("reports").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}

// Fetch all items by owner
export function useReportsByOwner(owner) {
  return useQuery(
    ["reports", { owner }],
    () =>
      supabase
        .from("reports")
        .select()
        .eq("owner", owner)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!owner }
  );
}

// Fetch all items by owner
export function useReportsBySite(siteid) {
  return useQuery(
    ["reports", { siteid }],
    () =>
      supabase
        .from("reports")
        .select()
        .eq("site", siteid)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!siteid }
  );
}

// Create a new item
export async function createReport(data) {
  const response = await supabase.from("reports").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["reports"]);
  return response;
}

// Update an item
export async function updateReport(id, data) {
  const response = await supabase
    .from("reports")
    .update(data)
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["report", { id }]),
    client.invalidateQueries(["reports"]),
  ]);
  return response;
}

// Delete an item
export async function deleteReport(id) {
  const response = await supabase
    .from("reports")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["report", { id }]),
    client.invalidateQueries(["reports"]),
  ]);
  return response;
}


/**** Projects ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useKeyword(id) {
  return useQuery(
    ["keyword", { id }],
    () => supabase.from("keywords").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}

// Fetch all items by owner
export function useKeywordsByOwner(owner) {
  return useQuery(
    ["keywords", { owner }],
    () =>
      supabase
        .from("keywords")
        .select()
        .eq("owner", owner)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!owner }
  );
}

// Fetch all items by owner
export function useKeywordsByReport(reportid) {
  return useQuery(
    ["keywords", { reportid }],
    () =>
      supabase
        .from("keywords")
        .select()
        .eq("report", reportid)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!reportid }
  );
}

// Create a new item
export async function createKeyword(data) {
  const response = await supabase.from("keywords").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["keywords"]);
  return response;
}

// Update an item
export async function updateKeyword(id, data) {
  const response = await supabase
    .from("keywords")
    .update(data)
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["keyword", { id }]),
    client.invalidateQueries(["keywords"]),
  ]);
  return response;
}

// Delete an item
export async function deleteKeyword(id) {
  const response = await supabase
    .from("keywords")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["keyword", { id }]),
    client.invalidateQueries(["keywords"]),
  ]);
  return response;
}

/**** HELPERS ****/

// Get response data or throw error if there is one
function handle(response) {
  if (response.error) throw response.error;
  return response.data;
}

// React Query context provider that wraps our app
export function QueryClientProvider(props) {
  return (
    <QueryClientProviderBase client={client}>
      {props.children}
    </QueryClientProviderBase>
  );
}
