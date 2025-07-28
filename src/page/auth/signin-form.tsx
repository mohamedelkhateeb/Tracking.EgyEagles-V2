import InputField from "@/components/Fields/input-field";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function SigninForm() {

  return (
    <>
      <form>
        <div className="mb-4 flex flex-col gap-4">
          <InputField
            name="Email"
            label="Email"
            required
            type="text"
            placeholder="Enter your email"
          />
          <InputField
            name="Password"
            label="Password"
            required
            type="password"
            placeholder="Enter your password"
          />
        </div>
        {/* <FormError error={errMsg} /> */}
        <Button size="sm" variant="link" asChild className={"mr-auto mt-0 p-0"}>
          <Link to="/forgot-password">Forgot password?</Link>
        </Button>
        {/* <LoadingButton content="Sign in" loader={'Signing In...'} style="ml-auto mt-2 w-full" />
         */}
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </>
  );
}
