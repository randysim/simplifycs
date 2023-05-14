import prisma from "@/lib/db.js";

//to be used surrounding getServerSideProps
export default function adminOnly(next = () => { return { props: {} } } ) {
  return async (context) => {
    let token = context.req.cookies.token;

    if (token) {
      let user = await prisma.user.findUnique({
        where: {
          authToken: token,
        },
      });

      if (user?.admin) {
        return await next(context);
      } else {
        return {
          redirect: {
            destination: "/login",
          },
        };
      }
    } else {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }
  };
}
