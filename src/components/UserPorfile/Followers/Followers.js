import "./Followers.css";

const Followers = ({totalPublication , totalUsers}) => {
  return (
    <div className="followers" >
      <p><span className="count">{totalUsers}</span>Usuarios<span></span></p>
      <p><span className="count">{totalPublication}</span>Publicaciones<span></span></p>
    </div>
  );
};

export default Followers;
