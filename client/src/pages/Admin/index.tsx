import { useAuth } from "../../context/AuthContext";

type Props = {};

const AdminIndex = (props: Props) => {
  const { user } = useAuth();

  return <div>{user?.role} - TEST</div>;
};

export default AdminIndex;
