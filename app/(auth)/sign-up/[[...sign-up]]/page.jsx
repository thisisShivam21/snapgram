import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return <SignUp path="/sign-up"  appearance={{ baseTheme: dark }} />;
}
