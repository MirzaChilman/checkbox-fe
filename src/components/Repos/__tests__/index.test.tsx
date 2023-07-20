import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import Repos from "@/components/Repos"; // replace with your actual path

describe("Repos Component", () => {
  it("renders without crashing", () => {
    const queryClient = new QueryClient();
    const items = [
      {
        id: 1,
        login: "user1",
        repos: [
          {
            id: 1,
            html_url: "http://testrepo.com",
            name: "test-repo",
            stargazers_count: 5,
            description: "Test repo",
          },
        ],
      },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Repos items={items} />
        </Provider>
      </QueryClientProvider>
    );

    const linkElement = screen.getByText(/user1/i);
    expect(linkElement).toBeDefined();
  });
});
