import Layout from "components/layout";
import type { PageWrapper } from "next-page-tester";
import { ThemeProvider } from "next-themes";
import AppProviders from "providers/AppProviders";

export const Page: PageWrapper = (Page) => (pageProps) => {
  return (
    <ThemeProvider attribute="class">
      <AppProviders>
        <Layout>
          <Page {...pageProps} />
        </Layout>
      </AppProviders>
    </ThemeProvider>
  );
};
