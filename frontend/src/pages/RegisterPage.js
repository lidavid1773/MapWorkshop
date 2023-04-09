import { Link } from "react-router-dom";
import globeImage from "../assets/globe.jpg";

const RegisterPage = () => {
  return (
    <div>
      <form>
        <div>MapWorkshop</div>
        <div>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
        </div>
        <div>
          <button>Sign up</button>
        </div>
        {/* dashed lines need to be replaced w/ css*/}
        <div>------ OR ------</div>
        <div>
          <span>Have an account?</span>
          <span>
            <Link to="/login">Log in</Link>
          </span>
        </div>
      </form>
      <div>
        <img src={globeImage} alt="globe" />
      </div>
    </div>
  );
};

export default RegisterPage;
