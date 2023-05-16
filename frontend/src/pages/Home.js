import EditMap from "../components/EditMap";
import UploadFileButtons from "../components/UploadFileButtons";
import { FileType } from "../components/UploadFileButtons";
//import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGeojson } from "../features/geojson/geojsonSlice";
import { setMap } from "../features/maps/mapSlice";
//import localgeojson from "../maps/geojson (17).json";
import Dropdown, {
  DownloadDropdownMenuType,
  ModeDropdownMenuType,
} from "../components/GraphicEditorComponents/Dropdown";
import GraphicEditor from "../components/GraphicEditor";

function Home() {
  // if user is null, user is a guest.
  const { user } = useSelector((state) => state.user);
  const { geojson } = useSelector((state) => state.geojson);
  const dispatch = useDispatch();
  

  const createhandle = () => {
    let title = prompt("Please enter title for the map:");
    if (title != null && title !== "") {
      dispatch(setMap({ title: title, geodata: geojson }));
      setGeojson(geojson);
      console.log("created");
    }
  }

  const createUploadComponents = () => {
    const fileTypes = Object.values(FileType);
    return fileTypes.map((fileType) => (
      <UploadFileButtons key={fileType} fileType={fileType} />
    ));
  };
  return (
    <div>
      <div>Home Page</div>
      {user ? (
        <div>
          <div>Welcome back, {user.username}!</div>
          <button>Import map from profile</button>
          <button onClick={createhandle} >Save a Map</button>
        </div>
      ) : (
        <div>
          <div>You are browsing as a guest</div>
        </div>
      )}
      <div>
        {createUploadComponents()}
        <span>
          {<Dropdown DropdownMenuType={DownloadDropdownMenuType} />}
          {<Dropdown DropdownMenuType={ModeDropdownMenuType} />}
          <button>Make a copy</button>
        </span>
      </div>
      <div className="grid-container">
        <EditMap />
        <GraphicEditor />
      </div>
    </div>
  );
}

export default Home;
