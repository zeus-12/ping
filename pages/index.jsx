import { signOut } from "next-auth/react";
import getServerSession from "../utils/getServerSession";

export default function Home() {
  return (
    <div className="flex ">
      admin app
      <button className="bg-blue-400" onClick={signOut}>
        Logout
      </button>
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
