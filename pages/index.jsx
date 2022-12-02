import { signOut } from "next-auth/react";
import AppBar from "../components/AppBar";
import HomeLayout from "../components/HomeLayout";
import getServerSession from "../utils/getServerSession";

export default function Home() {
  return (
    <div >
      <AppBar appBarTitle="Admin Dashboard" actionButtonText="Sign Out"  actionButtonOnClick={signOut} />
      <HomeLayout />
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
