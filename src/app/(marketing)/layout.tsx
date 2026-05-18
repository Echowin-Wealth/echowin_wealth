import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { fetchPageContent } from "@/lib/data/content";
import { CLIENT_LOGIN_URL, SIGNUP_URL } from "@/lib/constants/site";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navContent = await fetchPageContent("global", "navbar");
  const loginUrl = (navContent.client_login_url as string) || CLIENT_LOGIN_URL;
  const signupUrl = (navContent.signup_url as string) || SIGNUP_URL;

  return (
    <>
      <Navbar loginUrl={loginUrl} signupUrl={signupUrl} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
