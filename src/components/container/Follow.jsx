import axios from "axios";
const Follow = ({ setUserInfo, setIsFollowing, isFollowing, id, setLoad }) => {
  const handleFollow = async () => {
    try {
      const response = await axios.post("/api/request/follow", { id });

      const { alreadyFollwing, user } = response.data;

      if (alreadyFollwing) {
        setIsFollowing(true);
        setLoad(false);
      } else if (alreadyFollwing == false) {
        setIsFollowing(false);
      }
      if (user) {
        setUserInfo(user);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleFollow}
        className={`${isFollowing ? "btn btn-secondary" : "btn btn-primary"}`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default Follow;
