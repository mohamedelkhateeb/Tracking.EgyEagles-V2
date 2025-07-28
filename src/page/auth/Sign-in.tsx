import { SelectLang } from "@/components/global/select-lang";
import { ToggleTheme } from "@/components/global/toggle-theme";
import { SignInView } from "./signin-view";


export default  function SigninPage() {

  return (
    <>
      <div className="fixed right-16 top-4 z-50 flex">
        <SelectLang />
      </div>
      <div className="fixed right-4 top-4 z-50 flex">
        <ToggleTheme />
      </div>
      <SignInView />
    </>
  );
}
