# Guardian Life Insurance Coding Assessment

**Hello Guardian Life SWE team**,

Thank you again for the opportunity to complete the coding challenge during our interview. While I didn’t get to finish everything in the allotted time, I was eager to revisit the problem and complete a polished version. Problem-solving is one of my favorite parts of development, and I’d love to walk you through my approach and 
thought process.

### Starting Project
**api:** navigate to /api and run `npm install && npm run dev`
**ui**: navigate to /ui and run `npm install && npm run dev`


## UI components and structure

### Component Organization

To keep the project clean and maintainable, I organized components based on their responsibilities:

- **ClientPanel** – Acts as the main container, coordinating data fetching and layout
- **ClientList** – Renders the list of clients along with pagination controls
- **ClientDetail** – Displays detailed information about the selected client
- **ClientContext** – Provides shared state for selected client and pagination
- **useClient** – A custom hook that encapsulates event handling and context access

### State Management

I used React’s built-in Context API to manage global state across the app. It was an effective way to track selected clients and pagination.

```tsx
// Context definition with TypeScript for type safety
type ClientContextProps = {
  featuredPerson: Client | null;
  setFeaturedPerson: (client: Client) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const ClientContext = createContext<ClientContextProps | undefined>(undefined);
```

This approach avoids having to pass data from component to component via props while keeping all values in sync and updated.

### Event Handling for Current List Page State and Detail Page Focus

I implemented the event handling inside a custom hook to keep the component templates clean and focused on rendering..

#### Client Selection

When a user clicks on a client in the list, the handleClientClick function updates the detail panel with that user's information:

```tsx
// In ClientList component
<li 
  key={client.id} 
  onClick={() => handleClientClick(client)} 
  className="hover:bg-blue-100 py-2"
>
  {client.firstName} {client.lastName}
</li>

// In useClient hook
const handleClientClick = (client: Client) => {
  console.log('Client clicked:', client);
  setFeaturedPerson(client);
};
```

This immediately updates the `ClientDetail` component with the selected client's information without requiring additional API calls, as the client data is already loaded.

#### Pagination

The previous («) and next (») buttons update the `currentPage` value in context to navigate through the paginated data:

```tsx
// In ClientList component
<button 
  disabled={currentPage <= 1} 
  onClick={() => handlePageChange(currentPage - 1)} 
  className="disabled:bg-gray-300 bg-blue-500 text-white px-4 py-2 rounded"
>
  Previous
</button>
<button 
  disabled={currentPage >= totalPages} 
  onClick={() => handlePageChange(currentPage + 1)} 
  className="disabled:bg-gray-300 bg-green-500 text-white px-4 py-2 rounded"
>
  Next
</button>

// In useClient hook
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};
```

When the `currentPage` changes, a `useEffect` hook inside the `ClientPanel` component picks up the change and triggers a new API request to fetch that page's data:

```tsx
// In ClientPanel component
useEffect(() => {
  const fetchClients = async () => {
    try {
      const res = await fetch(`http://localhost:3001/clients/page/${currentPage}`);
      // ...process response
      setClients(json.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchClients();
}, [currentPage]); // Re-run when currentPage changes
```

This an api refresh that updates the names in the list.

### Custom Hooks for Logic

To keep the component code clean and focused, I extracted client-related logic into a custom hook. This helps separate behavior from rendering logic:

```tsx
export function useClient() {
  const { currentPage, setCurrentPage, setFeaturedPerson } = useClientContext();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClientClick = (client: Client) => {
    console.log('Client clicked:', client);
    setFeaturedPerson(client);
  };

  return { currentPage, handlePageChange, handleClientClick };
}
```

This pattern improves maintainability by isolating the core logic, and makes testing or reusing functionality much easier.

### Data Fetching & Response Handling

Data is fetched using React’s `useEffect` hook, which responds automatically when the current page number changes:

```tsx
useEffect(() => {
  const fetchClients = async () => {
    try {
      const res = await fetch(`http://localhost:3001/clients/page/${currentPage}`);
      if (!res.ok) {
        setError(true);
        return;
      }
      const json = await res.json();
      setClients(json.data);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchClients();
}, [currentPage]);
```


### Responsive Layout

I implemented a responsive design with a split-panel layout:

```tsx
<section className="flex w-full h-full">
  <div className="w-1/4 bg-gray-100 p-4">
    <ClientList clients={clients} totalPages={10} />
  </div>
  <div className="w-3/4 text-left bg-white p-4">
    <ClientDetail featuredPerson={featuredPerson || clients[0]} />
  </div>
</section>
```

I noticed the example the assessment was using Tailwind. TailwindCSS provides utility classes that make it easy to create grids and flex boxes.

## Next Steps & Improvements

If I had more time, here are a few enhancements I’d prioritize next:

1. Unit and integration tests for components and hooks
2. Improved error handling with retry mechanisms
3. Caching and Memoization Strategies



**Thanks again** for the opportunity to meet and work through the challenge — I really appreciated it.

I had fun putting this together and hope it gives you a clear sense of how I think through problems and build interfaces.

Looking forward to staying in touch!

Cheers,

_Curtis_
