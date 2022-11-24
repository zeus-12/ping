import { signOut } from "next-auth/react";
import Button from "../components/Button";
import getServerSession from "../utils/getServerSession";

export default function Home() {
  return (
    <div className="flex ">
      admin app
      <Button onClick={signOut}>
        <p>Logout</p>
      </Button>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
