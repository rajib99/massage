import withAuth from "../../components/admin/withAuth";

const Orders = () => {
  return <div>This is a protected page</div>;
};

export default withAuth(Orders);
