import useAuthUserData from "./useAuthUserData.jsx";


const ShowAuthMenu = ({permission, children}) => {
    const { user } = useAuthUserData();
  return (
    user?.role?.permissions?.includes(permission) && children
  )
}

export default ShowAuthMenu