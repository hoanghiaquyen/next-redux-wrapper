import { Box } from "@chakra-ui/react";
import { wrapper } from "app/store";
import { ErrorMessage } from "components/message";
import { CardHeader, Property } from "components/user";
import { triggerUserInfo } from "modules/user/userActions";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

const UserStatic = () => {
  const { userInfor, error } = useSelector(({ user }) => user);

  const { email, phone, name, address } = userInfor;
  const formatFullname = `${name?.firstname || ""}  ${name?.lastname || ""}`;
  const formatAddress = `${address?.zipcode || ""}  ${address?.city || ""}, ${
    address?.street || ""
  }`;

  if (error) return <ErrorMessage message={error.message} />;
  if (!userInfor) return null;
  return (
    <div>
      <Box as="section" bg="gray.100" py="8" px={{ base: "4", md: "8" }}>
        <Box
          maxW="3xl"
          mx="auto"
          bg="white"
          rounded={{ md: "lg" }}
          shadow="base"
        >
          <CardHeader title="Account Info" />
          <Box>
            <Property label="Name" value={formatFullname} />
            <Property label="Email" value={email} />
            <Property label="Phone" value={phone} />
            <Property label="Address" value={formatAddress} />
          </Box>
        </Box>
      </Box>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(triggerUserInfo());
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {
    props: {
      title: "title#user_page",
    },
  };
});

export default UserStatic;
